import 'dotenv/config';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import { z } from 'zod';
import { issueToken, requireAuth, type AuthRequest } from './auth.js';
import { db, query, transaction } from './db.js';

const app = express();
const clientOrigins = (process.env.CLIENT_ORIGIN ?? 'http://localhost:5173').split(',');
app.use(cors({ origin: clientOrigins, credentials: true }));
app.use(express.json({ limit: '100kb' }));

const asyncRoute =
  (handler: (req: AuthRequest, res: express.Response) => Promise<void>) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    handler(req as AuthRequest, res).catch(next);
const id = z.string().uuid();
const productInput = z.object({
  titleTr: z.string().min(2).max(160),
  titleEn: z.string().min(2).max(160).optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  categoryId: id,
  descriptionTr: z.string().max(5000).optional(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().nullable().optional(),
  sku: z.string().min(2).max(64),
  images: z.array(z.string().url()).max(12).default([]),
  colors: z.array(z.string().max(40)).max(20).default([]),
  sizes: z.array(z.string().max(20)).max(20).default([]),
  stock: z.number().int().min(0).default(0),
  isNew: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isOutlet: z.boolean().default(false),
});

app.get(
  '/api/v1/health',
  asyncRoute(async (_req, res) => {
    await query('SELECT 1');
    res.json({ status: 'ok', service: 'aurea-api', timestamp: new Date().toISOString() });
  }),
);

app.get(
  '/api/v1/products',
  asyncRoute(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 24));
    const search = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const category = typeof req.query.category === 'string' ? req.query.category : '';
    const values: unknown[] = [];
    const where = ['p.is_active = true'];
    if (search) {
      values.push(`%${search}%`);
      where.push(
        `(p.title_tr ILIKE $${values.length} OR p.title_en ILIKE $${values.length} OR p.sku ILIKE $${values.length})`,
      );
    }
    if (category) {
      values.push(category);
      where.push(`c.slug = $${values.length}`);
    }
    values.push(limit, (page - 1) * limit);
    const sql = `
      SELECT
        p.*,
        c.slug AS category_slug,
        COUNT(*) OVER()::int AS total
      FROM products AS p
      JOIN categories AS c ON c.id = p.category_id
      WHERE ${where.join(' AND ')}
      ORDER BY p.created_at DESC
      LIMIT $${values.length - 1}
      OFFSET $${values.length}
    `;
    const result = await query(sql, values);
    res.json({ data: result.rows, meta: { page, limit, total: result.rows[0]?.total ?? 0 } });
  }),
);

app.get(
  '/api/v1/products/:slug',
  asyncRoute(async (req, res) => {
    const result = await query(
      `
        SELECT p.*, c.slug AS category_slug
        FROM products AS p
        JOIN categories AS c ON c.id = p.category_id
        WHERE p.slug = $1 AND p.is_active = true
      `,
      [req.params.slug],
    );
    if (!result.rowCount) {
      res.status(404).json({ error: 'Ürün bulunamadı.' });
      return;
    }
    res.json({ data: result.rows[0] });
  }),
);

app.post(
  '/api/v1/products',
  requireAuth,
  asyncRoute(async (req, res) => {
    // Portföy demosunda yönetici rolü yoktur; canlıda bu uç admin middleware ile sınırlandırılmalıdır.
    const body = productInput.parse(req.body);
    const result = await query(
      `
        INSERT INTO products (
          title_tr, title_en, slug, category_id, description_tr,
          price, compare_at_price, sku, images, colors, sizes, stock,
          is_new, is_best_seller, is_outlet
        )
        VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10, $11, $12,
          $13, $14, $15
        )
        RETURNING *
      `,
      [
        body.titleTr,
        body.titleEn ?? null,
        body.slug,
        body.categoryId,
        body.descriptionTr ?? null,
        body.price,
        body.compareAtPrice ?? null,
        body.sku,
        JSON.stringify(body.images),
        body.colors,
        body.sizes,
        body.stock,
        body.isNew,
        body.isBestSeller,
        body.isOutlet,
      ],
    );
    res.status(201).json({ data: result.rows[0] });
  }),
);

const credentials = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  firstName: z.string().min(2).max(80).optional(),
  lastName: z.string().min(2).max(80).optional(),
});
app.post(
  '/api/v1/auth/register',
  asyncRoute(async (req, res) => {
    const body = credentials
      .extend({ firstName: z.string().min(2).max(80), lastName: z.string().min(2).max(80) })
      .parse(req.body);
    const passwordHash = await bcrypt.hash(body.password, 12);
    const result = await query(
      `
        INSERT INTO users (email, password_hash, first_name, last_name)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, first_name, last_name
      `,
      [body.email.toLowerCase(), passwordHash, body.firstName, body.lastName],
    );
    const user = result.rows[0];
    res.status(201).json({
      data: {
        user,
        token: issueToken({ id: user.id, email: user.email }),
      },
    });
  }),
);
app.post(
  '/api/v1/auth/login',
  asyncRoute(async (req, res) => {
    const body = credentials.pick({ email: true, password: true }).parse(req.body);
    const result = await query<{
      id: string;
      email: string;
      password_hash: string;
      first_name: string;
      last_name: string;
    }>(
      `
        SELECT id, email, password_hash, first_name, last_name
        FROM users
        WHERE email = $1
      `,
      [body.email.toLowerCase()],
    );
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(body.password, user.password_hash))) {
      res.status(401).json({ error: 'E-posta veya şifre hatalı.' });
      return;
    }
    res.json({
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        },
        token: issueToken(user),
      },
    });
  }),
);

const addressInput = z.object({
  title: z.string().min(2).max(50),
  firstName: z.string().min(2).max(80),
  lastName: z.string().min(2).max(80),
  phone: z.string().min(7).max(30),
  addressLine: z.string().min(5).max(500),
  city: z.string().min(2).max(80),
  district: z.string().min(2).max(80),
  country: z.string().min(2).max(80).default('Türkiye'),
  isDefault: z.boolean().default(false),
});
app.get(
  '/api/v1/me/addresses',
  requireAuth,
  asyncRoute(async (req, res) => {
    const result = await query(
      'SELECT * FROM addresses WHERE user_id=$1 ORDER BY is_default DESC, created_at DESC',
      [req.user!.id],
    );
    res.json({ data: result.rows });
  }),
);
app.post(
  '/api/v1/me/addresses',
  requireAuth,
  asyncRoute(async (req, res) => {
    const address = addressInput.parse(req.body);
    const userId = req.user!.id;
    const result = await transaction(async (client) => {
      if (address.isDefault) {
        await client.query('UPDATE addresses SET is_default=false WHERE user_id=$1', [userId]);
      }

      return client.query(
        `
          INSERT INTO addresses (
            user_id, title, first_name, last_name, phone,
            address_line, city, district, country, is_default
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *
        `,
        [
          userId,
          address.title,
          address.firstName,
          address.lastName,
          address.phone,
          address.addressLine,
          address.city,
          address.district,
          address.country,
          address.isDefault,
        ],
      );
    });
    res.status(201).json({ data: result.rows[0] });
  }),
);
app.delete(
  '/api/v1/me/addresses/:addressId',
  requireAuth,
  asyncRoute(async (req, res) => {
    const result = await query('DELETE FROM addresses WHERE id=$1 AND user_id=$2 RETURNING id', [
      req.params.addressId,
      req.user!.id,
    ]);
    if (!result.rowCount) {
      res.status(404).json({ error: 'Adres bulunamadı.' });
      return;
    }
    res.status(204).send();
  }),
);

const cartItem = z.object({ productId: id, quantity: z.number().int().min(1).max(20) });
app.get(
  '/api/v1/cart',
  requireAuth,
  asyncRoute(async (req, res) => {
    const result = await query(
      `
        SELECT ci.id, ci.quantity, p.id AS product_id, p.slug,
               p.title_tr, p.price, p.stock, p.images
        FROM cart_items AS ci
        JOIN carts AS c ON c.id = ci.cart_id
        JOIN products AS p ON p.id = ci.product_id
        WHERE c.user_id = $1
      `,
      [req.user!.id],
    );
    res.json({ data: result.rows });
  }),
);
app.put(
  '/api/v1/cart/items',
  requireAuth,
  asyncRoute(async (req, res) => {
    const item = cartItem.parse(req.body);
    const result = await query(
      `
        INSERT INTO carts (user_id)
        VALUES ($1)
        ON CONFLICT (user_id) DO UPDATE SET updated_at = now()
        RETURNING id
      `,
      [req.user!.id],
    );
    const cartId = result.rows[0].id;
    await query(
      `
        INSERT INTO cart_items (cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (cart_id, product_id)
        DO UPDATE SET quantity = EXCLUDED.quantity, updated_at = now()
      `,
      [cartId, item.productId, item.quantity],
    );
    res.status(204).send();
  }),
);
app.delete(
  '/api/v1/cart/items/:productId',
  requireAuth,
  asyncRoute(async (req, res) => {
    await query(
      'DELETE FROM cart_items USING carts WHERE cart_items.cart_id=carts.id AND carts.user_id=$1 AND cart_items.product_id=$2',
      [req.user!.id, req.params.productId],
    );
    res.status(204).send();
  }),
);

const checkout = z.object({ shippingAddressId: id });
app.post(
  '/api/v1/orders',
  requireAuth,
  asyncRoute(async (req, res) => {
    const { shippingAddressId } = checkout.parse(req.body);
    const order = await transaction(async (client) => {
      const address = await client.query('SELECT * FROM addresses WHERE id = $1 AND user_id = $2', [
        shippingAddressId,
        req.user!.id,
      ]);
      if (!address.rowCount) throw new Error('Teslimat adresi bulunamadı.');
      const items = await client.query<{
        product_id: string;
        title_tr: string;
        sku: string;
        price: string;
        stock: number;
        quantity: number;
      }>(
        `
          SELECT p.id AS product_id, p.title_tr, p.sku, p.price, p.stock, ci.quantity
          FROM carts AS c
          JOIN cart_items AS ci ON ci.cart_id = c.id
          JOIN products AS p ON p.id = ci.product_id
          WHERE c.user_id = $1
          FOR UPDATE OF p
        `,
        [req.user!.id],
      );
      if (!items.rowCount) throw new Error('Sepetiniz boş.');
      for (const item of items.rows) {
        if (item.stock < item.quantity) {
          throw new Error(`${item.title_tr} için yeterli stok yok.`);
        }
      }
      const total = items.rows.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
      const created = await client.query(
        `
          INSERT INTO orders (user_id, shipping_address, total_amount, status)
          VALUES ($1, $2, $3, $4)
          RETURNING *
        `,
        [req.user!.id, address.rows[0], total, 'pending'],
      );
      for (const item of items.rows) {
        await client.query(
          `
            INSERT INTO order_items (order_id, product_id, title, sku, unit_price, quantity)
            VALUES ($1, $2, $3, $4, $5, $6)
          `,
          [created.rows[0].id, item.product_id, item.title_tr, item.sku, item.price, item.quantity],
        );
        await client.query('UPDATE products SET stock=stock-$1 WHERE id=$2', [
          item.quantity,
          item.product_id,
        ]);
      }
      await client.query(
        'DELETE FROM cart_items USING carts WHERE cart_items.cart_id=carts.id AND carts.user_id=$1',
        [req.user!.id],
      );
      return created.rows[0];
    });
    res.status(201).json({ data: order });
  }),
);

app.use(
  (error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof z.ZodError) {
      res.status(422).json({ error: 'Gönderilen veri geçersiz.', details: error.issues });
      return;
    }
    const message = error instanceof Error ? error.message : 'Sunucu hatası.';
    if (message.includes('unique')) {
      res.status(409).json({ error: 'Bu kayıt zaten mevcut.' });
      return;
    }
    console.error(error);
    res.status(500).json({ error: message });
  },
);

const port = Number(process.env.PORT ?? 3001);
const server = app.listen(port, () => console.log(`API http://localhost:${port}/api/v1`));
const shutdown = async () => {
  server.close();
  await db.end();
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug varchar(100) NOT NULL UNIQUE,
  name_tr varchar(120) NOT NULL, name_en varchar(120), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), category_id uuid NOT NULL REFERENCES categories(id),
  slug varchar(180) NOT NULL UNIQUE, sku varchar(64) NOT NULL UNIQUE, title_tr varchar(160) NOT NULL, title_en varchar(160), description_tr text,
  price numeric(12,2) NOT NULL CHECK (price > 0), compare_at_price numeric(12,2) CHECK (compare_at_price IS NULL OR compare_at_price >= price),
  images jsonb NOT NULL DEFAULT '[]'::jsonb, colors text[] NOT NULL DEFAULT '{}', sizes text[] NOT NULL DEFAULT '{}', stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  is_new boolean NOT NULL DEFAULT false, is_best_seller boolean NOT NULL DEFAULT false, is_outlet boolean NOT NULL DEFAULT false, is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email varchar(320) NOT NULL UNIQUE, password_hash varchar(255) NOT NULL,
  first_name varchar(80) NOT NULL, last_name varchar(80) NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, title varchar(50) NOT NULL,
  first_name varchar(80) NOT NULL, last_name varchar(80) NOT NULL, phone varchar(30) NOT NULL, address_line text NOT NULL, city varchar(80) NOT NULL, district varchar(80) NOT NULL, country varchar(80) NOT NULL DEFAULT 'Türkiye', is_default boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX one_default_address_per_user ON addresses(user_id) WHERE is_default;
CREATE TABLE carts (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE cart_items (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), cart_id uuid NOT NULL REFERENCES carts(id) ON DELETE CASCADE, product_id uuid NOT NULL REFERENCES products(id), quantity integer NOT NULL CHECK (quantity BETWEEN 1 AND 20), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(cart_id, product_id));
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES users(id), shipping_address jsonb NOT NULL, total_amount numeric(12,2) NOT NULL CHECK (total_amount >= 0), currency char(3) NOT NULL DEFAULT 'TRY', status varchar(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','preparing','shipped','delivered','cancelled')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE order_items (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE, product_id uuid REFERENCES products(id) ON DELETE SET NULL, title varchar(160) NOT NULL, sku varchar(64) NOT NULL, unit_price numeric(12,2) NOT NULL, quantity integer NOT NULL CHECK (quantity > 0));
CREATE INDEX products_category_active_idx ON products(category_id) WHERE is_active;
CREATE INDEX products_search_idx ON products USING gin (to_tsvector('turkish', title_tr || ' ' || coalesce(description_tr, '')));
CREATE INDEX orders_user_created_idx ON orders(user_id, created_at DESC);
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;
CREATE TRIGGER products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER carts_updated_at BEFORE UPDATE ON carts FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION set_updated_at();

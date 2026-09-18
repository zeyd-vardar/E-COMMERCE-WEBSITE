import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../app/app_state.dart';
import '../core/models.dart';

class ProductArt extends StatelessWidget {
  const ProductArt({required this.product, this.height = 180, super.key});
  final Product product;
  final double height;
  @override
  Widget build(BuildContext context) {
    final palette = [
      const Color(0xffe8dfd4),
      const Color(0xffd9d9d4),
      const Color(0xffe3d3cb),
      const Color(0xffd5ddd8),
    ];
    return Container(
      height: height,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: palette[product.id.hashCode.abs() % palette.length],
        borderRadius: BorderRadius.circular(14),
      ),
      padding: const EdgeInsets.all(18),
      child: Text(
        product.name.tr,
        textAlign: TextAlign.center,
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w300,
          letterSpacing: 2,
        ),
      ),
    );
  }
}

class PriceText extends ConsumerWidget {
  const PriceText(this.product, {super.key});
  final Product product;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    return Wrap(
      spacing: 7,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        Text(
          money(s, product.price),
          style: const TextStyle(fontWeight: FontWeight.w700),
        ),
        if (product.originalPrice != null)
          Text(
            money(s, product.originalPrice!),
            style: const TextStyle(
              decoration: TextDecoration.lineThrough,
              color: Colors.black45,
              fontSize: 12,
            ),
          ),
        if (product.discount > 0)
          Text(
            '-%${product.discount}',
            style: const TextStyle(
              color: Colors.redAccent,
              fontWeight: FontWeight.w700,
              fontSize: 11,
            ),
          ),
      ],
    );
  }
}

class ProductCard extends ConsumerWidget {
  const ProductCard(this.product, {super.key});
  final Product product;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(appStateProvider);
    return InkWell(
      borderRadius: BorderRadius.circular(14),
      onTap: () => context.push('/product/${product.slug}'),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              ProductArt(product: product),
              Positioned(
                right: 4,
                top: 4,
                child: IconButton(
                  tooltip: 'Favori',
                  onPressed: () =>
                      ref.read(appStateProvider.notifier).favorite(product.id),
                  icon: Icon(
                    state.favorites.contains(product.id)
                        ? Icons.favorite
                        : Icons.favorite_border,
                    color: state.favorites.contains(product.id)
                        ? Colors.redAccent
                        : null,
                  ),
                  style: IconButton.styleFrom(
                    backgroundColor: Colors.white.withValues(alpha: .9),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 9),
          Text(
            product.brand,
            style: const TextStyle(
              fontSize: 10,
              letterSpacing: 1.4,
              color: Colors.black54,
            ),
          ),
          Text(
            product.name.of(state.language),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 5),
          PriceText(product),
          Text(
            product.stock == 0
                ? tr(state, 'Tükendi', 'Out of stock')
                : product.stock <= 3
                ? tr(
                    state,
                    'Son ${product.stock} ürün',
                    'Only ${product.stock} left',
                  )
                : tr(state, 'Stokta', 'In stock'),
            style: TextStyle(
              fontSize: 11,
              color: product.stock == 0 ? Colors.red : Colors.green,
            ),
          ),
        ],
      ),
    );
  }
}

class ProductGrid extends StatelessWidget {
  const ProductGrid(this.items, {super.key});
  final List<Product> items;
  @override
  Widget build(BuildContext context) => LayoutBuilder(
    builder: (c, x) {
      final count = x.maxWidth >= 900
          ? 4
          : x.maxWidth >= 600
          ? 3
          : 2;
      return GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: items.length,
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: count,
          crossAxisSpacing: 12,
          mainAxisSpacing: 20,
          childAspectRatio: .58,
        ),
        itemBuilder: (c, i) => ProductCard(items[i]),
      );
    },
  );
}

class EmptyState extends StatelessWidget {
  const EmptyState({
    required this.icon,
    required this.title,
    this.action,
    this.onTap,
    super.key,
  });
  final IconData icon;
  final String title;
  final String? action;
  final VoidCallback? onTap;
  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.all(40),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 54, color: Colors.black26),
          const SizedBox(height: 18),
          Text(
            title,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.titleMedium,
          ),
          if (action != null) ...[
            const SizedBox(height: 18),
            FilledButton(onPressed: onTap, child: Text(action!)),
          ],
        ],
      ),
    ),
  );
}

class PageTitle extends StatelessWidget {
  const PageTitle(this.title, {this.subtitle, super.key});
  final String title;
  final String? subtitle;
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.fromLTRB(16, 18, 16, 14),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(
            context,
          ).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w300),
        ),
        if (subtitle != null)
          Text(subtitle!, style: const TextStyle(color: Colors.black54)),
      ],
    ),
  );
}

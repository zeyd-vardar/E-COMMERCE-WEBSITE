import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_app/app/app_state.dart';
import 'package:mobile_app/core/models.dart';
import 'package:mobile_app/data/catalog.dart';
import 'package:mobile_app/features/catalog_filters.dart';

void main() {
  test('every product leaf has ten deterministic products', () {
    final leaves = productLeaves();
    expect(leaves, isNotEmpty);
    for (final e in leaves) {
      expect(
        products
            .where(
              (p) =>
                  p.categoryPath.join('/') ==
                  e.path.map((n) => n.slug).join('/'),
            )
            .length,
        10,
      );
    }
    expect(products.length, leaves.length * 10);
  });
  test('category traversal finds scoped leaf', () {
    expect(findCategory('women-bags-shoulder-bags')?.name.tr, 'Omuz Çantası');
  });
  test('every hamburger menu leaf resolves to products', () {
    Iterable<CategoryNode> leaves(List<CategoryNode> nodes) sync* {
      for (final node in nodes) {
        if (node.isLeaf) {
          yield node;
        } else {
          yield* leaves(node.children);
        }
      }
    }

    for (final leaf in leaves(categoryTree)) {
      expect(
        productsForPath(leaf.id),
        isNotEmpty,
        reason: '${leaf.id} should open a populated category',
      );
    }
  });
  test('currency conversion and display', () {
    expect(converted(const AppState(currency: AppCurrency.usd), 1000), 31);
    expect(money(const AppState(currency: AppCurrency.eur), 1000), '€28.00');
  });
  test('cart totals include quantity', () {
    final p = products.first;
    final state = AppState(cart: [CartLine(productId: p.id, quantity: 2)]);
    expect(state.subtotal, p.price * 2);
  });
  test('cart discount total includes product quantity', () {
    final product = products.firstWhere((p) => p.originalPrice != null);
    final state = AppState(
      cart: [CartLine(productId: product.id, quantity: 2)],
    );
    expect(state.originalSubtotal, product.originalPrice! * 2);
    expect(state.discountTotal, (product.originalPrice! - product.price) * 2);
    expect(state.discountTotal, greaterThan(0));
  });
  test('filter and sort logic is stable', () {
    final sale = products.where((p) => p.discount > 0).toList()
      ..sort((a, b) => a.price.compareTo(b.price));
    expect(
      sale,
      everyElement(predicate<Product>((p) => p.originalPrice != null)),
    );
    expect(sale.first.price <= sale.last.price, isTrue);
  });
  test('catalog filters combine dynamic product properties', () {
    final product = products.firstWhere(
      (item) =>
          item.stock > 0 && item.colors.isNotEmpty && item.sizes.isNotEmpty,
    );
    final filters = CatalogFilters(
      categories: {product.categoryPath.first},
      brands: {product.brand},
      colors: {product.colors.first},
      sizes: {product.sizes.first},
      availability: {'in-stock'},
      minPrice: product.price,
      maxPrice: product.price,
    );

    final result = filters.apply(products);
    expect(result, contains(product));
    expect(
      result,
      everyElement(
        predicate<Product>(
          (item) =>
              item.categoryPath.first == product.categoryPath.first &&
              item.brand == product.brand &&
              item.colors.contains(product.colors.first) &&
              item.sizes.contains(product.sizes.first) &&
              item.stock > 0 &&
              item.price == product.price,
        ),
      ),
    );
  });
}

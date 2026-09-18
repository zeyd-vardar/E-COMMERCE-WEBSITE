import '../core/models.dart';

/// Holds the filters selected on a category page and applies them consistently.
class CatalogFilters {
  CatalogFilters({
    Set<String>? categories,
    Set<String>? clothingCategories,
    Set<String>? brands,
    Set<String>? colors,
    Set<String>? sizes,
    Set<String>? availability,
    this.discountedOnly = false,
    this.minPrice,
    this.maxPrice,
  }) : categories = categories ?? {},
       clothingCategories = clothingCategories ?? {},
       brands = brands ?? {},
       colors = colors ?? {},
       sizes = sizes ?? {},
       availability = availability ?? {};

  final Set<String> categories;
  final Set<String> clothingCategories;
  final Set<String> brands;
  final Set<String> colors;
  final Set<String> sizes;
  final Set<String> availability;
  final bool discountedOnly;
  final double? minPrice;
  final double? maxPrice;

  int get activeCount =>
      categories.length +
      clothingCategories.length +
      brands.length +
      colors.length +
      sizes.length +
      availability.length +
      (discountedOnly ? 1 : 0) +
      (minPrice != null ? 1 : 0) +
      (maxPrice != null ? 1 : 0);

  List<Product> apply(Iterable<Product> products) =>
      products.where(_matches).toList();

  bool _matches(Product product) {
    final clothingCategory = product.categoryPath.contains('clothing')
        ? product.categoryPath.last
        : '';
    final availabilityMatches =
        availability.isEmpty ||
        (product.stock > 0 && availability.contains('in-stock')) ||
        (product.stock == 0 && availability.contains('out-of-stock'));

    return _matchesAny([product.categoryPath.first], categories) &&
        _matchesAny([clothingCategory], clothingCategories) &&
        _matchesAny([product.brand], brands) &&
        _matchesAny(product.colors, colors) &&
        _matchesAny(product.sizes, sizes) &&
        availabilityMatches &&
        (!discountedOnly || product.discount > 0) &&
        (minPrice == null || product.price >= minPrice!) &&
        (maxPrice == null || product.price <= maxPrice!);
  }

  bool _matchesAny(Iterable<String> values, Set<String> selected) =>
      selected.isEmpty || values.any(selected.contains);
}

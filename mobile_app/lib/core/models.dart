enum AppLanguage { tr, en }

enum AppCurrency { try_, usd, eur }

class L10nText {
  const L10nText(this.tr, this.en);
  final String tr;
  final String en;
  String of(AppLanguage language) => language == AppLanguage.tr ? tr : en;
}

class CategoryNode {
  const CategoryNode(this.id, this.slug, this.name, [this.children = const []]);
  final String id;
  final String slug;
  final L10nText name;
  final List<CategoryNode> children;
  bool get isLeaf => children.isEmpty;
}

class Product {
  const Product({
    required this.id,
    required this.slug,
    required this.name,
    required this.categoryPath,
    required this.brand,
    required this.price,
    this.originalPrice,
    required this.stock,
    required this.colors,
    required this.sizes,
    required this.type,
    required this.isNew,
    required this.isBestSeller,
    required this.isOutlet,
    required this.rating,
    required this.reviewCount,
    required this.attributes,
  });
  final String id, slug, brand, type;
  final L10nText name;
  final List<String> categoryPath, colors, sizes;
  final double price, rating;
  final double? originalPrice;
  final int stock, reviewCount;
  final bool isNew, isBestSeller, isOutlet;
  final Map<String, String> attributes;
  int get discount =>
      originalPrice == null ? 0 : ((1 - price / originalPrice!) * 100).round();
}

class CartLine {
  const CartLine({
    required this.productId,
    this.variant = '',
    this.quantity = 1,
  });
  final String productId, variant;
  final int quantity;
  CartLine copyWith({int? quantity}) => CartLine(
    productId: productId,
    variant: variant,
    quantity: quantity ?? this.quantity,
  );
  Map<String, Object> toJson() => {
    'productId': productId,
    'variant': variant,
    'quantity': quantity,
  };
  factory CartLine.fromJson(Map<String, dynamic> json) => CartLine(
    productId: json['productId'] as String,
    variant: json['variant'] as String? ?? '',
    quantity: json['quantity'] as int? ?? 1,
  );
}

class Address {
  const Address({
    required this.id,
    required this.title,
    required this.detail,
    this.isDefault = false,
  });
  final String id, title, detail;
  final bool isDefault;
  Address copyWith({String? title, String? detail, bool? isDefault}) => Address(
    id: id,
    title: title ?? this.title,
    detail: detail ?? this.detail,
    isDefault: isDefault ?? this.isDefault,
  );
  Map<String, Object> toJson() => {
    'id': id,
    'title': title,
    'detail': detail,
    'isDefault': isDefault,
  };
  factory Address.fromJson(Map<String, dynamic> json) => Address(
    id: json['id'] as String,
    title: json['title'] as String,
    detail: json['detail'] as String,
    isDefault: json['isDefault'] as bool? ?? false,
  );
}

class DemoOrder {
  const DemoOrder(this.id, this.date, this.status, this.total, this.productIds);
  final String id, date, status;
  final double total;
  final List<String> productIds;
}

import '../core/models.dart';

const t = L10nText.new;
CategoryNode leaf(String scope, String slug, String tr, String en) =>
    CategoryNode('$scope-$slug', slug, t(tr, en));
CategoryNode group(
  String id,
  String slug,
  String tr,
  String en,
  List<CategoryNode> children,
) => CategoryNode(id, slug, t(tr, en), children);
List<CategoryNode> leaves(
  String scope,
  List<(String, String, String)> values,
) => values.map((e) => leaf(scope, e.$1, e.$2, e.$3)).toList();

final categoryTree = <CategoryNode>[
  group(
    'all',
    'all',
    'Tüm Ürünler',
    'All Products',
    leaves('all', [
      ('women', 'Kadın', 'Women'),
      ('men', 'Erkek', 'Men'),
      ('kids', 'Çocuk ve Bebek', 'Kids & Baby'),
      ('new-arrivals', 'Yeni Gelenler', 'New Arrivals'),
      ('best-sellers', 'Çok Satanlar', 'Best Sellers'),
    ]),
  ),
  group(
    'sale',
    'sale',
    'İndirimli Ürünler',
    'Sale',
    leaves('sale', [
      ('all-sale', 'Tüm İndirimler', 'All Sale'),
      ('women-sale', 'Kadın İndirim', 'Women Sale'),
      ('men-sale', 'Erkek İndirim', 'Men Sale'),
      ('kids-sale', 'Çocuk İndirim', 'Kids Sale'),
      ('shoes-sale', 'Ayakkabı İndirim', 'Shoes Sale'),
      ('accessories-sale', 'Aksesuar İndirim', 'Accessories Sale'),
      ('outlet-deals', 'Outlet Fırsatları', 'Outlet Deals'),
    ]),
  ),
  _gender('men', 'Erkek', 'Men'),
  _gender('women', 'Kadın', 'Women'),
  group('kids', 'kids', 'Çocuk ve Bebek', 'Kids & Baby', [
    _kids('kids-girls', 'girls', 'Kız Çocuk', 'Girls', [
      ('dresses', 'Elbise', 'Dresses'),
      ('skirts', 'Etek', 'Skirts'),
    ]),
    _kids('kids-boys', 'boys', 'Erkek Çocuk', 'Boys', [
      ('shirts', 'Gömlek', 'Shirts'),
    ]),
    group(
      'kids-baby-girls',
      'baby-girls',
      'Bebek Kız',
      'Baby Girls',
      leaves('kids-baby-girls', [
        ('bodysuits', 'Body', 'Bodysuits'),
        ('rompers', 'Tulum', 'Rompers'),
        ('dresses', 'Elbise', 'Dresses'),
        ('sets', 'Takımlar', 'Sets'),
        ('pajamas', 'Pijama', 'Pajamas'),
        ('coats', 'Mont', 'Coats'),
      ]),
    ),
    group(
      'kids-baby-boys',
      'baby-boys',
      'Bebek Erkek',
      'Baby Boys',
      leaves('kids-baby-boys', [
        ('bodysuits', 'Body', 'Bodysuits'),
        ('rompers', 'Tulum', 'Rompers'),
        ('tshirts', 'Tişört', 'T-Shirts'),
        ('sets', 'Takımlar', 'Sets'),
        ('pajamas', 'Pijama', 'Pajamas'),
        ('coats', 'Mont', 'Coats'),
      ]),
    ),
    group(
      'kids-shoes',
      'shoes',
      'Ayakkabı',
      'Shoes',
      leaves('kids-shoes', [
        ('sneakers', 'Spor Ayakkabı', 'Sneakers'),
        ('casual-shoes', 'Günlük Ayakkabı', 'Casual Shoes'),
        ('sandals', 'Sandalet', 'Sandals'),
        ('boots', 'Bot', 'Boots'),
        ('slippers', 'Terlik', 'Slippers'),
      ]),
    ),
    group(
      'kids-accessories',
      'accessories',
      'Aksesuar',
      'Accessories',
      leaves('kids-accessories', [
        ('bags', 'Çanta', 'Bags'),
        ('hats', 'Şapka & Bere', 'Hats'),
        ('socks', 'Çorap', 'Socks'),
        ('scarves', 'Atkı', 'Scarves'),
        ('gloves', 'Eldiven', 'Gloves'),
      ]),
    ),
  ]),
  group('accessories', 'accessories', 'Aksesuar', 'Accessories', [
    group(
      'accessories-bags',
      'bags',
      'Çanta',
      'Bags',
      leaves('accessories-bags', [
        ('women-bags', 'Kadın Çanta', 'Women’s Bags'),
        ('men-bags', 'Erkek Çanta', 'Men’s Bags'),
        ('shoulder-bags', 'Omuz Çantası', 'Shoulder Bags'),
        ('backpacks', 'Sırt Çantası', 'Backpacks'),
        ('crossbody-bags', 'Çapraz Çanta', 'Crossbody Bags'),
        ('handbags', 'El Çantası', 'Handbags'),
        ('wallets', 'Cüzdan', 'Wallets'),
      ]),
    ),
    group(
      'accessories-watches',
      'watches',
      'Saat',
      'Watches',
      leaves('accessories-watches', [
        ('women-watches', 'Kadın Saatleri', 'Women’s Watches'),
        ('men-watches', 'Erkek Saatleri', 'Men’s Watches'),
        ('smart-watches', 'Akıllı Saatler', 'Smart Watches'),
      ]),
    ),
    group(
      'accessories-jewelry',
      'jewelry',
      'Takı',
      'Jewelry',
      leaves('accessories-jewelry', [
        ('necklaces', 'Kolye', 'Necklaces'),
        ('bracelets', 'Bileklik', 'Bracelets'),
        ('earrings', 'Küpe', 'Earrings'),
        ('rings', 'Yüzük', 'Rings'),
      ]),
    ),
    group(
      'accessories-eyewear',
      'eyewear',
      'Gözlük',
      'Eyewear',
      leaves('accessories-eyewear', [
        ('women-sunglasses', 'Kadın Güneş Gözlüğü', 'Women’s Sunglasses'),
        ('men-sunglasses', 'Erkek Güneş Gözlüğü', 'Men’s Sunglasses'),
      ]),
    ),
    group(
      'accessories-other',
      'other',
      'Diğer',
      'Other',
      leaves('accessories-other', [
        ('belts', 'Kemer', 'Belts'),
        ('hats', 'Şapka & Bere', 'Hats'),
        ('scarves', 'Şal & Fular', 'Scarves'),
        ('gloves', 'Eldiven', 'Gloves'),
      ]),
    ),
  ]),
  group(
    'outlet',
    'outlet',
    'Outlet',
    'Outlet',
    leaves('outlet', [
      ('all-outlet', 'Tüm Outlet', 'All Outlet'),
      ('women-outlet', 'Kadın Outlet', 'Women Outlet'),
      ('men-outlet', 'Erkek Outlet', 'Men Outlet'),
      ('kids-outlet', 'Çocuk Outlet', 'Kids Outlet'),
      ('shoes-outlet', 'Ayakkabı Outlet', 'Shoes Outlet'),
      ('accessories-outlet', 'Aksesuar Outlet', 'Accessories Outlet'),
      ('last-chance', 'Son Şans', 'Last Chance'),
    ]),
  ),
];

CategoryNode _gender(String id, String tr, String en) => group(id, id, tr, en, [
  group(
    '$id-clothing',
    'clothing',
    'Giyim',
    'Clothing',
    leaves('$id-clothing', id == 'women' ? _womenClothing : _menClothing),
  ),
  group(
    '$id-shoes',
    'shoes',
    'Ayakkabı',
    'Shoes',
    leaves('$id-shoes', id == 'women' ? _womenShoes : _menShoes),
  ),
  group(
    '$id-bags',
    'bags',
    'Çanta',
    'Bags',
    leaves('$id-bags', id == 'women' ? _womenBags : _menBags),
  ),
  group(
    '$id-accessories',
    'accessories',
    'Aksesuar',
    'Accessories',
    leaves(
      '$id-accessories',
      id == 'women' ? _womenAccessories : _menAccessories,
    ),
  ),
]);
CategoryNode _kids(
  String id,
  String slug,
  String tr,
  String en,
  List<(String, String, String)> extra,
) => group(
  id,
  slug,
  tr,
  en,
  leaves(id, [
    ('tshirts', 'Tişört', 'T-Shirts'),
    ('sweatshirts', 'Sweatshirt', 'Sweatshirts'),
    ('knitwear', 'Kazak', 'Knitwear'),
    ('trousers', 'Pantolon', 'Trousers'),
    ('jeans', 'Jean', 'Jeans'),
    ('shorts', 'Şort', 'Shorts'),
    ('leggings', 'Tayt', 'Leggings'),
    ('coats', 'Mont & Kaban', 'Coats'),
    ('pajamas', 'Pijama', 'Pajamas'),
    ...extra,
  ]),
);
const _womenClothing = [
  ('new-arrivals', 'Yeni Gelenler', 'New Arrivals'),
  ('dresses', 'Elbise', 'Dresses'),
  ('evening-dresses', 'Abiye', 'Evening Dresses'),
  ('tshirts', 'Tişört', 'T-Shirts'),
  ('blouses', 'Bluz', 'Blouses'),
  ('shirts', 'Gömlek', 'Shirts'),
  ('sweatshirts', 'Sweatshirt', 'Sweatshirts'),
  ('knitwear', 'Kazak & Triko', 'Knitwear'),
  ('trousers', 'Pantolon', 'Trousers'),
  ('jeans', 'Jean', 'Jeans'),
  ('skirts', 'Etek', 'Skirts'),
  ('shorts', 'Şort', 'Shorts'),
  ('leggings', 'Tayt', 'Leggings'),
  ('suits', 'Takım', 'Sets'),
  ('jackets', 'Ceket', 'Jackets'),
  ('blazers', 'Blazer', 'Blazers'),
  ('puffer-jackets', 'Mont', 'Puffer Jackets'),
  ('coats', 'Kaban', 'Coats'),
  ('trenchcoats', 'Trençkot', 'Trench Coats'),
];
const _menClothing = [
  ('new-arrivals', 'Yeni Gelenler', 'New Arrivals'),
  ('tshirts', 'Tişört', 'T-Shirts'),
  ('polo', 'Polo Yaka', 'Polo Shirts'),
  ('shirts', 'Gömlek', 'Shirts'),
  ('sweatshirts', 'Sweatshirt', 'Sweatshirts'),
  ('hoodies', 'Hoodie', 'Hoodies'),
  ('knitwear', 'Kazak & Triko', 'Knitwear'),
  ('trousers', 'Pantolon', 'Trousers'),
  ('jeans', 'Jean', 'Jeans'),
  ('shorts', 'Şort', 'Shorts'),
  ('tracksuits', 'Eşofman', 'Tracksuits'),
  ('suits', 'Takım Elbise', 'Suits'),
  ('jackets', 'Ceket', 'Jackets'),
  ('blazers', 'Blazer', 'Blazers'),
  ('puffer-jackets', 'Mont', 'Puffer Jackets'),
  ('coats', 'Kaban', 'Coats'),
];
const _womenShoes = [
  ('sneakers', 'Spor Ayakkabı', 'Sneakers'),
  ('casual-shoes', 'Günlük Ayakkabı', 'Casual Shoes'),
  ('heels', 'Topuklu Ayakkabı', 'Heels'),
  ('flats', 'Babet', 'Flats'),
  ('loafers', 'Loafer', 'Loafers'),
  ('sandals', 'Sandalet', 'Sandals'),
  ('slippers', 'Terlik', 'Slippers'),
  ('boots', 'Bot', 'Boots'),
  ('tall-boots', 'Çizme', 'Tall Boots'),
];
const _menShoes = [
  ('sneakers', 'Spor Ayakkabı', 'Sneakers'),
  ('casual-shoes', 'Günlük Ayakkabı', 'Casual Shoes'),
  ('formal-shoes', 'Klasik Ayakkabı', 'Formal Shoes'),
  ('loafers', 'Loafer', 'Loafers'),
  ('boots', 'Bot', 'Boots'),
  ('sandals', 'Sandalet', 'Sandals'),
  ('slippers', 'Terlik', 'Slippers'),
];
const _womenBags = [
  ('shoulder-bags', 'Omuz Çantası', 'Shoulder Bags'),
  ('handbags', 'El Çantası', 'Handbags'),
  ('crossbody-bags', 'Çapraz Çanta', 'Crossbody Bags'),
  ('backpacks', 'Sırt Çantası', 'Backpacks'),
  ('clutches', 'Clutch', 'Clutches'),
  ('wallets', 'Cüzdan', 'Wallets'),
];
const _menBags = [
  ('backpacks', 'Sırt Çantası', 'Backpacks'),
  ('shoulder-bags', 'Omuz Çantası', 'Shoulder Bags'),
  ('briefcases', 'Evrak Çantası', 'Briefcases'),
  ('belt-bags', 'Bel Çantası', 'Belt Bags'),
  ('wallets', 'Cüzdan', 'Wallets'),
];
const _womenAccessories = [
  ('watches', 'Saat', 'Watches'),
  ('jewelry', 'Takı', 'Jewelry'),
  ('eyewear', 'Gözlük', 'Eyewear'),
  ('belts', 'Kemer', 'Belts'),
  ('hats', 'Şapka & Bere', 'Hats'),
  ('scarves', 'Şal & Fular', 'Scarves'),
  ('hair-accessories', 'Saç Aksesuarları', 'Hair Accessories'),
];
const _menAccessories = [
  ('watches', 'Saat', 'Watches'),
  ('eyewear', 'Gözlük', 'Eyewear'),
  ('belts', 'Kemer', 'Belts'),
  ('ties', 'Kravat', 'Ties'),
  ('bow-ties', 'Papyon', 'Bow Ties'),
  ('hats', 'Şapka & Bere', 'Hats'),
  ('jewelry', 'Takı', 'Jewelry'),
];

List<({CategoryNode node, List<CategoryNode> path})> productLeaves([
  List<CategoryNode>? nodes,
  List<CategoryNode> path = const [],
]) => (nodes ?? categoryTree).expand((n) {
  final next = [...path, n];
  if (n.isLeaf) {
    return path.isNotEmpty &&
            const {
              'women',
              'men',
              'kids',
              'accessories',
            }.contains(path.first.id)
        ? [(node: n, path: next)]
        : <({CategoryNode node, List<CategoryNode> path})>[];
  }
  return productLeaves(n.children, next);
}).toList();
final productLeafEntries = productLeaves();
final products = productLeafEntries.indexed
    .expand(
      (indexedEntry) => List.generate(
        10,
        (offset) => _product(
          indexedEntry.$2.node,
          indexedEntry.$2.path,
          offset,
          indexedEntry.$1,
        ),
      ),
    )
    .toList(growable: false);
Product _product(
  CategoryNode node,
  List<CategoryNode> path,
  int offset,
  int leafIndex,
) {
  final slugs = path.map((e) => e.slug).toList();
  final type =
      slugs.any(
        {
          'shoes',
          'sneakers',
          'boots',
          'sandals',
          'slippers',
          'loafers',
          'heels',
        }.contains,
      )
      ? 'shoes'
      : slugs.any(
          {'watches', 'women-watches', 'men-watches', 'smart-watches'}.contains,
        )
      ? 'watch'
      : slugs.any(
          {'jewelry', 'necklaces', 'bracelets', 'earrings', 'rings'}.contains,
        )
      ? 'jewelry'
      : slugs.any(
          {
            'bags',
            'shoulder-bags',
            'handbags',
            'backpacks',
            'wallets',
          }.contains,
        )
      ? 'bag'
      : slugs.first == 'kids'
      ? 'kids'
      : 'clothing';
  final ranges = {
    'clothing': (490, 3290),
    'kids': (290, 1790),
    'shoes': (890, 4990),
    'bag': (690, 5990),
    'watch': (1290, 12990),
    'jewelry': (290, 3490),
  };
  final range = ranges[type]!;
  final original = (range.$1 + (range.$2 - range.$1) * offset / 10)
      .roundToDouble();
  final discount = [0, 10, 0, 20, 0, 30, 0, 15, 0, 25][offset];
  final noSize = {'watch', 'jewelry', 'bag'}.contains(type);
  return Product(
    id: 'item-${path.map((e) => e.id).join('-')}-$offset',
    slug: '${path.map((e) => e.slug).join('-')}-$offset',
    name: L10nText(
      '${node.name.tr.toUpperCase()} ${offset + 1}',
      '${node.name.en.toUpperCase()} ${offset + 1}',
    ),
    categoryPath: slugs,
    brand: ['STORE', 'FORM', 'MODE', 'LINE'][offset % 4],
    price: discount == 0
        ? original
        : (original * (1 - discount / 100)).roundToDouble(),
    originalPrice: discount == 0 ? null : original,
    stock: [12, 5, 0, 18, 2, 9, 0, 3, 14, 7][offset],
    colors: [offset.isEven ? 'Ekru' : 'Siyah', 'Lacivert'],
    sizes: noSize
        ? []
        : (type == 'shoes'
              ? ['36', '37', '38', '39', '40', '41', '42']
              : ['XS', 'S', 'M', 'L', 'XL']),
    type: type,
    isNew: offset % 4 == 0,
    isBestSeller: offset % 5 == 0,
    isOutlet: (leafIndex + offset) % 7 == 0,
    rating: 4.1 + (offset % 5) * .17,
    reviewCount: 12 + offset * 13,
    attributes: type == 'watch'
        ? {'Kordon': 'Deri', 'Kasa': '42 mm'}
        : type == 'jewelry'
        ? {'Materyal': 'Paslanmaz Çelik', 'Uzunluk': '45 cm'}
        : type == 'shoes'
        ? {'Materyal': 'Deri', 'Taban': 'Kauçuk'}
        : {'Materyal': 'Pamuk Karışımlı', 'Kalıp': 'Regular'},
  );
}

CategoryNode? findCategory(String path, [List<CategoryNode>? nodes]) {
  for (final n in nodes ?? categoryTree) {
    if (n.id == path || n.slug == path || _path(n) == path) return n;
    final found = findCategory(path, n.children);
    if (found != null) return found;
  }
  return null;
}

String _path(CategoryNode n) => n.slug;
List<Product> productsForPath(String path) {
  final normalized = Uri.decodeComponent(path);
  if (normalized == 'all') return products;
  if (normalized.startsWith('all-')) {
    if (normalized == 'all-new-arrivals') {
      return products.where((product) => product.isNew).toList();
    }
    if (normalized == 'all-best-sellers') {
      return products.where((product) => product.isBestSeller).toList();
    }
    final scope = normalized.substring(4);
    return products
        .where((product) => product.categoryPath.first == scope)
        .toList();
  }
  if (normalized == 'sale' || normalized.startsWith('sale-')) {
    var result = products.where((product) => product.discount > 0);
    if (normalized.contains('women-sale')) {
      result = result.where((product) => product.categoryPath.first == 'women');
    } else if (normalized.contains('men-sale')) {
      result = result.where((product) => product.categoryPath.first == 'men');
    } else if (normalized.contains('kids-sale')) {
      result = result.where((product) => product.categoryPath.first == 'kids');
    } else if (normalized.contains('shoes-sale')) {
      result = result.where((product) => product.type == 'shoes');
    } else if (normalized.contains('accessories-sale')) {
      result = result.where(
        (product) => product.categoryPath.first == 'accessories',
      );
    } else if (normalized.contains('outlet-deals')) {
      result = result.where((product) => product.isOutlet);
    }
    return result.toList();
  }
  if (normalized == 'outlet' || normalized.startsWith('outlet-')) {
    var result = products.where((product) => product.isOutlet);
    if (normalized.contains('women-outlet')) {
      result = result.where((product) => product.categoryPath.first == 'women');
    } else if (normalized.contains('men-outlet')) {
      result = result.where((product) => product.categoryPath.first == 'men');
    } else if (normalized.contains('kids-outlet')) {
      result = result.where((product) => product.categoryPath.first == 'kids');
    } else if (normalized.contains('shoes-outlet')) {
      result = result.where((product) => product.type == 'shoes');
    } else if (normalized.contains('accessories-outlet')) {
      result = result.where(
        (product) => product.categoryPath.first == 'accessories',
      );
    }
    return result.toList();
  }
  final matchingPaths = productLeafEntries
      .where((entry) {
        final slugs = entry.path.map((node) => node.slug).toList();
        return entry.path.any((node) => node.id == normalized) ||
            slugs.join('/') == normalized ||
            slugs.contains(normalized);
      })
      .map((entry) => entry.path.map((node) => node.slug).join('/'))
      .toSet();
  return products
      .where(
        (product) => matchingPaths.contains(product.categoryPath.join('/')),
      )
      .toList();
}

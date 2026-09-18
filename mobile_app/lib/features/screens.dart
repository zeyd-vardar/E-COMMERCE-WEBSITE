import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../app/app_state.dart';
import '../core/models.dart';
import '../data/catalog.dart';
import '../shared/widgets.dart';
import 'catalog_filters.dart';

class StoreShell extends ConsumerWidget {
  const StoreShell({required this.location, required this.child, super.key});
  final String location;
  final Widget child;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    final paths = ['/', '/search', '/tracking', '/favorites', '/cart'];
    final directIndex = paths.indexOf(location);
    final index = directIndex < 0 ? 0 : directIndex;
    final isMainDestination = directIndex >= 0;
    return Scaffold(
      appBar: isMainDestination
          ? AppBar(
              leading: Builder(
                builder: (c) => IconButton(
                  tooltip: tr(s, 'Menü', 'Menu'),
                  icon: const Icon(Icons.menu),
                  onPressed: () => Scaffold.of(c).openDrawer(),
                ),
              ),
              title: const Text(
                'STORE',
                style: TextStyle(letterSpacing: 5, fontWeight: FontWeight.w400),
              ),
              actions: [
                IconButton(
                  tooltip: tr(s, 'Hesabım', 'Account'),
                  onPressed: () => context.push('/account'),
                  icon: const Icon(Icons.person_outline),
                ),
              ],
            )
          : null,
      drawer: isMainDestination ? const StoreDrawer() : null,
      body: SafeArea(top: false, child: child),
      bottomNavigationBar: SafeArea(
        top: false,
        child: NavigationBar(
          selectedIndex: index,
          onDestinationSelected: (i) => context.go(paths[i]),
          destinations: [
            NavigationDestination(
              icon: const Icon(Icons.home_outlined),
              selectedIcon: const Icon(Icons.home),
              label: tr(s, 'ANA SAYFA', 'HOME'),
            ),
            NavigationDestination(
              icon: const Icon(Icons.search),
              label: tr(s, 'ARAMA', 'SEARCH'),
            ),
            NavigationDestination(
              icon: const Icon(Icons.local_shipping_outlined),
              label: tr(s, 'KARGO TAKİP', 'TRACKING'),
            ),
            NavigationDestination(
              icon: Badge(
                isLabelVisible: s.favorites.isNotEmpty,
                label: Text('${s.favorites.length}'),
                child: const Icon(Icons.favorite_border),
              ),
              label: tr(s, 'FAVORİLER', 'FAVORITES'),
            ),
            NavigationDestination(
              icon: Badge(
                isLabelVisible: s.cartCount > 0,
                label: Text('${s.cartCount}'),
                child: const Icon(Icons.shopping_bag_outlined),
              ),
              label: tr(s, 'SEPET', 'CART'),
            ),
          ],
        ),
      ),
    );
  }
}

class StoreDrawer extends ConsumerWidget {
  const StoreDrawer({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    return Drawer(
      child: SafeArea(
        child: ListView(
          padding: const EdgeInsets.symmetric(vertical: 12),
          children: [
            const ListTile(
              title: Text(
                'STORE',
                style: TextStyle(letterSpacing: 4, fontSize: 22),
              ),
            ),
            for (final c in categoryTree)
              ExpansionTile(
                title: Text(c.name.of(s.language)),
                children: c.isLeaf
                    ? []
                    : c.children
                          .map(
                            (n) => ListTile(
                              minTileHeight: 48,
                              title: Text(n.name.of(s.language)),
                              trailing: const Icon(Icons.chevron_right),
                              onTap: () {
                                final router = GoRouter.of(context);
                                final navigationContext = Navigator.of(
                                  context,
                                ).context;
                                Navigator.pop(context);
                                WidgetsBinding.instance.addPostFrameCallback((
                                  _,
                                ) {
                                  if (n.isLeaf) {
                                    router.push('/category/${n.id}');
                                  } else {
                                    _showChildren(navigationContext, n);
                                  }
                                });
                              },
                            ),
                          )
                          .toList(),
              ),
            const Divider(),
            _link(
              context,
              Icons.compare_arrows,
              tr(s, 'Karşılaştır', 'Compare'),
              '/compare',
            ),
            _link(
              context,
              Icons.person_outline,
              tr(s, 'Hesabım', 'Account'),
              '/account',
            ),
            _link(
              context,
              Icons.inventory_2_outlined,
              tr(s, 'Stok Takip', 'Stock alerts'),
              '/account/stock-alerts',
            ),
            _link(
              context,
              Icons.settings_outlined,
              tr(s, 'Dil ve Para Birimi', 'Language & Currency'),
              '/settings',
            ),
            ListTile(
              leading: const Icon(Icons.support_agent),
              title: Text(tr(s, '7/24 Destek', '24/7 Support')),
              onTap: () => showDialog(
                context: context,
                builder: (c) => AlertDialog(
                  title: Text(tr(s, 'Canlı Destek', 'Live Support')),
                  content: Text(
                    tr(
                      s,
                      'Demo modunda destek servisi hazır. Gerçek operatör backend ile bağlanabilir.',
                      'Support service boundary is ready in demo mode.',
                    ),
                  ),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(c),
                      child: const Text('OK'),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

Widget _link(BuildContext c, IconData i, String t, String p) => ListTile(
  leading: Icon(i),
  title: Text(t),
  onTap: () {
    Navigator.pop(c);
    c.push(p);
  },
);
void _showChildren(BuildContext context, CategoryNode node) =>
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (c) => SafeArea(
        child: DraggableScrollableSheet(
          expand: false,
          initialChildSize: .7,
          maxChildSize: .95,
          builder: (c, sc) => ListView(
            controller: sc,
            children: [
              PageTitle(node.name.tr),
              ...node.children.map(
                (n) => ListTile(
                  minTileHeight: 56,
                  title: Text(n.name.tr),
                  trailing: const Icon(Icons.chevron_right),
                  onTap: () {
                    final router = GoRouter.of(context);
                    Navigator.pop(c);
                    WidgetsBinding.instance.addPostFrameCallback((_) {
                      if (n.isLeaf) {
                        router.push('/category/${n.id}');
                      } else {
                        _showChildren(context, n);
                      }
                    });
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );

class _HomeCampaign {
  const _HomeCampaign({
    required this.eyebrowTr,
    required this.eyebrowEn,
    required this.titleTr,
    required this.titleEn,
    required this.descriptionTr,
    required this.descriptionEn,
    required this.ctaTr,
    required this.ctaEn,
    required this.route,
    required this.imagePath,
    required this.colors,
  });

  final String eyebrowTr, eyebrowEn, titleTr, titleEn;
  final String descriptionTr, descriptionEn, ctaTr, ctaEn, route, imagePath;
  final List<Color> colors;
}

class HomeCampaignCarousel extends ConsumerStatefulWidget {
  const HomeCampaignCarousel({super.key});

  @override
  ConsumerState<HomeCampaignCarousel> createState() =>
      _HomeCampaignCarouselState();
}

class _HomeCampaignCarouselState extends ConsumerState<HomeCampaignCarousel> {
  late final PageController _controller;
  int _activePage = 0;

  static const _campaigns = [
    _HomeCampaign(
      eyebrowTr: 'İLKBAHAR / YAZ 2026',
      eyebrowEn: 'SPRING / SUMMER 2026',
      titleTr: 'Sessiz bir\nözgüven.',
      titleEn: 'Quiet\nconfidence.',
      descriptionTr: 'Yeni sezonun rafine silüetlerini keşfet.',
      descriptionEn: 'Discover the refined silhouettes of the new season.',
      ctaTr: 'KOLEKSİYONU KEŞFET',
      ctaEn: 'EXPLORE COLLECTION',
      route: '/category/all',
      imagePath: 'assets/images/aurea-hero.png',
      colors: [Color(0xffd8c7b7), Color(0xfff3ece4)],
    ),
    _HomeCampaign(
      eyebrowTr: 'STORE SALE',
      eyebrowEn: 'STORE SALE',
      titleTr: 'İndirimleri\nkaçırma.',
      titleEn: 'Don’t miss\nthe sale.',
      descriptionTr: 'Seçili ürünlerdeki özel fiyatları keşfet.',
      descriptionEn: 'Discover special prices on selected pieces.',
      ctaTr: 'İNDİRİMLERİ KEŞFET',
      ctaEn: 'EXPLORE THE SALE',
      route: '/category/sale',
      imagePath: 'assets/images/aurea-sale-campaign.png',
      colors: [Color(0xff3b302b), Color(0xff8a5e49)],
    ),
    _HomeCampaign(
      eyebrowTr: 'STORE MEN',
      eyebrowEn: 'STORE MEN',
      titleTr: 'Erkek',
      titleEn: 'Men',
      descriptionTr: 'Modern erkek stilinin zamansız parçaları.',
      descriptionEn: 'Timeless pieces for modern menswear.',
      ctaTr: 'ERKEK ÜRÜNLERİNİ KEŞFET',
      ctaEn: 'EXPLORE MEN',
      route: '/category/men',
      imagePath: 'assets/images/store-men-campaign.png',
      colors: [Color(0xffa9aaa5), Color(0xffe2dfd6)],
    ),
    _HomeCampaign(
      eyebrowTr: 'STORE WOMEN',
      eyebrowEn: 'STORE WOMEN',
      titleTr: 'Kadın',
      titleEn: 'Women',
      descriptionTr: 'Güçlü ve zarif kadın stilinin yeni seçkisi.',
      descriptionEn: 'The new edit of confident, refined womenswear.',
      ctaTr: 'KADIN ÜRÜNLERİNİ KEŞFET',
      ctaEn: 'EXPLORE WOMEN',
      route: '/category/women',
      imagePath: 'assets/images/store-women-campaign.png',
      colors: [Color(0xffc8aaa0), Color(0xfff1e7df)],
    ),
  ];

  @override
  void initState() {
    super.initState();
    _controller = PageController(viewportFraction: .91);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(appStateProvider);
    return Semantics(
      label: tr(state, 'Kampanya kaydırıcısı', 'Campaign carousel'),
      child: Column(
        children: [
          SizedBox(
            height: 286,
            child: Stack(
              alignment: Alignment.center,
              children: [
                PageView.builder(
                  controller: _controller,
                  padEnds: false,
                  itemCount: _campaigns.length,
                  onPageChanged: (value) => setState(() => _activePage = value),
                  itemBuilder: (context, index) {
                    final item = _campaigns[index];
                    const foreground = Colors.white;
                    return Padding(
                      padding: EdgeInsets.only(
                        left: index == 0 ? 12 : 6,
                        right: 6,
                      ),
                      child: InkWell(
                        borderRadius: BorderRadius.circular(22),
                        onTap: () => context.push(item.route),
                        child: Ink(
                          decoration: BoxDecoration(
                            gradient: LinearGradient(colors: item.colors),
                            borderRadius: BorderRadius.circular(22),
                          ),
                          child: Stack(
                            children: [
                              Positioned.fill(
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(22),
                                  child: Image.asset(
                                    item.imagePath,
                                    fit: BoxFit.cover,
                                    alignment: Alignment.center,
                                    filterQuality: FilterQuality.medium,
                                    errorBuilder:
                                        (context, error, stackTrace) =>
                                            DecoratedBox(
                                              decoration: BoxDecoration(
                                                gradient: LinearGradient(
                                                  colors: item.colors,
                                                ),
                                              ),
                                            ),
                                  ),
                                ),
                              ),
                              Positioned.fill(
                                child: DecoratedBox(
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(22),
                                    gradient: const LinearGradient(
                                      begin: Alignment.topCenter,
                                      end: Alignment.bottomCenter,
                                      colors: [
                                        Color(0x14000000),
                                        Color(0x33000000),
                                        Color(0xcc000000),
                                      ],
                                      stops: [0, .45, 1],
                                    ),
                                  ),
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.fromLTRB(
                                  24,
                                  26,
                                  24,
                                  22,
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.end,
                                  children: [
                                    Text(
                                      tr(state, item.eyebrowTr, item.eyebrowEn),
                                      style: TextStyle(
                                        color: foreground,
                                        letterSpacing: 2,
                                        fontSize: 10,
                                      ),
                                    ),
                                    const SizedBox(height: 7),
                                    Text(
                                      tr(state, item.titleTr, item.titleEn),
                                      style: TextStyle(
                                        color: foreground,
                                        fontSize: 35,
                                        height: 1,
                                        fontWeight: FontWeight.w300,
                                      ),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      tr(
                                        state,
                                        item.descriptionTr,
                                        item.descriptionEn,
                                      ),
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: TextStyle(color: foreground),
                                    ),
                                    const SizedBox(height: 14),
                                    Row(
                                      children: [
                                        Text(
                                          tr(state, item.ctaTr, item.ctaEn),
                                          style: TextStyle(
                                            color: foreground,
                                            fontSize: 11,
                                            fontWeight: FontWeight.w700,
                                            letterSpacing: .6,
                                          ),
                                        ),
                                        const SizedBox(width: 6),
                                        Icon(
                                          Icons.arrow_forward,
                                          size: 17,
                                          color: foreground,
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              _campaigns.length,
              (index) => AnimatedContainer(
                duration: const Duration(milliseconds: 220),
                width: index == _activePage ? 24 : 7,
                height: 7,
                margin: const EdgeInsets.symmetric(horizontal: 3),
                decoration: BoxDecoration(
                  color: index == _activePage
                      ? Theme.of(context).colorScheme.primary
                      : Colors.black12,
                  borderRadius: BorderRadius.circular(20),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    final featured = products.where((p) => p.isNew).take(12).toList();
    final recent = products
        .where((p) => s.recentlyViewed.contains(p.id))
        .take(8)
        .toList();
    return RefreshIndicator(
      onRefresh: () async =>
          Future<void>.delayed(const Duration(milliseconds: 350)),
      child: ListView(
        padding: const EdgeInsets.only(bottom: 24),
        children: [
          const SizedBox(height: 12),
          const HomeCampaignCarousel(),
          PageTitle(
            tr(s, 'Yeni Sezon', 'New Season'),
            subtitle: tr(s, 'Rafine seçimler', 'Curated essentials'),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: ProductGrid(featured),
          ),
          if (recent.isNotEmpty) ...[
            PageTitle(tr(s, 'Son Görüntülenenler', 'Recently Viewed')),
            SizedBox(
              height: 270,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 12),
                itemCount: recent.length,
                itemBuilder: (c, i) =>
                    SizedBox(width: 170, child: ProductCard(recent[i])),
                separatorBuilder: (c, i) => const SizedBox(width: 12),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class CategoriesScreen extends ConsumerWidget {
  const CategoriesScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(s, 'Kategoriler', 'Categories'))),
      body: ListView(
        children: categoryTree
            .map(
              (n) => ExpansionTile(
                title: Text(n.name.of(s.language)),
                children: n.children
                    .map(
                      (c) => ListTile(
                        minTileHeight: 56,
                        title: Text(c.name.of(s.language)),
                        trailing: const Icon(Icons.chevron_right),
                        onTap: () => c.isLeaf
                            ? context.push('/category/${c.id}')
                            : _showChildren(context, c),
                      ),
                    )
                    .toList(),
              ),
            )
            .toList(),
      ),
    );
  }
}

enum SortMode { recommended, newest, priceAsc, priceDesc, popular, bestseller }

class CategoryScreen extends ConsumerStatefulWidget {
  const CategoryScreen({required this.path, super.key});
  final String path;
  @override
  ConsumerState<CategoryScreen> createState() => _CategoryState();
}

class _CategoryState extends ConsumerState<CategoryScreen> {
  SortMode sort = SortMode.recommended;
  CatalogFilters filters = CatalogFilters();
  int shown = 20;

  @override
  Widget build(BuildContext context) {
    final s = ref.watch(appStateProvider);
    final node = findCategory(widget.path);
    var list = filters.apply(productsForPath(widget.path));
    switch (sort) {
      case SortMode.priceAsc:
        list.sort((a, b) => a.price.compareTo(b.price));
      case SortMode.priceDesc:
        list.sort((a, b) => b.price.compareTo(a.price));
      case SortMode.newest:
        list = list.where((p) => p.isNew).toList();
      case SortMode.popular:
        list.sort((a, b) => b.rating.compareTo(a.rating));
      case SortMode.bestseller:
        list.sort(
          (a, b) => (b.isBestSeller ? 1 : 0).compareTo(a.isBestSeller ? 1 : 0),
        );
      case SortMode.recommended:
    }
    final visible = list.take(shown).toList();
    return Scaffold(
      appBar: AppBar(
        title: Text(node?.name.of(s.language) ?? widget.path),
        actions: [
          IconButton(
            tooltip: tr(s, 'Karşılaştır', 'Compare'),
            onPressed: () => context.push('/compare'),
            icon: const Icon(Icons.compare_arrows),
          ),
        ],
      ),
      body: NotificationListener<ScrollNotification>(
        onNotification: (n) {
          if (n.metrics.pixels > n.metrics.maxScrollExtent - 300 &&
              shown < list.length) {
            setState(() => shown += 20);
          }
          return false;
        },
        child: RefreshIndicator(
          onRefresh: () async {
            setState(() => shown = 20);
          },
          child: ListView(
            padding: const EdgeInsets.all(12),
            children: [
              Text('${list.length} ${tr(s, 'ürün', 'products')}'),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () => _filters(s),
                      icon: const Icon(Icons.tune),
                      label: Text(tr(s, 'Filtrele', 'Filter')),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () => _sort(s),
                      icon: const Icon(Icons.sort),
                      label: Text(tr(s, 'Sırala', 'Sort')),
                    ),
                  ),
                ],
              ),
              if (filters.activeCount > 0)
                Wrap(
                  spacing: 6,
                  children: [
                    InputChip(
                      label: Text(
                        '${filters.activeCount} ${tr(s, 'filtre', 'filters')}',
                      ),
                      onDeleted: () => setState(() {
                        filters = CatalogFilters();
                        shown = 20;
                      }),
                    ),
                    TextButton(
                      onPressed: () => setState(() {
                        filters = CatalogFilters();
                        shown = 20;
                      }),
                      child: Text(tr(s, 'Tümünü temizle', 'Clear all')),
                    ),
                  ],
                ),
              const SizedBox(height: 14),
              ProductGrid(visible),
              if (visible.length < list.length)
                const Padding(
                  padding: EdgeInsets.all(20),
                  child: Center(child: CircularProgressIndicator()),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _filters(AppState s) async {
    final items = productsForPath(widget.path);
    List<String> unique(Iterable<String> values) =>
        values.where((v) => v.isNotEmpty).toSet().toList()..sort();
    final categories = unique(items.map((p) => p.categoryPath.first));
    final clothingCategories = unique(
      items
          .where((p) => p.categoryPath.contains('clothing'))
          .map((p) => p.categoryPath.last),
    );
    final brands = unique(items.map((p) => p.brand));
    final colors = unique(items.expand((p) => p.colors));
    final sizes = unique(items.expand((p) => p.sizes));
    var draftCategories = {...filters.categories};
    var draftClothing = {...filters.clothingCategories};
    var draftBrands = {...filters.brands};
    var draftColors = {...filters.colors};
    var draftSizes = {...filters.sizes};
    var draftAvailability = {...filters.availability};
    var draftDiscount = filters.discountedOnly;
    final minController = TextEditingController(
      text: filters.minPrice?.toStringAsFixed(0),
    );
    final maxController = TextEditingController(
      text: filters.maxPrice?.toStringAsFixed(0),
    );

    String categoryLabel(String value) =>
        findCategory(value)?.name.of(s.language) ?? value;
    Widget group(
      String title,
      List<String> values,
      Set<String> selected,
      void Function(void Function()) setModal, {
      String Function(String)? label,
    }) => values.isEmpty
        ? const SizedBox.shrink()
        : ExpansionTile(
            title: Text(title),
            children: values
                .map(
                  (value) => CheckboxListTile(
                    dense: true,
                    controlAffinity: ListTileControlAffinity.leading,
                    title: Text(label?.call(value) ?? value),
                    value: selected.contains(value),
                    onChanged: (checked) => setModal(() {
                      checked == true
                          ? selected.add(value)
                          : selected.remove(value);
                    }),
                  ),
                )
                .toList(),
          );

    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (c) => StatefulBuilder(
        builder: (c, setModal) => SafeArea(
          child: FractionallySizedBox(
            heightFactor: .9,
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(20, 18, 8, 8),
                  child: Row(
                    children: [
                      Expanded(
                        child: Text(
                          tr(s, 'Filtreler', 'Filters'),
                          style: Theme.of(c).textTheme.headlineSmall,
                        ),
                      ),
                      IconButton(
                        onPressed: () => Navigator.pop(c),
                        icon: const Icon(Icons.close),
                      ),
                    ],
                  ),
                ),
                Expanded(
                  child: ListView(
                    children: [
                      group(
                        tr(s, 'Kategori', 'Category'),
                        categories,
                        draftCategories,
                        setModal,
                        label: categoryLabel,
                      ),
                      group(
                        tr(s, 'Giyim Kategorisi', 'Clothing Category'),
                        clothingCategories,
                        draftClothing,
                        setModal,
                        label: categoryLabel,
                      ),
                      group(
                        tr(s, 'Marka', 'Brand'),
                        brands,
                        draftBrands,
                        setModal,
                      ),
                      group(
                        tr(s, 'Renk', 'Color'),
                        colors,
                        draftColors,
                        setModal,
                      ),
                      group(
                        tr(s, 'Beden', 'Size'),
                        sizes,
                        draftSizes,
                        setModal,
                      ),
                      group(
                        tr(s, 'Stok Durumu', 'Availability'),
                        const ['in-stock', 'out-of-stock'],
                        draftAvailability,
                        setModal,
                        label: (value) => value == 'in-stock'
                            ? tr(s, 'Stokta var', 'In stock')
                            : tr(s, 'Stokta yok', 'Out of stock'),
                      ),
                      CheckboxListTile(
                        controlAffinity: ListTileControlAffinity.leading,
                        title: Text(tr(s, 'İndirimli ürünler', 'On sale')),
                        value: draftDiscount,
                        onChanged: (value) =>
                            setModal(() => draftDiscount = value ?? false),
                      ),
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(tr(s, 'Fiyat Aralığı', 'Price Range')),
                            const SizedBox(height: 12),
                            Row(
                              children: [
                                Expanded(
                                  child: TextField(
                                    controller: minController,
                                    keyboardType: TextInputType.number,
                                    decoration: InputDecoration(
                                      labelText: tr(s, 'Minimum', 'Minimum'),
                                      hintText: '0',
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: TextField(
                                    controller: maxController,
                                    keyboardType: TextInputType.number,
                                    decoration: InputDecoration(
                                      labelText: tr(s, 'Maksimum', 'Maximum'),
                                      hintText: '∞',
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Expanded(
                        child: OutlinedButton(
                          onPressed: () => setModal(() {
                            draftCategories.clear();
                            draftClothing.clear();
                            draftBrands.clear();
                            draftColors.clear();
                            draftSizes.clear();
                            draftAvailability.clear();
                            draftDiscount = false;
                            minController.clear();
                            maxController.clear();
                          }),
                          child: Text(tr(s, 'Temizle', 'Clear')),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: FilledButton(
                          onPressed: () {
                            setState(() {
                              filters = CatalogFilters(
                                categories: draftCategories,
                                clothingCategories: draftClothing,
                                brands: draftBrands,
                                colors: draftColors,
                                sizes: draftSizes,
                                availability: draftAvailability,
                                discountedOnly: draftDiscount,
                                minPrice: double.tryParse(
                                  minController.text.trim(),
                                ),
                                maxPrice: double.tryParse(
                                  maxController.text.trim(),
                                ),
                              );
                              shown = 20;
                            });
                            Navigator.pop(c);
                          },
                          child: Text(
                            tr(s, 'Sonuçları Göster', 'Show Results'),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
    minController.dispose();
    maxController.dispose();
  }

  void _sort(AppState s) => showModalBottomSheet(
    context: context,
    builder: (c) => SafeArea(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: SortMode.values
            .map(
              (e) => RadioListTile<SortMode>(
                value: e,
                // ignore: deprecated_member_use
                groupValue: sort,
                title: Text(_sortName(s, e)),
                // ignore: deprecated_member_use
                onChanged: (v) {
                  setState(() => sort = v!);
                  Navigator.pop(c);
                },
              ),
            )
            .toList(),
      ),
    ),
  );
  String _sortName(AppState s, SortMode m) => [
    tr(s, 'Önerilen', 'Recommended'),
    tr(s, 'En Yeniler', 'Newest'),
    tr(s, 'Fiyat Artan', 'Price Low to High'),
    tr(s, 'Fiyat Azalan', 'Price High to Low'),
    tr(s, 'En Çok Beğenilen', 'Most Liked'),
    tr(s, 'En Çok Satan', 'Best Seller'),
  ][m.index];
}

class SearchScreen extends ConsumerStatefulWidget {
  const SearchScreen({super.key});
  @override
  ConsumerState<SearchScreen> createState() => _SearchState();
}

class _SearchState extends ConsumerState<SearchScreen> {
  String query = '';
  String norm(String v) => v
      .toLowerCase()
      .replaceAll('ı', 'i')
      .replaceAll('ğ', 'g')
      .replaceAll('ü', 'u')
      .replaceAll('ş', 's')
      .replaceAll('ö', 'o')
      .replaceAll('ç', 'c');
  @override
  Widget build(BuildContext context) {
    final s = ref.watch(appStateProvider);
    final q = norm(query);
    final found = q.isEmpty
        ? <Product>[]
        : products
              .where(
                (p) => norm('${p.name.tr} ${p.name.en} ${p.brand}').contains(q),
              )
              .take(40)
              .toList();
    final cats = q.isEmpty
        ? <CategoryNode>[]
        : productLeaves()
              .map((e) => e.node)
              .where((n) => norm('${n.name.tr} ${n.name.en}').contains(q))
              .take(8)
              .toList();
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: ListView(
        padding: const EdgeInsets.all(12),
        children: [
          TextField(
            autofocus: false,
            textInputAction: TextInputAction.search,
            onChanged: (v) => setState(() => query = v),
            onSubmitted: ref.read(appStateProvider.notifier).search,
            decoration: InputDecoration(
              prefixIcon: const Icon(Icons.search),
              hintText: tr(
                s,
                'Ürün, kategori veya marka ara',
                'Search product, category or brand',
              ),
            ),
          ),
          if (q.isEmpty) ...[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                PageTitle(tr(s, 'Son Aramalar', 'Recent Searches')),
                TextButton(
                  onPressed: ref.read(appStateProvider.notifier).clearSearches,
                  child: Text(tr(s, 'Temizle', 'Clear')),
                ),
              ],
            ),
            Wrap(
              spacing: 8,
              children: s.recentSearches
                  .map(
                    (e) => ActionChip(
                      label: Text(e),
                      onPressed: () => setState(() => query = e),
                    ),
                  )
                  .toList(),
            ),
          ] else ...[
            if (cats.isNotEmpty) PageTitle(tr(s, 'Kategoriler', 'Categories')),
            for (final c in cats)
              ListTile(
                title: Text(c.name.of(s.language)),
                leading: const Icon(Icons.category_outlined),
                onTap: () => context.push('/category/${c.id}'),
              ),
            PageTitle(
              tr(s, 'Ürünler', 'Products'),
              subtitle: '${found.length}',
            ),
            if (found.isEmpty)
              EmptyState(
                icon: Icons.search_off,
                title: tr(s, 'Sonuç bulunamadı', 'No results'),
              )
            else
              ProductGrid(found),
          ],
        ],
      ),
    );
  }
}

class ProductScreen extends ConsumerStatefulWidget {
  const ProductScreen({required this.slug, super.key});
  final String slug;
  @override
  ConsumerState<ProductScreen> createState() => _ProductState();
}

class _ProductState extends ConsumerState<ProductScreen> {
  String? size;
  int qty = 1;
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final p = products.firstWhere((e) => e.slug == widget.slug);
      ref.read(appStateProvider.notifier).viewed(p.id);
    });
  }

  @override
  Widget build(BuildContext context) {
    final p = products.firstWhere((e) => e.slug == widget.slug);
    final s = ref.watch(appStateProvider);
    final similar = products
        .where((e) => e.type == p.type && e.id != p.id)
        .take(6)
        .toList();
    return Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            tooltip: tr(s, 'Favori', 'Favorite'),
            onPressed: () => ref.read(appStateProvider.notifier).favorite(p.id),
            icon: Icon(
              s.favorites.contains(p.id)
                  ? Icons.favorite
                  : Icons.favorite_border,
            ),
          ),
          IconButton(
            tooltip: tr(s, 'Karşılaştır', 'Compare'),
            onPressed: () => ref.read(appStateProvider.notifier).compare(p.id),
            icon: Icon(
              s.comparison.contains(p.id)
                  ? Icons.compare
                  : Icons.compare_outlined,
            ),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 120),
        children: [
          SizedBox(
            height: 390,
            child: PageView.builder(
              itemCount: 3,
              itemBuilder: (c, i) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: ProductArt(product: p, height: 380),
              ),
            ),
          ),
          Center(
            child: Text(
              '• • •',
              style: TextStyle(color: Theme.of(context).colorScheme.primary),
            ),
          ),
          Text(
            p.brand,
            style: const TextStyle(letterSpacing: 2, color: Colors.black54),
          ),
          Text(
            p.name.of(s.language),
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          Row(
            children: [
              const Icon(Icons.star, size: 18, color: Colors.amber),
              Text('${p.rating.toStringAsFixed(1)}  (${p.reviewCount})'),
            ],
          ),
          const SizedBox(height: 10),
          PriceText(p),
          if (p.sizes.isNotEmpty) ...[
            const SizedBox(height: 18),
            Text(
              tr(s, 'Beden', 'Size'),
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            Wrap(
              spacing: 8,
              children: p.sizes
                  .map(
                    (e) => ChoiceChip(
                      label: Text(e),
                      selected: size == e,
                      onSelected: p.stock == 0
                          ? null
                          : (_) => setState(() => size = e),
                    ),
                  )
                  .toList(),
            ),
          ],
          const SizedBox(height: 14),
          Text(
            p.stock == 0
                ? tr(s, 'Stokta yok', 'Out of stock')
                : p.stock <= 3
                ? tr(s, 'Son ${p.stock} ürün', 'Only ${p.stock} left')
                : tr(
                    s,
                    'Stokta · 1–3 iş gününde kargoda',
                    'In stock · Ships in 1–3 days',
                  ),
          ),
          const Divider(height: 32),
          ExpansionTile(
            title: Text(tr(s, 'Ürün Detayları', 'Product Details')),
            children: p.attributes.entries
                .map(
                  (e) => ListTile(title: Text(e.key), trailing: Text(e.value)),
                )
                .toList(),
          ),
          ExpansionTile(
            title: Text(tr(s, 'Teslimat ve İade', 'Delivery & Returns')),
            children: [
              Padding(
                padding: const EdgeInsets.all(16),
                child: Text(
                  tr(
                    s,
                    '3000 ₺ üzeri ücretsiz kargo. 14 gün içinde iade.',
                    'Free shipping over ₺3000. Returns within 14 days.',
                  ),
                ),
              ),
            ],
          ),
          ExpansionTile(
            title: Text(tr(s, 'Değerlendirmeler', 'Reviews')),
            children: [
              ListTile(
                leading: const CircleAvatar(child: Text('A')),
                title: Text(tr(s, 'Kalitesi çok iyi', 'Excellent quality')),
                subtitle: Text(
                  tr(s, 'Doğrulanmış alışveriş', 'Verified purchase'),
                ),
              ),
            ],
          ),
          PageTitle(tr(s, 'Benzer Ürünler', 'Similar Products')),
          SizedBox(
            height: 270,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: similar.length,
              itemBuilder: (c, i) =>
                  SizedBox(width: 170, child: ProductCard(similar[i])),
              separatorBuilder: (c, i) => const SizedBox(width: 12),
            ),
          ),
        ],
      ),
      bottomSheet: SafeArea(
        top: false,
        child: Container(
          color: Colors.white,
          padding: const EdgeInsets.all(12),
          child: Row(
            children: [
              IconButton(
                onPressed: () => setState(() => qty = (qty - 1).clamp(1, 99)),
                icon: const Icon(Icons.remove),
              ),
              Text('$qty'),
              IconButton(
                onPressed: () => setState(() => qty++),
                icon: const Icon(Icons.add),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: FilledButton.icon(
                  onPressed: () {
                    if (p.stock == 0) {
                      ref.read(appStateProvider.notifier).stockAlert(p.id);
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                            tr(
                              s,
                              'Stok bildirimi açıldı',
                              'Stock alert enabled',
                            ),
                          ),
                        ),
                      );
                      return;
                    }
                    if (p.sizes.isNotEmpty && size == null) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                            tr(s, 'Lütfen beden seçin', 'Please select a size'),
                          ),
                        ),
                      );
                      return;
                    }
                    for (var i = 0; i < qty; i++) {
                      ref
                          .read(appStateProvider.notifier)
                          .addToCart(p.id, variant: size ?? '');
                    }
                  },
                  icon: Icon(
                    p.stock == 0
                        ? Icons.notifications_outlined
                        : Icons.shopping_bag_outlined,
                  ),
                  label: Text(
                    p.stock == 0
                        ? tr(s, 'Gelince Haber Ver', 'Notify Me')
                        : tr(s, 'Sepete Ekle', 'Add to Cart'),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class FavoritesScreen extends ConsumerWidget {
  const FavoritesScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    final list = products.where((p) => s.favorites.contains(p.id)).toList();
    return list.isEmpty
        ? EmptyState(
            icon: Icons.favorite_border,
            title: tr(s, 'Henüz favoriniz yok', 'No favorites yet'),
            action: tr(s, 'Alışverişe Başla', 'Start Shopping'),
            onTap: () => context.go('/'),
          )
        : ListView(
            padding: const EdgeInsets.all(12),
            children: [
              PageTitle(
                tr(s, 'Favoriler', 'Favorites'),
                subtitle: '${list.length}',
              ),
              ProductGrid(list),
            ],
          );
  }
}

class CartScreen extends ConsumerWidget {
  const CartScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    if (s.cart.isEmpty) {
      return EmptyState(
        icon: Icons.shopping_bag_outlined,
        title: tr(s, 'Sepetiniz boş', 'Your cart is empty'),
        action: tr(s, 'Alışverişe Başla', 'Start Shopping'),
        onTap: () => context.go('/'),
      );
    }
    final shipping = s.subtotal >= 3000 ? 0.0 : 79.9;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        PageTitle(tr(s, 'Sepetim', 'My Cart'), subtitle: '${s.cartCount}'),
        for (final entry in s.cart.indexed)
          _cartLine(context, ref, s, entry.$1, entry.$2),
        const Divider(height: 32),
        _total(tr(s, 'Ara Toplam', 'Subtotal'), money(s, s.originalSubtotal)),
        _total(
          tr(s, 'İndirim', 'Discount'),
          s.discountTotal > 0
              ? '−${money(s, s.discountTotal)}'
              : money(s, s.discountTotal),
        ),
        _total(
          tr(s, 'Kargo', 'Shipping'),
          shipping == 0 ? tr(s, 'Ücretsiz', 'Free') : money(s, shipping),
        ),
        _total(
          tr(s, 'Toplam', 'Total'),
          money(s, s.subtotal + shipping),
          bold: true,
        ),
        const SizedBox(height: 16),
        FilledButton(
          onPressed: () => showDialog(
            context: context,
            builder: (c) => AlertDialog(
              title: Text(tr(s, 'Güvenli Ödeme', 'Secure Checkout')),
              content: Text(
                tr(
                  s,
                  'Ödeme sistemi henüz bağlanmadı. Checkout servis sınırı entegrasyona hazır.',
                  'Payment system is not connected yet. The checkout service boundary is ready.',
                ),
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(c),
                  child: const Text('OK'),
                ),
              ],
            ),
          ),
          child: Text(tr(s, 'Ödemeye Geç', 'Checkout')),
        ),
      ],
    );
  }
}

Widget _cartLine(
  BuildContext c,
  WidgetRef ref,
  AppState s,
  int i,
  CartLine line,
) {
  final p = products.firstWhere((e) => e.id == line.productId);
  return Padding(
    padding: const EdgeInsets.only(bottom: 16),
    child: InkWell(
      onTap: () => GoRouter.of(c).push('/product/${p.slug}'),
      borderRadius: BorderRadius.circular(14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 90, child: ProductArt(product: p, height: 110)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(p.name.of(s.language), maxLines: 2),
                      if (line.variant.isNotEmpty)
                        Text('${tr(s, 'Beden', 'Size')}: ${line.variant}'),
                      PriceText(p),
                    ],
                  ),
                ),
                Row(
                  children: [
                    IconButton(
                      onPressed: () => ref
                          .read(appStateProvider.notifier)
                          .quantity(i, line.quantity - 1),
                      icon: const Icon(Icons.remove),
                    ),
                    Text('${line.quantity}'),
                    IconButton(
                      onPressed: () => ref
                          .read(appStateProvider.notifier)
                          .quantity(i, line.quantity + 1),
                      icon: const Icon(Icons.add),
                    ),
                    const Spacer(),
                    IconButton(
                      tooltip: tr(s, 'Sil', 'Remove'),
                      onPressed: () =>
                          ref.read(appStateProvider.notifier).quantity(i, 0),
                      icon: const Icon(Icons.delete_outline),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    ),
  );
}

Widget _total(String a, String b, {bool bold = false}) => Padding(
  padding: const EdgeInsets.symmetric(vertical: 5),
  child: Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween,
    children: [
      Text(a, style: TextStyle(fontWeight: bold ? FontWeight.bold : null)),
      Text(
        b,
        style: TextStyle(
          fontWeight: bold ? FontWeight.bold : null,
          fontSize: bold ? 18 : null,
        ),
      ),
    ],
  ),
);

class TrackingScreen extends ConsumerStatefulWidget {
  const TrackingScreen({super.key});
  @override
  ConsumerState<TrackingScreen> createState() => _TrackingState();
}

class _TrackingState extends ConsumerState<TrackingScreen> {
  bool searched = false;
  @override
  Widget build(BuildContext context) {
    final s = ref.watch(appStateProvider);
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        PageTitle(
          tr(s, 'Kargo Takip', 'Shipment Tracking'),
          subtitle: tr(
            s,
            'Sipariş veya takip numaranızı girin',
            'Enter your order or tracking number',
          ),
        ),
        TextField(
          textInputAction: TextInputAction.search,
          onSubmitted: (_) => setState(() => searched = true),
          decoration: InputDecoration(
            prefixIcon: const Icon(Icons.local_shipping_outlined),
            hintText: 'STR-2026-001',
          ),
        ),
        const SizedBox(height: 12),
        FilledButton(
          onPressed: () => setState(() => searched = true),
          child: Text(tr(s, 'Sorgula', 'Track')),
        ),
        if (searched) ...[
          const SizedBox(height: 24),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'STR-2026-001',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Text(
                    tr(
                      s,
                      'Tahmini teslim: 21 Ağustos',
                      'Estimated delivery: August 21',
                    ),
                  ),
                  const SizedBox(height: 20),
                  for (final e in [
                    ('✓', 'Sipariş Alındı', 'Order Received'),
                    ('✓', 'Hazırlanıyor', 'Preparing'),
                    ('✓', 'Kargoya Verildi', 'Shipped'),
                    ('•', 'Dağıtımda', 'Out for Delivery'),
                    ('○', 'Teslim Edildi', 'Delivered'),
                  ])
                    ListTile(
                      contentPadding: EdgeInsets.zero,
                      leading: CircleAvatar(child: Text(e.$1)),
                      title: Text(tr(s, e.$2, e.$3)),
                      subtitle: Text(
                        e.$1 == '•'
                            ? tr(s, 'Güncel durum', 'Current status')
                            : '',
                      ),
                    ),
                ],
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class CompareScreen extends ConsumerWidget {
  const CompareScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    final list = products.where((p) => s.comparison.contains(p.id)).toList();
    return Scaffold(
      appBar: AppBar(title: Text(tr(s, 'Karşılaştır', 'Compare'))),
      body: list.isEmpty
          ? EmptyState(
              icon: Icons.compare_arrows,
              title: tr(
                s,
                'Karşılaştırma listeniz boş',
                'Comparison list is empty',
              ),
            )
          : ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.all(12),
              children: list
                  .map(
                    (p) => SizedBox(
                      width: 240,
                      child: Card(
                        child: Padding(
                          padding: const EdgeInsets.all(12),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              ProductArt(product: p, height: 190),
                              Text(
                                p.name.of(s.language),
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              PriceText(p),
                              _compareRow(tr(s, 'Marka', 'Brand'), p.brand),
                              _compareRow(tr(s, 'Stok', 'Stock'), '${p.stock}'),
                              _compareRow(
                                tr(s, 'Puan', 'Rating'),
                                p.rating.toStringAsFixed(1),
                              ),
                              ...p.attributes.entries.map(
                                (e) => _compareRow(e.key, e.value),
                              ),
                              const Spacer(),
                              OutlinedButton(
                                onPressed: () => ref
                                    .read(appStateProvider.notifier)
                                    .compare(p.id),
                                child: Text(tr(s, 'Kaldır', 'Remove')),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
    );
  }

  Widget _compareRow(String a, String b) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 8),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(a, style: const TextStyle(fontSize: 11, color: Colors.black54)),
        Text(b.isEmpty ? '—' : b),
      ],
    ),
  );
}

class AccountScreen extends ConsumerWidget {
  const AccountScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    final items = [
      (Icons.shopping_bag_outlined, tr(s, 'Sepetim', 'My Cart'), '/cart'),
      (
        Icons.location_on_outlined,
        tr(s, 'Adreslerim', 'Addresses'),
        '/account/addresses',
      ),
      (
        Icons.receipt_long_outlined,
        tr(s, 'Geçmiş Siparişlerim', 'Past Orders'),
        '/account/orders',
      ),
      (
        Icons.local_shipping_outlined,
        tr(s, 'Sipariş Takip', 'Order Tracking'),
        '/tracking',
      ),
      (
        Icons.notifications_outlined,
        tr(s, 'Stok Takip', 'Stock Alerts'),
        '/account/stock-alerts',
      ),
      (
        Icons.mail_outline,
        tr(s, 'Mesajlarım', 'Messages'),
        '/account/messages',
      ),
      (
        Icons.person_outline,
        tr(s, 'Kişisel Bilgilerim', 'Personal Information'),
        '/account/profile',
      ),
      (Icons.settings_outlined, tr(s, 'Ayarlar', 'Settings'), '/settings'),
    ];
    return Scaffold(
      appBar: AppBar(title: Text(tr(s, 'Hesabım', 'My Account'))),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: items.length,
        gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 260,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 1.3,
        ),
        itemBuilder: (c, i) => Card(
          child: InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: () => context.push(items[i].$3),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Icon(items[i].$1),
                  const SizedBox(height: 12),
                  Text(
                    items[i].$2,
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class AddressesScreen extends ConsumerWidget {
  const AddressesScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(s, 'Adreslerim', 'Addresses'))),
      body: s.addresses.isEmpty
          ? EmptyState(
              icon: Icons.location_on_outlined,
              title: tr(s, 'Kayıtlı adresiniz yok', 'No saved addresses'),
            )
          : ListView(
              padding: const EdgeInsets.all(16),
              children: s.addresses
                  .map(
                    (a) => Card(
                      child: ListTile(
                        title: Text(a.title),
                        subtitle: Text(a.detail),
                        leading: Icon(
                          a.isDefault
                              ? Icons.check_circle
                              : Icons.location_on_outlined,
                        ),
                        onTap: () => ref
                            .read(appStateProvider.notifier)
                            .defaultAddress(a.id),
                        trailing: PopupMenuButton(
                          itemBuilder: (c) => [
                            PopupMenuItem(
                              value: 'edit',
                              child: Text(tr(s, 'Düzenle', 'Edit')),
                            ),
                            PopupMenuItem(
                              value: 'delete',
                              child: Text(tr(s, 'Sil', 'Delete')),
                            ),
                          ],
                          onSelected: (v) {
                            if (v == 'delete') {
                              ref
                                  .read(appStateProvider.notifier)
                                  .deleteAddress(a.id);
                            } else {
                              _addressDialog(context, ref, s, a);
                            }
                          },
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _addressDialog(context, ref, s, null),
        icon: const Icon(Icons.add),
        label: Text(tr(s, 'Adres Ekle', 'Add Address')),
      ),
    );
  }
}

void _addressDialog(
  BuildContext context,
  WidgetRef ref,
  AppState s,
  Address? old,
) {
  final title = TextEditingController(text: old?.title),
      detail = TextEditingController(text: old?.detail);
  showDialog(
    context: context,
    builder: (c) => AlertDialog(
      title: Text(tr(s, 'Adres', 'Address')),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: title,
            decoration: InputDecoration(labelText: tr(s, 'Başlık', 'Title')),
          ),
          const SizedBox(height: 10),
          TextField(
            controller: detail,
            maxLines: 3,
            decoration: InputDecoration(
              labelText: tr(s, 'Açık adres', 'Full address'),
            ),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(c),
          child: Text(tr(s, 'İptal', 'Cancel')),
        ),
        FilledButton(
          onPressed: () {
            if (title.text.trim().isEmpty || detail.text.trim().isEmpty) return;
            ref
                .read(appStateProvider.notifier)
                .saveAddress(
                  Address(
                    id:
                        old?.id ??
                        DateTime.now().millisecondsSinceEpoch.toString(),
                    title: title.text.trim(),
                    detail: detail.text.trim(),
                    isDefault: old?.isDefault ?? s.addresses.isEmpty,
                  ),
                );
            Navigator.pop(c);
          },
          child: Text(tr(s, 'Kaydet', 'Save')),
        ),
      ],
    ),
  );
}

final demoOrders = [
  DemoOrder('STR-2026-001', '18.08.2026', 'Kargoya Verildi', 2490, [
    products[0].id,
    products[1].id,
  ]),
  DemoOrder('STR-2026-002', '02.08.2026', 'Teslim Edildi', 1290, [
    products[10].id,
  ]),
];

class OrdersScreen extends ConsumerWidget {
  const OrdersScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(s, 'Siparişlerim', 'My Orders'))),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: demoOrders
            .map(
              (o) => Card(
                child: ListTile(
                  title: Text(o.id),
                  subtitle: Text('${o.date} · ${o.status}'),
                  trailing: Text(money(s, o.total)),
                  onTap: () => context.push('/account/order/${o.id}'),
                ),
              ),
            )
            .toList(),
      ),
    );
  }
}

class OrderDetailScreen extends ConsumerWidget {
  const OrderDetailScreen({required this.id, super.key});
  final String id;
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    final o = demoOrders.firstWhere((e) => e.id == id);
    return Scaffold(
      appBar: AppBar(title: Text(id)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          PageTitle(o.status, subtitle: o.date),
          ...o.productIds.map((id) {
            final p = products.firstWhere((e) => e.id == id);
            return ListTile(
              leading: SizedBox(
                width: 55,
                child: ProductArt(product: p, height: 55),
              ),
              title: Text(p.name.of(s.language)),
              trailing: PriceText(p),
            );
          }),
          const Divider(),
          _total(tr(s, 'Toplam', 'Total'), money(s, o.total), bold: true),
        ],
      ),
    );
  }
}

class StockAlertsScreen extends ConsumerWidget {
  const StockAlertsScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    final list = products.where((p) => s.stockAlerts.contains(p.id)).toList();
    return Scaffold(
      appBar: AppBar(title: Text(tr(s, 'Stok Takip', 'Stock Alerts'))),
      body: list.isEmpty
          ? EmptyState(
              icon: Icons.notifications_none,
              title: tr(s, 'Takip edilen ürün yok', 'No stock alerts'),
            )
          : ListView(
              padding: const EdgeInsets.all(12),
              children: [ProductGrid(list)],
            ),
    );
  }
}

class MessagesScreen extends ConsumerWidget {
  const MessagesScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(s, 'Mesajlarım', 'Messages'))),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: ListTile(
              leading: const Badge(child: Icon(Icons.mail_outline)),
              title: Text(
                tr(s, 'Siparişiniz kargoya verildi', 'Your order has shipped'),
              ),
              subtitle: const Text('STR-2026-001 · 18.08.2026'),
            ),
          ),
          Card(
            child: ListTile(
              leading: const Icon(Icons.campaign_outlined),
              title: Text(
                tr(
                  s,
                  'Yeni sezon koleksiyonu yayında',
                  'New season collection is live',
                ),
              ),
              subtitle: const Text('17.08.2026'),
            ),
          ),
        ],
      ),
    );
  }
}

class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});
  @override
  ConsumerState<ProfileScreen> createState() => _ProfileState();
}

class _ProfileState extends ConsumerState<ProfileScreen> {
  late final Map<String, TextEditingController> c;
  @override
  void initState() {
    super.initState();
    final p = ref.read(appStateProvider).profile;
    c = p.map((k, v) => MapEntry(k, TextEditingController(text: v)));
  }

  @override
  Widget build(BuildContext context) {
    final s = ref.watch(appStateProvider);
    return Scaffold(
      appBar: AppBar(
        title: Text(tr(s, 'Kişisel Bilgilerim', 'Personal Information')),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          for (final e in [
            ('firstName', 'Ad', 'First name'),
            ('lastName', 'Soyad', 'Last name'),
            ('phone', 'Telefon', 'Phone'),
            ('email', 'E-posta', 'Email'),
          ])
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: TextField(
                controller: c[e.$1],
                keyboardType: e.$1 == 'email'
                    ? TextInputType.emailAddress
                    : e.$1 == 'phone'
                    ? TextInputType.phone
                    : null,
                decoration: InputDecoration(labelText: tr(s, e.$2, e.$3)),
              ),
            ),
          FilledButton(
            onPressed: () {
              final values = c.map((k, v) => MapEntry(k, v.text.trim()));
              if (values.values.any((e) => e.isEmpty) ||
                  !values['email']!.contains('@')) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text(
                      tr(s, 'Bilgileri kontrol edin', 'Check your information'),
                    ),
                  ),
                );
                return;
              }
              ref.read(appStateProvider.notifier).profile(values);
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text(tr(s, 'Kaydedildi', 'Saved'))),
              );
            },
            child: Text(tr(s, 'Kaydet', 'Save')),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    for (final x in c.values) {
      x.dispose();
    }
    super.dispose();
  }
}

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final s = ref.watch(appStateProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(s, 'Ayarlar', 'Settings'))),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          DropdownButtonFormField<AppLanguage>(
            initialValue: s.language,
            decoration: InputDecoration(labelText: tr(s, 'Dil', 'Language')),
            items: const [
              DropdownMenuItem(value: AppLanguage.tr, child: Text('Türkçe')),
              DropdownMenuItem(value: AppLanguage.en, child: Text('English')),
            ],
            onChanged: (v) {
              if (v != null) ref.read(appStateProvider.notifier).language(v);
            },
          ),
          const SizedBox(height: 16),
          DropdownButtonFormField<AppCurrency>(
            initialValue: s.currency,
            decoration: InputDecoration(
              labelText: tr(s, 'Para Birimi', 'Currency'),
            ),
            items: const [
              DropdownMenuItem(value: AppCurrency.try_, child: Text('TRY · ₺')),
              DropdownMenuItem(value: AppCurrency.usd, child: Text('USD · \$')),
              DropdownMenuItem(value: AppCurrency.eur, child: Text('EUR · €')),
            ],
            onChanged: (v) {
              if (v != null) ref.read(appStateProvider.notifier).currency(v);
            },
          ),
          const SizedBox(height: 24),
          Text(
            tr(
              s,
              'Seçimleriniz, sepetiniz, favorileriniz ve hesap demo verileriniz bu cihazda korunur.',
              'Your settings, cart, favorites and demo account data persist on this device.',
            ),
          ),
        ],
      ),
    );
  }
}

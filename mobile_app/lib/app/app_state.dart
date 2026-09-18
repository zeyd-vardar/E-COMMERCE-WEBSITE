import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/models.dart';
import '../data/catalog.dart';

class AppState {
  const AppState({
    this.language = AppLanguage.tr,
    this.currency = AppCurrency.try_,
    this.favorites = const {},
    this.comparison = const {},
    this.stockAlerts = const {},
    this.cart = const [],
    this.addresses = const [],
    this.recentSearches = const [],
    this.recentlyViewed = const [],
    this.profile = const {
      'firstName': 'Zeynep',
      'lastName': 'Yılmaz',
      'phone': '0532 000 00 00',
      'email': 'demo@store.com',
    },
  });
  final AppLanguage language;
  final AppCurrency currency;
  final Set<String> favorites, comparison, stockAlerts;
  final List<CartLine> cart;
  final List<Address> addresses;
  final List<String> recentSearches, recentlyViewed;
  final Map<String, String> profile;
  AppState copyWith({
    AppLanguage? language,
    AppCurrency? currency,
    Set<String>? favorites,
    Set<String>? comparison,
    Set<String>? stockAlerts,
    List<CartLine>? cart,
    List<Address>? addresses,
    List<String>? recentSearches,
    List<String>? recentlyViewed,
    Map<String, String>? profile,
  }) => AppState(
    language: language ?? this.language,
    currency: currency ?? this.currency,
    favorites: favorites ?? this.favorites,
    comparison: comparison ?? this.comparison,
    stockAlerts: stockAlerts ?? this.stockAlerts,
    cart: cart ?? this.cart,
    addresses: addresses ?? this.addresses,
    recentSearches: recentSearches ?? this.recentSearches,
    recentlyViewed: recentlyViewed ?? this.recentlyViewed,
    profile: profile ?? this.profile,
  );
  int get cartCount => cart.fold(0, (sum, e) => sum + e.quantity);
  double get subtotal => cart.fold(
    0,
    (sum, e) =>
        sum +
        (products.firstWhere((p) => p.id == e.productId).price * e.quantity),
  );
  double get originalSubtotal => cart.fold(0, (sum, line) {
    final product = products.firstWhere((p) => p.id == line.productId);
    return sum + (product.originalPrice ?? product.price) * line.quantity;
  });
  double get discountTotal => originalSubtotal - subtotal;
}

final appStateProvider = NotifierProvider<AppController, AppState>(
  AppController.new,
);

class AppController extends Notifier<AppState> {
  static const key = 'store_state_v1';
  @override
  AppState build() {
    _load();
    return const AppState();
  }

  Future<void> _load() async {
    final raw = (await SharedPreferences.getInstance()).getString(key);
    if (raw == null) return;
    try {
      final j = jsonDecode(raw) as Map<String, dynamic>;
      state = AppState(
        language: AppLanguage.values.byName(j['language'] as String),
        currency: AppCurrency.values.byName(j['currency'] as String),
        favorites: Set<String>.from(j['favorites'] as List),
        comparison: Set<String>.from(j['comparison'] as List),
        stockAlerts: Set<String>.from(j['stockAlerts'] as List),
        cart: (j['cart'] as List)
            .map((e) => CartLine.fromJson(e as Map<String, dynamic>))
            .toList(),
        addresses: (j['addresses'] as List)
            .map((e) => Address.fromJson(e as Map<String, dynamic>))
            .toList(),
        recentSearches: List<String>.from(j['recentSearches'] as List),
        recentlyViewed: List<String>.from(j['recentlyViewed'] as List),
        profile: Map<String, String>.from(j['profile'] as Map),
      );
    } catch (_) {}
  }

  Future<void> _save() async {
    await (await SharedPreferences.getInstance()).setString(
      key,
      jsonEncode({
        'language': state.language.name,
        'currency': state.currency.name,
        'favorites': state.favorites.toList(),
        'comparison': state.comparison.toList(),
        'stockAlerts': state.stockAlerts.toList(),
        'cart': state.cart.map((e) => e.toJson()).toList(),
        'addresses': state.addresses.map((e) => e.toJson()).toList(),
        'recentSearches': state.recentSearches,
        'recentlyViewed': state.recentlyViewed,
        'profile': state.profile,
      }),
    );
  }

  void language(AppLanguage v) {
    state = state.copyWith(language: v);
    _save();
  }

  void currency(AppCurrency v) {
    state = state.copyWith(currency: v);
    _save();
  }

  void favorite(String id) {
    final s = {...state.favorites};
    s.contains(id) ? s.remove(id) : s.add(id);
    state = state.copyWith(favorites: s);
    _save();
  }

  void compare(String id) {
    final s = {...state.comparison};
    s.contains(id) ? s.remove(id) : s.add(id);
    state = state.copyWith(comparison: s);
    _save();
  }

  void stockAlert(String id) {
    final s = {...state.stockAlerts};
    s.contains(id) ? s.remove(id) : s.add(id);
    state = state.copyWith(stockAlerts: s);
    _save();
  }

  void addToCart(String id, {String variant = ''}) {
    final lines = [...state.cart];
    final index = lines.indexWhere(
      (e) => e.productId == id && e.variant == variant,
    );
    if (index < 0) {
      lines.add(CartLine(productId: id, variant: variant));
    } else {
      lines[index] = lines[index].copyWith(quantity: lines[index].quantity + 1);
    }
    state = state.copyWith(cart: lines);
    _save();
  }

  void quantity(int index, int value) {
    final lines = [...state.cart];
    if (value <= 0) {
      lines.removeAt(index);
    } else {
      lines[index] = lines[index].copyWith(quantity: value);
    }
    state = state.copyWith(cart: lines);
    _save();
  }

  void search(String value) {
    final v = value.trim();
    if (v.isEmpty) return;
    state = state.copyWith(
      recentSearches: [
        v,
        ...state.recentSearches.where((e) => e != v),
      ].take(8).toList(),
    );
    _save();
  }

  void clearSearches() {
    state = state.copyWith(recentSearches: []);
    _save();
  }

  void viewed(String id) {
    state = state.copyWith(
      recentlyViewed: [
        id,
        ...state.recentlyViewed.where((e) => e != id),
      ].take(12).toList(),
    );
    _save();
  }

  void saveAddress(Address address) {
    final list = [...state.addresses];
    final i = list.indexWhere((e) => e.id == address.id);
    if (i < 0) {
      list.add(address);
    } else {
      list[i] = address;
    }
    state = state.copyWith(addresses: list);
    _save();
  }

  void deleteAddress(String id) {
    state = state.copyWith(
      addresses: state.addresses.where((e) => e.id != id).toList(),
    );
    _save();
  }

  void defaultAddress(String id) {
    state = state.copyWith(
      addresses: state.addresses
          .map((e) => e.copyWith(isDefault: e.id == id))
          .toList(),
    );
    _save();
  }

  void profile(Map<String, String> value) {
    state = state.copyWith(profile: value);
    _save();
  }
}

String tr(AppState s, String tr, String en) =>
    s.language == AppLanguage.tr ? tr : en;
double converted(AppState s, double value) =>
    value *
    switch (s.currency) {
      AppCurrency.try_ => 1,
      AppCurrency.usd => .031,
      AppCurrency.eur => .028,
    };
String money(AppState s, double value) {
  final v = converted(s, value);
  return switch (s.currency) {
    AppCurrency.try_ => '₺${v.toStringAsFixed(0)}',
    AppCurrency.usd => '\$${v.toStringAsFixed(2)}',
    AppCurrency.eur => '€${v.toStringAsFixed(2)}',
  };
}

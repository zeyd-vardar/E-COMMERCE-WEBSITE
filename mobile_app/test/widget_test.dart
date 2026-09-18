import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_app/app/app_state.dart';
import 'package:mobile_app/app/router.dart';
import 'package:mobile_app/data/catalog.dart';
import 'package:mobile_app/features/screens.dart';
import 'package:mobile_app/main.dart';
import 'package:mobile_app/shared/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  testWidgets('home renders brand and navigation', (tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: MaterialApp(
          home: StoreShell(location: '/', child: HomeScreen()),
        ),
      ),
    );
    await tester.pumpAndSettle();
    expect(find.text('STORE'), findsWidgets);
    expect(find.byType(NavigationBar), findsOneWidget);
    expect(find.text('ARAMA'), findsOneWidget);
  });

  testWidgets('cart product image opens its product page', (tester) async {
    SharedPreferences.setMockInitialValues({});
    router.go('/');
    await tester.pumpWidget(const ProviderScope(child: StoreApp()));
    await tester.pumpAndSettle();

    final context = tester.element(find.byType(StoreShell));
    ProviderScope.containerOf(
      context,
    ).read(appStateProvider.notifier).addToCart(products.first.id);
    router.go('/cart');
    await tester.pumpAndSettle();

    await tester.tap(find.byType(ProductArt).first);
    await tester.pumpAndSettle();

    expect(router.state.uri.path, '/product/${products.first.slug}');
    expect(find.byType(ProductScreen), findsOneWidget);
  });
}

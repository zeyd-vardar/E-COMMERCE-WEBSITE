import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../features/screens.dart';

final _root = GlobalKey<NavigatorState>();
final router = GoRouter(
  navigatorKey: _root,
  initialLocation: '/',
  routes: [
    ShellRoute(
      builder: (c, s, child) => StoreShell(location: s.uri.path, child: child),
      routes: [
        GoRoute(path: '/', builder: (c, s) => const HomeScreen()),
        GoRoute(path: '/search', builder: (c, s) => const SearchScreen()),
        GoRoute(path: '/tracking', builder: (c, s) => const TrackingScreen()),
        GoRoute(path: '/favorites', builder: (c, s) => const FavoritesScreen()),
        GoRoute(path: '/cart', builder: (c, s) => const CartScreen()),
        GoRoute(
          path: '/categories',
          builder: (c, s) => const CategoriesScreen(),
        ),
        GoRoute(
          path: '/category/:path',
          builder: (c, s) => CategoryScreen(
            path: Uri.decodeComponent(s.pathParameters['path']!),
          ),
        ),
        GoRoute(
          path: '/product/:slug',
          builder: (c, s) => ProductScreen(slug: s.pathParameters['slug']!),
        ),
        GoRoute(path: '/compare', builder: (c, s) => const CompareScreen()),
      ],
    ),
    GoRoute(path: '/account', builder: (c, s) => const AccountScreen()),
    GoRoute(
      path: '/account/addresses',
      builder: (c, s) => const AddressesScreen(),
    ),
    GoRoute(path: '/account/orders', builder: (c, s) => const OrdersScreen()),
    GoRoute(
      path: '/account/order/:id',
      builder: (c, s) => OrderDetailScreen(id: s.pathParameters['id']!),
    ),
    GoRoute(
      path: '/account/stock-alerts',
      builder: (c, s) => const StockAlertsScreen(),
    ),
    GoRoute(
      path: '/account/messages',
      builder: (c, s) => const MessagesScreen(),
    ),
    GoRoute(path: '/account/profile', builder: (c, s) => const ProfileScreen()),
    GoRoute(path: '/settings', builder: (c, s) => const SettingsScreen()),
  ],
);

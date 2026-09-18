import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app/router.dart';
import 'app/theme.dart';

void main() => runApp(const ProviderScope(child: StoreApp()));

class StoreApp extends StatelessWidget {
  const StoreApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp.router(
    title: 'STORE',
    debugShowCheckedModeBanner: false,
    theme: StoreTheme.light,
    routerConfig: router,
  );
}

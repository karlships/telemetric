import 'package:flutter/material.dart';
import 'package:telemetric/telemetric.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Telemetric.init("your-project-id",
      trackInDebug: false, version: "1.0.0");
  Telemetric.event("test-event");
  Telemetric.revenue(0.99);

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) => const MaterialApp(home: HomePage());
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) => const Text("Hello, world!");
}

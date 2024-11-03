import 'package:web/web.dart';

String? getOS() {
  return null; // Let the server handle OS detection for web
}

String getWebReferrer() {
  return window.document.referrer;
}

String getWebURLRunningOn() {
  return window.location.href;
}

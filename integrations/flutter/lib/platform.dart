import 'dart:io' show Platform;

import 'package:flutter/foundation.dart' show kIsWeb;

// Conditional import based on the platform
import 'platform_web.dart' if (dart.library.io) 'platform_non_web.dart';

class PlatformUtils {
  static String? getOS() {
    if (kIsWeb) {
      // Get the user agent string using the web-specific function

        return  null;

    } else {
      // Handle non-web platforms
      if (Platform.isAndroid) {
        return 'android';
      } else if (Platform.isIOS) {
        return 'ios';
      } else if (Platform.isLinux) {
        return 'linux';
      } else if (Platform.isMacOS) {
        return 'macos';
      } else if (Platform.isWindows) {
        return 'windows';
      } else {
        return 'unknown';
      }
    }
  }
}

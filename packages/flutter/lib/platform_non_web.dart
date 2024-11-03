import 'dart:io' show Platform;

String? getOS() {
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

String getWebReferrer() {
  return ''; // Not applicable for non-web platforms
}

String getWebURLRunningOn() {
  return ''; // Not applicable for non-web platforms
}

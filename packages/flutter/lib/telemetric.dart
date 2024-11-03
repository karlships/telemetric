library telemetric;

import 'dart:convert';
import 'dart:developer';
import 'dart:math' hide log;

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:package_info_plus/package_info_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

// Conditional import for web and non-web platforms
import 'platform_non_web.dart' if (dart.library.js_interop) 'platform_web.dart';

/// The Telemetric class provides methods to track events and revenue.
class Telemetric {
  // Private variable to store the project ID
  static String? _project_id;

  /// The user ID
  static String? _user_id;

  /// The version of the app
  static String? _version = '1.0.0';

  /// Whether to track in debug mode
  static bool _track_in_debug = false;

  /// The referrer of the user
  static String? _referrer;

  /// Initializes the Telemetric with a [projectID].
  /// [referrer] is optional and can be used to track the referrer of the user. On Flutter Web, it will be automatically detected.
  /// On non-web platforms you can provided, for example based on the platform.
  /// [version] is optional and can be used to track the version of the app. By default it is set to '1.0.0'.
  /// [trackInDebug] is optional and can be used to send data in debug mode. By default it is set to false.
  static Future<void> init(String projectID,
      {String? version, bool trackInDebug = false, String? referrer}) async {
    _project_id = projectID;
    _track_in_debug = trackInDebug;
    _version = version;
    _referrer = referrer;
    // Check if user ID exists in storage, if not create a new one
    if (kDebugMode && !_track_in_debug) return;
    if (kIsWeb && _referrer == null) {
      _referrer = getWebReferrer();
    }

    await _initializeUserID();
    const url = 'https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/init';
    String? bundle_id;
    String? url_running_on;
    if (!kIsWeb) {
      final packageInfo = await PackageInfo.fromPlatform();

      bundle_id = packageInfo.packageName;
    } else {
      url_running_on = getWebURLRunningOn();
    }

    try {
      // Create a request
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'project_id': _project_id,
          "version": _version,
          "os": getOS(),
          "url_running_on": url_running_on,
          "bundle_id": bundle_id,
          "referrer": _referrer,
          "user_id": _user_id,
        }),
      );

      // Check the status code
      if (response.statusCode != 200) {
        log('Failed to initialize: ${response.statusCode}');
      }
    } catch (e) {
      log('[This might be due to no internet connection]. Telemetric Init Error: $e');
    }
  }

  /// Tracks an event with a [name]
  static Future<void> event(String name) async {
    if (!safetyCheck("Event '$name'")) return;
    if (kDebugMode && !_track_in_debug) return;

    const url = 'https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/event';

    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'project_id': _project_id,
          'name': name,
          "referrer": _referrer,
          "version": _version,
          "os": getOS(),
        }),
      );

      if (response.statusCode == 200) {
        // Handle successful response
      } else {
        log('Failed to send event: ${response.statusCode}');
      }
    } catch (e) {
      log('Telemetric Event Error: $e');
    }
  }

  /// Tracks revenue with an [amount]s
  static Future<void> revenue(double amount) async {
    if (!safetyCheck('Revenue')) return;
    if (kDebugMode && !_track_in_debug) return;
    const url = 'https://hkromzwdaxhcragbcnmw.supabase.co/functions/v1/revenue';

    try {
      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'project_id': _project_id,
          'total': amount,
          "os": getOS(),
          "referrer": _referrer,
          "version": _version,
        }),
      );

      if (response.statusCode == 200) {
        // Handle successful response
      } else {
        log('Failed to send revenue: ${response.statusCode}');
      }
    } catch (e) {
      log('Telemetric Revenue Error: $e');
    }
  }

  /// Checks if the project ID and user ID are set.
  static bool safetyCheck(String source) {
    bool isSafe = true;

    if (_project_id == null) {
      log('$source reporting failed. Missing project ID.');
      isSafe = false;
    }

    if (_user_id == null) {
      log('$source reporting failed. Missing user ID. Make sure to call init() before tracking events or revenue. Also make sure to await init()');
      isSafe = false;
    }

    return isSafe;
  }

  /// Initializes the user ID if it does not exist.
  static Future<void> _initializeUserID() async {
    final prefs = await SharedPreferences.getInstance();
    _user_id = prefs.getString('telemetric_user_id');
    if (_user_id == null) {
      _user_id = _generateUserID();
      await prefs.setString('telemetric_user_id', _user_id!);
    }
  }

  /// Generates a new user ID.
  static String _generateUserID() {
    final Random random = Random();
    final StringBuffer buffer = StringBuffer();
    for (int i = 0; i < 32; i++) {
      int value = random.nextInt(16);
      if (i == 8 || i == 12 || i == 16 || i == 20) {
        buffer.write('-');
      }
      if (i == 12) {
        value = 4; // The 13th character is '4'
      } else if (i == 16) {
        value =
            (value & 0x3) | 0x8; // The 17th character is '8', '9', 'A', or 'B'
      }
      buffer.write(value.toRadixString(16));
    }

    return buffer.toString();
  }

  /// Saves the user ID.
  static Future<void> saveUserID(String userID) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('telemetric_user_id', userID);
    _user_id = userID;
  }

  static Future<String?> getUserID() async {
    final prefs = await SharedPreferences.getInstance();
    _user_id = prefs.getString('telemetric_user_id');
    return _user_id;
  }
}

// Platform-specific utility function
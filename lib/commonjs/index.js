"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApptentiveConfiguration = exports.Apptentive = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'apptentive-react-native' is not linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';

// Get the Apptentive Native Module
const ApptentiveModule = _reactNative.NativeModules.ApptentiveModule ? _reactNative.NativeModules.ApptentiveModule : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
let _onUnreadMessageCountChanged;
let _eventsRegistered = false;

///// Class Implementation

class ApptentiveConfiguration {
  constructor(key, signature) {
    this.apptentiveKey = key;
    this.apptentiveSignature = signature;
    this.logLevel = "info";
    this.distributionName = "React Native";
    this.distributionVersion = require("../package").version;
    this.shouldEncryptStorage = false;
    this.shouldSanitizeLogMessages = true;
    this.shouldInheritAppTheme = true;
    this.ratingInteractionThrottleLength = 604800000;
    this.customAppStoreURL = null;
  }
}
exports.ApptentiveConfiguration = ApptentiveConfiguration;
class Apptentive {
  // Register the Apptentive SDK
  static register(configuration) {
    if (!_eventsRegistered) {
      _eventsRegistered = true;
      const emitter = _reactNative.Platform.select({
        ios: () => new _reactNative.NativeEventEmitter(ApptentiveModule),
        android: () => _reactNative.DeviceEventEmitter,
        default: () => _reactNative.DeviceEventEmitter
      })();
      emitter.addListener(ApptentiveModule.unreadMessageCountChangedEvent, e => {
        if (_onUnreadMessageCountChanged !== undefined) {
          _onUnreadMessageCountChanged(e.count);
        }
      });
    }
    return ApptentiveModule.register(configuration);
  }

  // Engage an event by an event name string
  static engage(event) {
    return ApptentiveModule.engage(event);
  }

  // Present the Message Center
  static presentMessageCenter() {
    return ApptentiveModule.showMessageCenter();
  }

  // Set person name
  static setPersonName(name) {
    return ApptentiveModule.setPersonName(name);
  }

  // Get person name
  static getPersonName() {
    return ApptentiveModule.getPersonName();
  }

  // Set person email
  static setPersonEmail(email) {
    return ApptentiveModule.setPersonEmail(email);
  }

  // Get person name
  static getPersonEmail() {
    return ApptentiveModule.getPersonEmail();
  }

  // Add person custom data based on key string and value of type bool, number, or string
  static addCustomPersonData(key, value) {
    if (_reactNative.Platform.OS === "ios") {
      return ApptentiveModule.addCustomPersonData(key, value);
    } else if (_reactNative.Platform.OS === "android") {
      if (typeof value === 'boolean') {
        return ApptentiveModule.addCustomPersonDataBoolean(key, value);
      }
      if (typeof value === 'number') {
        return ApptentiveModule.addCustomPersonDataNumber(key, value);
      }
      if (typeof value === 'string') {
        return ApptentiveModule.addCustomPersonDataString(key, value);
      }
    } else {
      // Return a default rejected Promise if platform is not supported
      return new Promise((_, reject) => {
        reject("Apptentive Error: Unsupported platform: " + _reactNative.Platform.OS);
      });
    }
    // Return a default rejected Promise if type is not supported
    return new Promise((_, reject) => {
      reject("Apptentive Error: Unsupported type of custom data: " + typeof value);
    });
  }

  /**
   * @deprecated The method should not be used. Use addCustomPersonData() instead
   */
  static addCustomPersonDataBool(key, value) {
    return Apptentive.addCustomPersonData(key, value);
  }

  /**
   * @deprecated The method should not be used. Use addCustomPersonData() instead
   */
  static addCustomPersonDataNumber(key, value) {
    return Apptentive.addCustomPersonData(key, value);
  }

  /**
   * @deprecated The method should not be used. Use addCustomPersonData() instead
   */
  static addCustomPersonDataString(key, value) {
    return Apptentive.addCustomPersonData(key, value);
  }

  // Remove person custom data based on key string
  static removeCustomPersonData(key) {
    return ApptentiveModule.removeCustomPersonData(key);
  }

  // Add device custom data based on key string and value of type bool, number, or string
  static addCustomDeviceData(key, value) {
    if (_reactNative.Platform.OS === "ios") {
      return ApptentiveModule.addCustomDeviceData(key, value);
    } else if (_reactNative.Platform.OS === "android") {
      if (typeof value === 'boolean') {
        return ApptentiveModule.addCustomDeviceDataBoolean(key, value);
      }
      if (typeof value === 'number') {
        return ApptentiveModule.addCustomDeviceDataNumber(key, value);
      }
      if (typeof value === 'string') {
        return ApptentiveModule.addCustomDeviceDataString(key, value);
      }
    } else {
      // Return a default rejected Promise if platform is not supported
      return new Promise((_, reject) => {
        reject("Apptentive Error: Unsupported platform: " + _reactNative.Platform.OS);
      });
    }
    // Return a default rejected Promise if type is not supported
    return new Promise((_, reject) => {
      reject("Apptentive Error: Unsupported type of custom data: " + typeof value);
    });
  }

  /**
   * @deprecated The method should not be used. Use addCustomDeviceData() instead
   */
  static addCustomDeviceDataBool(key, value) {
    return Apptentive.addCustomDeviceData(key, value);
  }

  /**
   * @deprecated The method should not be used. Use addCustomDeviceData() instead
   */
  static addCustomDeviceDataNumber(key, value) {
    return Apptentive.addCustomDeviceData(key, value);
  }

  /**
   * @deprecated The method should not be used. Use addCustomDeviceData() instead
   */
  static addCustomDeviceDataString(key, value) {
    return Apptentive.addCustomDeviceData(key, value);
  }

  // Remove device custom data based on key string
  static removeCustomDeviceData(key) {
    return ApptentiveModule.removeCustomDeviceData(key);
  }

  // Check if an event name will launch an interaction
  static canShowInteraction(event) {
    return ApptentiveModule.canShowInteraction(event);
  }

  // Check if Message Center can be shown
  static canShowMessageCenter() {
    return ApptentiveModule.canShowMessageCenter();
  }

  // Get unread message count in Message Center
  static getUnreadMessageCount() {
    return ApptentiveModule.getUnreadMessageCount();
  }

  /**
   * @return Current callback for the unread message count change in the Message Center.
   */
  static get onUnreadMessageCountChanged() {
    return _onUnreadMessageCountChanged;
  }

  /**
   * Sets current callback for the unread message count change in the Message Center.
   * @param value Callback function with a single integer parameter.
   */
  static set onUnreadMessageCountChanged(value) {
    _onUnreadMessageCountChanged = value;
  }
}
exports.Apptentive = Apptentive;
//# sourceMappingURL=index.js.map
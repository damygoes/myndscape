const { withInfoPlist } = require('@expo/config-plugins');

/**
 * Custom plugin to add Google Maps API key support for Swift AppDelegate
 * This plugin handles the Info.plist configuration that the default Expo Maps plugin
 * doesn't support for Swift AppDelegate files.
 */
const withGoogleMapsSwift = (config, { apiKey }) => {
  return withInfoPlist(config, (config) => {
    if (apiKey) {
      config.modResults.GMSApiKey = apiKey;
    }
    return config;
  });
};

module.exports = withGoogleMapsSwift;

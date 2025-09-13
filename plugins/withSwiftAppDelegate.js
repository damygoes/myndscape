const { withInfoPlist, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * Enhanced plugin to handle Google Maps configuration in Swift AppDelegate
 * This plugin:
 * 1. Adds the Google Maps API key to Info.plist
 * 2. Modifies the Swift AppDelegate to initialize Google Maps if needed
 */
const withSwiftAppDelegate = (config, { apiKey, enableMaps = false } = {}) => {
  // Add API key to Info.plist
  config = withInfoPlist(config, (config) => {
    if (apiKey && enableMaps) {
      config.modResults.GMSApiKey = apiKey;
    }
    return config;
  });

  // Modify Swift AppDelegate if Google Maps is enabled
  if (enableMaps && apiKey) {
    config = withDangerousMod(config, [
      'ios',
      async (config) => {
        const appDelegatePath = path.join(
          config.modRequest.projectRoot,
          'ios',
          config.modRequest.projectName,
          'AppDelegate.swift',
        );

        if (fs.existsSync(appDelegatePath)) {
          let contents = fs.readFileSync(appDelegatePath, 'utf8');

          // Add GoogleMaps import if not already present
          if (!contents.includes('import GoogleMaps')) {
            contents = contents.replace('import Expo', 'import Expo\nimport GoogleMaps');
          }

          // Add Google Maps configuration in didFinishLaunchingWithOptions
          if (!contents.includes('GMSServices.provideAPIKey')) {
            const configureGoogleMaps = `
    // Configure Google Maps
    GMSServices.provideAPIKey("${apiKey}")
`;
            contents = contents.replace(
              '    return super.application(application, didFinishLaunchingWithOptions: launchOptions)',
              `${configureGoogleMaps}
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)`,
            );
          }

          fs.writeFileSync(appDelegatePath, contents);
        }

        return config;
      },
    ]);
  }

  return config;
};

module.exports = withSwiftAppDelegate;

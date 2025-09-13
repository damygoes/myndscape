/**
 * Plugin to prevent automatic Google Maps configuration
 * This plugin disables the default Google Maps setup that causes issues with Swift AppDelegate
 */
const withoutGoogleMaps = (config) => {
  // Remove any automatic Google Maps configuration
  if (config.ios && config.ios.config && config.ios.config.googleMapsApiKey) {
    delete config.ios.config.googleMapsApiKey;
  }

  // Ensure no Google Maps related configuration is automatically applied
  if (config.plugins) {
    config.plugins = config.plugins.filter((plugin) => {
      if (typeof plugin === 'string') {
        return !plugin.includes('maps') && !plugin.includes('Maps');
      }
      if (Array.isArray(plugin) && plugin.length > 0) {
        return !plugin[0].includes('maps') && !plugin[0].includes('Maps');
      }
      return true;
    });
  }

  return config;
};

module.exports = withoutGoogleMaps;

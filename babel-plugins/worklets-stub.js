// Stub plugin for react-native-worklets to satisfy babel requirements
// This plugin does nothing and serves as a placeholder

module.exports = function () {
  return {
    name: 'worklets-stub',
    visitor: {
      // Empty visitor - this plugin does nothing
    },
  };
};

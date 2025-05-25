const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
    projectRoot: __dirname,
    watchFolders: [path.resolve(__dirname, '..')],
    resolver: {
        extraNodeModules: {
            'react-native-you': path.resolve(__dirname, '..', 'src'),
        },
    },
};

module.exports = wrapWithReanimatedMetroConfig(mergeConfig(defaultConfig, config));

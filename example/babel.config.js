const path = require('path');
const pak = require('../package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [pak.name]: path.resolve(__dirname, '..', 'src'),
          [`${pak.name}/package.json`]: path.resolve(__dirname, '..', 'package.json'),
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

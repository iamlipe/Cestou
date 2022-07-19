module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@__mocks__': './__mocks__',
          '@__tests__': './__tests__',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.json',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    ],
    ['module:react-native-dotenv', {moduleName: 'react-native-dotenv'}],
    'react-native-reanimated/plugin',
  ],
};

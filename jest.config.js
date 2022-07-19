module.exports = {
  preset: 'react-native',
  verbose: true,
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/__tests__/jest.setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@?react-navigation||@react-native-community)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.ts',
  },
  testPathIgnorePatterns: [
    '<rootDir>/ios',
    '<rootDir>/android',
    '<rootDir>/__tests__/jest.setup.js',
    '<rootDir>/node_modules',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

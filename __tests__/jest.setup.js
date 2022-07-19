import 'react-native-gesture-handler/jestSetup';

jest.useRealTimers(); // mock timers required for async functions

global.window = {};
global.window = global;
global.ReanimatedDataMock = {
  now: () => 0,
};

jest.mock('react-hook-form', () => {
  const originalModule = jest.requireActual('@react-navigation/native');
  return {
    ...originalModule,
    useController: () => ({
      field: {
        onChange: jest.fn(),
        value: '',
      },
    }),
  };
});

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true,
    ...originalModule,
    useFocusEffect: jest.fn(),
    useIsFocused: jest.fn().mockReturnValue(true),
    useNavigation: () => ({
      pop: jest.fn(),
      popToTop: jest.fn(),
      navigate: jest.fn(),
      dispatch: jest.fn(),
      addListener: jest.fn(),
      goBack: jest.fn(),
      canGoBack: jest.fn().mockReturnValue(true),
    }),
  };
});

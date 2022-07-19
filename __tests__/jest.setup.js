import 'react-native-gesture-handler/jestSetup';

jest.useRealTimers(); // mock timers required for async functions

global.window = {};
global.window = global;
global.ReanimatedDataMock = {
  now: () => 0,
};

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: jest.fn(),
    handleSubmit: jest.fn(),
  }),

  useController: () => ({
    field: {
      onChange: jest.fn(),
      value: 'test',
    },
    fieldState: {
      error: 'somithing went wrong',
    },
  }),
}));

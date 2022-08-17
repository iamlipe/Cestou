import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {mockUseParams} from '@__mocks__/mockUseRoute';
import {mockValueBasket} from '@__mocks__/mockUseGetConsumerBasket';

jest.useRealTimers(); // mock timers required for async functions

global.window = {};
global.window = global;
global.ReanimatedDataMock = {
  now: () => 0,
};

jest.mock('react-native-localize', () => {
  return {
    findBestAvailableLanguage: jest.fn(() => ({languageTag: 'pt'})),
  };
});

jest.mock('@/hooks/useGetConsumerBasket', () => ({
  useGetConsumerBasket: () => ({
    basketConsumer: {
      basketID: {
        id: '1',
        daysPerDeliver: '7',
        size: 'big',
        value: mockValueBasket(),
        createdAt: '2022-04-08T23:22:52.622Z',
        updatedAt: '2022-04-08T23:22:52.622Z',
        deletedAt: null,
      },
      basketProducerID: {
        balance: '0.00',
        cpfPix: null,
        emailPix: null,
        phonePix: null,
        randomPix: null,
        userID: {
          id: '1',
          firstName: 'José',
          lastName: null,
          email: null,
          phone: '86828282828',
          cpf: null,
          userType: 'producer',
          createdAt: '1',
          updatedAt: '2022-04-26T03:37:55.745Z',
          deletedAt: null,
        },
      },
    },
  }),
}));

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');

  return {
    __esModule: true,
    ...originalModule,
    useRoute: () => ({
      params: mockUseParams(),
    }),
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

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

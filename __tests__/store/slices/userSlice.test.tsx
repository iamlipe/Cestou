import reducer, {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from '@/store/slices/userSlice';
import {apiReturnSuccessMock} from '../../../__mocks__/mockLogin';

describe('userSlice', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {
        type: undefined,
      }),
    ).toEqual({
      isLoading: false,
      auth: null,
      error: null,
      statusCode: null,
    });
  });

  test('should handle LOGIN', () => {
    const reducerLogin = reducer(
      undefined,
      LOGIN({phoneOrEmail: 'test@email.com', password: '123456'}),
    );

    expect(reducerLogin).toEqual({
      isLoading: true,
      auth: null,
      error: null,
      statusCode: null,
    });
  });

  test('should handle LOGIN_SUCCESS', () => {
    const reducerLoginSuccess = reducer(
      undefined,
      LOGIN_SUCCESS(apiReturnSuccessMock),
    );

    expect(reducerLoginSuccess).toEqual({
      isLoading: false,
      auth: apiReturnSuccessMock.data,
      error: null,
      statusCode: null,
    });
  });

  test('should handle LOGIN_FAILURE', () => {
    const reducerLoginSuccess = reducer(
      undefined,
      LOGIN_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerLoginSuccess).toEqual({
      isLoading: false,
      auth: null,
      error: 'something went wrong',
      statusCode: null,
    });
  });
});

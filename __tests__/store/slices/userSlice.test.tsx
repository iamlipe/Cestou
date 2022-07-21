import reducer, {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from '@/store/slices/userSlice';
import {registerValidPayload} from '@__mocks__/mockRegister';
import {
  loginValidPayload,
  apiReturnSuccessMock,
} from '../../../__mocks__/mockLogin';

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
    const reducerLogin = reducer(undefined, LOGIN(loginValidPayload));

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
      LOGIN_SUCCESS({...apiReturnSuccessMock, status: 200}),
    );

    expect(reducerLoginSuccess).toEqual({
      isLoading: false,
      auth: apiReturnSuccessMock.data,
      error: null,
      statusCode: 200,
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

  test('should handle REGISTER', () => {
    const reducerRegister = reducer(undefined, REGISTER(registerValidPayload));

    expect(reducerRegister).toEqual({
      isLoading: true,
      auth: null,
      error: null,
      statusCode: null,
    });
  });

  test('should handle REGISTER_SUCCESS', () => {
    const reducerRegisterSuccess = reducer(
      undefined,
      REGISTER_SUCCESS({status: 200}),
    );
    expect(reducerRegisterSuccess).toEqual({
      isLoading: false,
      auth: null,
      error: null,
      statusCode: 200,
    });
  });

  test('should handle REGISTER_FAILURE', () => {
    const reducerRegisterFailure = reducer(
      undefined,
      REGISTER_FAILURE({error: 'something went wrong'}),
    );
    expect(reducerRegisterFailure).toEqual({
      isLoading: false,
      auth: null,
      error: 'something went wrong',
      statusCode: null,
    });
  });
});

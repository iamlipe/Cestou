import reducer, {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  REGISTER,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REMEMBER_USER,
} from '@/store/slices/userSlice';
import {registerValidPayload} from '@__mocks__/mockRegister';
import {
  loginValidPayload,
  apiReturnLoginSuccessMock,
  userMock,
} from '../../../__mocks__/mockLogin';

describe('userSlice', () => {
  const error = 'something went wrong';

  test('should return the initial state', () => {
    const reducerInitial = reducer(undefined, {type: undefined});

    expect(reducerInitial).toEqual({
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
      LOGIN_SUCCESS({...apiReturnLoginSuccessMock, status: 200}),
    );

    expect(reducerLoginSuccess).toEqual({
      isLoading: false,
      auth: apiReturnLoginSuccessMock.data,
      error: null,
      statusCode: 200,
    });
  });

  test('should handle LOGIN_FAILURE', () => {
    const reducerLoginSuccess = reducer(undefined, LOGIN_FAILURE({error}));

    expect(reducerLoginSuccess).toEqual({
      isLoading: false,
      auth: null,
      error: error,
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
      REGISTER_FAILURE({error}),
    );
    expect(reducerRegisterFailure).toEqual({
      isLoading: false,
      auth: null,
      error: error,
      statusCode: null,
    });
  });

  test('should handle LOGOUT', () => {
    const reducerLogout = reducer(undefined, LOGOUT());

    expect(reducerLogout).toEqual({
      isLoading: true,
      auth: null,
      error: null,
      statusCode: null,
    });
  });

  test('should handle LOGOUT_SUCCESS', () => {
    const reducerLogout = reducer(undefined, LOGOUT_SUCCESS());

    expect(reducerLogout).toEqual({
      isLoading: false,
      auth: null,
      error: null,
      statusCode: null,
    });
  });

  test('should handle LOGOUT_FAILURE', () => {
    const reducerLogout = reducer(undefined, REGISTER_FAILURE({error}));

    expect(reducerLogout).toEqual({
      isLoading: false,
      auth: null,
      error: error,
      statusCode: null,
    });
  });

  test('should handle REMEMBER_USER', () => {
    const reducerLoginSuccess = reducer(undefined, REMEMBER_USER(userMock));

    expect(reducerLoginSuccess).toEqual({
      isLoading: false,
      auth: userMock,
      error: null,
      statusCode: null,
    });
  });
});

import api from '@/config/services/api';
import {login, register} from '@/store/sagas/userSaga';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  LoginRequest,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  RegisterRequest,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  User,
} from '@/store/slices/userSlice';
import {runSaga, Saga} from 'redux-saga';
import {
  apiReturnErrorMock,
  apiReturnSuccessMock,
  loginInvalidPayload,
  loginValidPayload,
  userMock,
} from '../../../__mocks__/mockLogin';
import {
  apiReturnErrorRegisterMock,
  apiReturnSuccessRegisterMock,
  registerInvalidPayload,
  registerValidPayload,
} from '@__mocks__/mockRegister';

describe('userSaga', () => {
  const dispatchedActions: PayloadAction<User>[] = [];

  test('should make login with valid credentials', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce(apiReturnSuccessMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<User>) =>
          dispatchedActions.push(action),
      },
      login as unknown as Saga<[{payload: LoginRequest}]>,
      {payload: loginValidPayload},
    ).toPromise();

    expect(api.post).toHaveBeenCalledWith('/auth/login', loginValidPayload);

    expect(dispatchedActions).toContainEqual(
      LOGIN_SUCCESS({
        data: userMock,
        status: 200,
      }),
    );
  });

  test('should not make login with invalid credentials', async () => {
    (api.post as jest.Mock).mockRejectedValueOnce(apiReturnErrorMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<User>) =>
          dispatchedActions.push(action),
      },
      login as unknown as Saga<[{payload: LoginRequest}]>,
      {payload: loginInvalidPayload},
    ).toPromise();

    expect(api.post).toHaveBeenCalledWith('/auth/login', loginInvalidPayload);

    expect(dispatchedActions).toContainEqual(
      LOGIN_FAILURE({error: apiReturnErrorMock}),
    );
  });

  test('should make register with valid credentials', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce(apiReturnSuccessRegisterMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<User>) =>
          dispatchedActions.push(action),
      },
      register as unknown as Saga<[{payload: RegisterRequest}]>,
      {payload: registerValidPayload},
    ).toPromise();

    expect(api.post).toHaveBeenCalledWith(
      '/users/new-user/',
      registerValidPayload,
    );
    expect(dispatchedActions).toContainEqual(REGISTER_SUCCESS({status: 200}));
  });

  test('should not make register with invalid credentials', async () => {
    (api.post as jest.Mock).mockRejectedValueOnce(apiReturnErrorRegisterMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<User>) =>
          dispatchedActions.push(action),
      },
      register as unknown as Saga<[{payload: RegisterRequest}]>,
      {payload: registerInvalidPayload},
    ).toPromise();

    expect(api.post).toHaveBeenCalledWith(
      '/users/new-user/',
      registerInvalidPayload,
    );
    expect(dispatchedActions).toContainEqual(
      REGISTER_FAILURE({error: apiReturnErrorRegisterMock}),
    );
  });
});

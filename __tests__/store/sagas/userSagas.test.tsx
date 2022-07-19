import api from '@/config/services/api';
import {login} from '@/store/sagas/userSaga';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  LoginRequest,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
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

describe('userSaga', () => {
  const dispatchedActions: PayloadAction<User>[] = [];

  it('should make login with valid credentials', async () => {
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

    expect(dispatchedActions).toContainEqual(LOGIN_SUCCESS({data: userMock}));
  });

  it('should make login with invalid credentials', async () => {
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
});

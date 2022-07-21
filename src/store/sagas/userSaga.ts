import {takeLatest, all, put, call} from 'redux-saga/effects';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LoginRequest,
  LoginResponse,
  User,
  RegisterRequest,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER,
} from '@/store/slices/userSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import api from '@/config/services/api';

export function* login({payload}: PayloadAction<LoginRequest>) {
  try {
    const {data}: AxiosResponse<LoginResponse> = yield call(
      api.post,
      '/auth/login',
      {
        ...payload,
      },
    );

    const user: User = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      token: data.token,
      refreshToken: data.refresh_token,
    };

    yield put(LOGIN_SUCCESS({data: user, status: 200}));
  } catch (error) {
    yield put(LOGIN_FAILURE({error}));
  }
}

export function* register({payload}: PayloadAction<RegisterRequest>) {
  try {
    yield call(api.post, '/users/new-user/', {...payload});

    yield put(REGISTER_SUCCESS({status: 200}));
  } catch (error) {
    yield put(REGISTER_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([takeLatest(LOGIN, login), takeLatest(REGISTER, register)]);
}

import {takeLatest, all, put, call} from 'redux-saga/effects';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LoginRequest,
  LoginResponse,
  User,
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

    yield put(LOGIN_SUCCESS({data: user}));
  } catch (error) {
    yield put(LOGIN_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([takeLatest(LOGIN, login)]);
}

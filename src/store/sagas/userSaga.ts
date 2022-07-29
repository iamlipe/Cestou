import api from '@/config/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
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
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT,
} from '@/store/slices/userSlice';

export function* login({payload}: PayloadAction<LoginRequest>) {
  try {
    const {data}: AxiosResponse<LoginResponse> = yield call(
      api.post,
      '/auth/login',
      {
        phoneOrEmail: payload.phoneOrEmail.toLowerCase(),
        password: payload.password,
      },
    );

    const user: User = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      userType: data.user_type,
      phone: data.phone,
      token: data.token,
      refreshToken: data.refresh_token,
    };

    if (payload.remember?.length) {
      yield call(AsyncStorage.setItem, '@user', JSON.stringify(user));
    }

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

export function* logout() {
  try {
    yield call(AsyncStorage.removeItem, '@user');

    yield put(LOGOUT_SUCCESS());
  } catch (error) {
    yield put(LOGOUT_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([
    takeLatest(LOGIN, login),
    takeLatest(REGISTER, register),
    takeLatest(LOGOUT, logout),
  ]);
}

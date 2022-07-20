/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export interface LoginRequest {
  phoneOrEmail: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  first_name: string;
  last_name: string;
  user_type: string;
  email: string | null;
  phone: string | null;
  cpf: string | null;
  password: string;
  token: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string | null;
  phone?: string | null;
  token?: string;
  refreshToken?: string;
}

interface UserState {
  isLoading: boolean;
  auth: User | null;
  error: AxiosError | null;
  statusCode: number | null;
}

const initialState: UserState = {
  isLoading: false,
  auth: null,
  error: null,
  statusCode: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LOGIN: (state, _: PayloadAction<LoginRequest>) => ({
      ...state,
      isLoading: true,
      error: null,
      statusCode: null,
    }),
    LOGIN_SUCCESS: (state, {payload: {data}}: PayloadAction<{data: User}>) => ({
      ...state,
      isLoading: false,
      auth: data,
    }),
    LOGIN_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),
  },
});

const {actions, reducer} = userSlice;

export const userState = initialState;

export const {LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS} = actions;
export default reducer;

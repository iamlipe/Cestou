import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export interface LoginRequest {
  phoneOrEmail: string;
  password: string;
  remember: string[];
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

export interface RegisterForm {
  name: string;
  userType: string;
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  userType: string;
  email: string;
  password: string;
}

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  userType?: string;
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
    LOGIN_SUCCESS: (
      state,
      {payload: {data, status}}: PayloadAction<{data: User; status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      auth: data,
      statusCode: status,
    }),
    LOGIN_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),

    REGISTER: (state, _: PayloadAction<RegisterRequest>) => ({
      ...state,
      isLoading: true,
      error: null,
      statusCode: null,
    }),
    REGISTER_SUCCESS: (
      state,
      {payload: {status}}: PayloadAction<{status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      statusCode: status,
    }),
    REGISTER_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),

    LOGOUT: (state, _: PayloadAction) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    LOGOUT_SUCCESS: () => ({
      ...initialState,
    }),
    LOGOUT_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),

    REMEMBER_USER: (state, {payload}: PayloadAction<User>) => ({
      ...state,
      auth: payload,
    }),
  },
});

const {actions, reducer} = userSlice;

export const userState = initialState;

export const {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REMEMBER_USER,
} = actions;
export default reducer;

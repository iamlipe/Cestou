import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export interface BasketResponse {
  name: string;
  id: string;
  size: string;
  daysPerDeliver: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SignupProducerBasketRequest {
  basketID: string;
}

export interface BaskertStatus {
  isLoading: boolean;
  error: AxiosError | null;
  status: number | null;
  allBaskets: BasketResponse[];
}

const initialState: BaskertStatus = {
  isLoading: false,
  error: null,
  status: null,
  allBaskets: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    GET_BASKET: state => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    GET_BASKET_SUCCESS: (
      state,
      {
        payload: {allBaskets, status},
      }: PayloadAction<{allBaskets: BasketResponse[]; status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      error: null,
      status: status,

      allBaskets,
    }),
    GET_BASKET_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),

    SIGNUP_PRODUCER_BASKET: (
      state,
      _: PayloadAction<SignupProducerBasketRequest>,
    ) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    SIGNUP_PRODUCER_BASKET_SUCCESS: state => ({
      ...state,
      isLoading: false,
      error: null,
    }),
    SIGNUP_PRODUCER_BASKET_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),
  },
});

const {actions, reducer} = basketSlice;

export const basketState = initialState;

export const {
  GET_BASKET,
  GET_BASKET_SUCCESS,
  GET_BASKET_FAILURE,
  SIGNUP_PRODUCER_BASKET,
  SIGNUP_PRODUCER_BASKET_FAILURE,
  SIGNUP_PRODUCER_BASKET_SUCCESS,
} = actions;

export default reducer;

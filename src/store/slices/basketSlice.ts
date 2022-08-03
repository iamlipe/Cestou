import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

export interface BasketResponse {
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

export interface SignupConsumerBasketRequest {
  basketID: string;
  producerID: string;
}

export interface BasketStatus {
  isLoading: boolean;
  error: AxiosError | null;
  status: number | null;
  allBaskets: BasketResponse[];
}

const initialState: BasketStatus = {
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

    SIGNUP_CONSUMER_BASKET: (
      state,
      _: PayloadAction<SignupConsumerBasketRequest>,
    ) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    SIGNUP_CONSUMER_BASKET_SUCCESS: state => ({
      ...state,
      isLoading: false,
      error: null,
    }),
    SIGNUP_CONSUMER_BASKET_FAILURE: (state, {payload: {error}}) => ({
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
  SIGNUP_CONSUMER_BASKET,
  SIGNUP_CONSUMER_BASKET_SUCCESS,
  SIGNUP_CONSUMER_BASKET_FAILURE,
} = actions;

export default reducer;

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

export interface BasketProducerResponse {
  user_id: string;
  basket_id: string;
  basket_size: string;
  basket_days_per_deliver: string;
  basket_value: string;
  basket_created_at: string;
  basket_updated_at: string;
  basket_deleted_at: string | null;
}

export interface BasketProducerRequest {
  daysPerDeliver: string;
  size: string;
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
  basketProducer: BasketProducerResponse | null;
}

const initialState: BasketStatus = {
  isLoading: false,
  error: null,
  status: null,

  allBaskets: [],
  basketProducer: null,
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

    GET_BASKET_PRODUCER: (state, _: PayloadAction<BasketProducerRequest>) => ({
      ...state,
      isLoading: true,
      error: null,
    }),

    GET_BASKET_PRODUCER_SUCCESS: (
      state,
      {
        payload: {data, status},
      }: PayloadAction<{data: BasketProducerResponse; status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      error: null,
      status: status,

      basketProducer: data,
    }),

    GET_BASKET_PRODUCER_FAILURE: (state, {payload: {error}}) => ({
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
  GET_BASKET_PRODUCER,
  GET_BASKET_PRODUCER_SUCCESS,
  GET_BASKET_PRODUCER_FAILURE,
} = actions;

export default reducer;

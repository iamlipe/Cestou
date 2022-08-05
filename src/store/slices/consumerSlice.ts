import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {BasketResponse} from './basketSlice';
import {Producer} from './producerSlice';
import {User} from './userSlice';

export interface ConsumerBasketResponse {
  basketID: BasketResponse;
  basketProducerID: Producer & {userID: User};
}

interface ConsumerState {
  isLoading: boolean;
  error: AxiosError | null;
  statusCode: number | null;

  consumerBasket: ConsumerBasketResponse | null;
}

const initialState: ConsumerState = {
  isLoading: false,
  error: null,
  statusCode: null,

  consumerBasket: null,
};

const consumerSlice = createSlice({
  name: 'consumer',
  initialState,
  reducers: {
    GET_CONSUMER_BASKET: state => ({
      ...state,
      isLoading: true,
      error: null,
      statusCode: null,

      consumerBasket: null,
    }),

    GET_CONSUMER_BASKET_SUCCESS: (
      state,
      {
        payload: {data, status},
      }: PayloadAction<{data: ConsumerBasketResponse; status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      statusCode: status,

      consumerBasket: data,
    }),

    GET_CONSUMER_BASKET_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,

      consumerBasket: null,
    }),
  },
});

const {actions, reducer} = consumerSlice;

export const consumerState = initialState;

export const {
  GET_CONSUMER_BASKET,
  GET_CONSUMER_BASKET_SUCCESS,
  GET_CONSUMER_BASKET_FAILURE,
} = actions;

export default reducer;

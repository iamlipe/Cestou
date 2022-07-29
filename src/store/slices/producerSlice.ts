import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {User} from './userSlice';
import {BasketResponse} from './basketSlice';

export interface ProducerRequest {
  id: string;
}

export interface ProducerResponse {
  userID: User;
  cpfPix: string;
  emailPix: string;
  phonePix: string;
  randomPix: string;
  balance: number;
}

export interface ProducerBasketResponse {
  userID: User;
  cpfPix: string;
  emailPix: string;
  phonePix: string;
  randomPix: string;
  balance: number;
  bigBasket: BasketResponse | undefined;
  mediumBasket: BasketResponse | undefined;
  smallBasket: BasketResponse | undefined;
}

export interface Producer {
  cpfPix: string;
  emailPix: string;
  phonePix: string;
  randomPix: string;
  balance: number;
}

export interface ProducerBasket {
  bigBasket: BasketResponse | undefined;
  mediumBasket: BasketResponse | undefined;
  smallBasket: BasketResponse | undefined;
}

interface ProducerState {
  isLoading: boolean;
  error: AxiosError | null;
  status: number | null;
  producer: Producer | null;
  producerBasket: ProducerBasket | null;
}

const initialState: ProducerState = {
  isLoading: false,
  error: null,
  status: null,

  producer: null,
  producerBasket: null,
};

const producerSlice = createSlice({
  name: 'producer',
  initialState,
  reducers: {
    GET_PRODUCER: state => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    GET_PRODUCER_SUCCESS: (
      state,
      {
        payload: {producer, status},
      }: PayloadAction<{producer: Producer; status: number}>,
    ) => ({
      ...state,
      isLoading: false,
      error: null,
      producer: producer,
      status: status,
    }),
    GET_PRODUCER_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),

    GET_PRODUCER_BASKET: (state, _: PayloadAction<ProducerRequest>) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    GET_PRODUCER_BASKET_SUCCESS: (
      state,
      {
        payload: {baskets, status},
      }: PayloadAction<{
        baskets: ProducerBasket;
        status: number;
      }>,
    ) => ({
      ...state,
      isLoading: false,
      statusCode: status,
      producerBasket: baskets,
    }),
    GET_PRODUCER_BASKET_FAILURE: (state, {payload: {error}}) => ({
      ...state,
      isLoading: false,
      error,
    }),
  },
});

const {actions, reducer} = producerSlice;

export const producerState = initialState;

export const {
  GET_PRODUCER,
  GET_PRODUCER_SUCCESS,
  GET_PRODUCER_FAILURE,
  GET_PRODUCER_BASKET,
  GET_PRODUCER_BASKET_SUCCESS,
  GET_PRODUCER_BASKET_FAILURE,
} = actions;
export default reducer;
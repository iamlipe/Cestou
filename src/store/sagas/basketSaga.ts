import api from '@/config/services/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {takeLatest, all, put, call} from 'redux-saga/effects';

import {getDefaulSize, getDefaultDeliver} from '@/helpers/getDefaulParams';

import {
  GET_BASKET,
  GET_BASKET_FAILURE,
  GET_BASKET_SUCCESS,
  SIGNUP_CONSUMER_BASKET_FAILURE,
  SIGNUP_CONSUMER_BASKET_SUCCESS,
  SIGNUP_PRODUCER_BASKET,
  SIGNUP_PRODUCER_BASKET_FAILURE,
  SIGNUP_PRODUCER_BASKET_SUCCESS,
  BasketResponse,
  SignupConsumerBasketRequest,
  SignupProducerBasketRequest,
  BasketProducerRequest,
  GET_BASKET_PRODUCER_SUCCESS,
  GET_BASKET_PRODUCER_FAILURE,
  BasketProducerResponse,
  GET_BASKET_PRODUCER,
} from '../slices/basketSlice';

export function* getBaskets() {
  try {
    const {data, status}: AxiosResponse<BasketResponse[]> = yield call(
      api.get,
      '/baskets/list/',
    );

    const allBaskets: BasketResponse[] = data;

    yield put(GET_BASKET_SUCCESS({allBaskets, status}));
  } catch (error) {
    yield put(GET_BASKET_FAILURE({error}));
  }
}

export function* signupProducerBasket({
  payload,
}: PayloadAction<SignupProducerBasketRequest>) {
  try {
    yield call(api.patch, '/baskets/assign-basket-to-producer', payload);

    yield put(SIGNUP_PRODUCER_BASKET_SUCCESS());
  } catch (error) {
    yield put(SIGNUP_PRODUCER_BASKET_FAILURE({error}));
  }
}

export function* signupConsumerBasket({
  payload,
}: PayloadAction<SignupConsumerBasketRequest>) {
  try {
    yield call(api.patch, '/baskets/assign-basket-to-consumer', payload);

    yield put(SIGNUP_CONSUMER_BASKET_SUCCESS());
  } catch (error) {
    yield put(SIGNUP_CONSUMER_BASKET_FAILURE({error}));
  }
}

export function* getBasketProducer({
  payload,
}: PayloadAction<BasketProducerRequest>) {
  try {
    const {data, status}: AxiosResponse<BasketProducerResponse[]> = yield call(
      api.get,
      `/baskets/producers-baskets/`,
      {
        params: {
          daysPerDeliver: getDefaultDeliver(payload.daysPerDeliver),
          size: getDefaulSize(payload.size),
        },
      },
    );

    const basketProducer = data[Math.floor(Math.random() * data.length)];

    yield put(GET_BASKET_PRODUCER_SUCCESS({data: basketProducer, status}));
  } catch (error) {
    yield put(GET_BASKET_PRODUCER_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([
    takeLatest(GET_BASKET, getBaskets),
    takeLatest(SIGNUP_PRODUCER_BASKET, signupProducerBasket),
    takeLatest(SIGNUP_PRODUCER_BASKET, signupConsumerBasket),
    takeLatest(GET_BASKET_PRODUCER, getBasketProducer),
  ]);
}

import api from '@/config/services/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {takeLatest, all, put, call} from 'redux-saga/effects';

import {getDefaulSize, getDefaultDeliver} from '@/helpers/getDefaulParams';

import {
  BasketResponse,
  BasketFoodQuantity,
  SignupConsumerBasketRequest,
  SignupProducerBasketRequest,
  BasketProducerRequest,
  BasketProducerResponse,
  BasketConsumerResponse,
  GET_BASKET,
  GET_BASKET_FAILURE,
  GET_BASKET_SUCCESS,
  GET_BASKET_PRODUCER,
  GET_BASKET_PRODUCER_SUCCESS,
  GET_BASKET_PRODUCER_FAILURE,
  SIGNUP_PRODUCER_BASKET,
  SIGNUP_PRODUCER_BASKET_FAILURE,
  SIGNUP_PRODUCER_BASKET_SUCCESS,
  GET_CONSUMER_BASKET,
  GET_CONSUMER_BASKET_SUCCESS,
  GET_CONSUMER_BASKET_FAILURE,
  SIGNUP_CONSUMER_BASKET,
  SIGNUP_CONSUMER_BASKET_FAILURE,
  SIGNUP_CONSUMER_BASKET_SUCCESS,
  REMOVE_FOOD_BASKET,
  REMOVE_FOOD_BASKET_SUCCESS,
  REMOVE_FOOD_BASKET_FAILURE,
} from '../slices/basketSlice';

import {FoodBasketResponse} from '../slices/foodSlice';

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

export function* getBasketConsumer() {
  try {
    const {data, status}: AxiosResponse<BasketConsumerResponse> = yield call(
      api.get,
      `/consumers/get-consumer-basket`,
    );

    yield put(GET_CONSUMER_BASKET_SUCCESS({data, status}));
  } catch (error) {
    yield put(GET_CONSUMER_BASKET_FAILURE({error}));
  }
}

export function* removeFoodBasket({
  payload,
}: PayloadAction<{
  foodsBasket: FoodBasketResponse[];
  foodsInMyBasket: BasketFoodQuantity;
}>) {
  try {
    const removedFoods = Object.entries(payload.foodsInMyBasket).map(
      ([key, value]) => ({
        foodID: payload.foodsBasket.find(food => food.foodID.name === key)
          ?.foodID.id,
        quantity: value,
      }),
    );

    yield call(api.post, 'consumers/basket/set-removed-foods', removedFoods);

    yield put(REMOVE_FOOD_BASKET_SUCCESS());
  } catch (error) {
    yield put(REMOVE_FOOD_BASKET_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([
    takeLatest(GET_BASKET, getBaskets),
    takeLatest(SIGNUP_PRODUCER_BASKET, signupProducerBasket),
    takeLatest(SIGNUP_CONSUMER_BASKET, signupConsumerBasket),
    takeLatest(GET_BASKET_PRODUCER, getBasketProducer),
    takeLatest(GET_CONSUMER_BASKET, getBasketConsumer),
    takeLatest(REMOVE_FOOD_BASKET, removeFoodBasket),
  ]);
}

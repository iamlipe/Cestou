import api from '@/config/services/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {takeLatest, all, put, call} from 'redux-saga/effects';

import {
  GET_PRODUCER,
  GET_PRODUCER_SUCCESS,
  GET_PRODUCER_FAILURE,
  GET_PRODUCER_BASKET,
  GET_PRODUCER_BASKET_SUCCESS,
  GET_PRODUCER_BASKET_FAILURE,
  ProducerBasketResponse,
  ProducerBasket,
  ProducerResponse,
  Producer,
  ProducerRequest,
} from '../slices/producerSlice';

export function* getProducer({payload}: PayloadAction<ProducerRequest>) {
  try {
    const {data, status}: AxiosResponse<ProducerResponse> = yield call(
      api.post,
      `/producers/${payload.id}/`,
    );

    const producer: Producer = {
      emailPix: data.emailPix,
      phonePix: data.phonePix,
      cpfPix: data.cpfPix,
      randomPix: data.randomPix,
      balance: data.balance,
    };

    yield put(GET_PRODUCER_SUCCESS({producer, status}));
  } catch (error) {
    yield put(GET_PRODUCER_FAILURE({error}));
  }
}

export function* getProducerBaskets() {
  try {
    const {data, status}: AxiosResponse<ProducerBasketResponse> = yield call(
      api.get,
      '/producers/get-producer-baskets',
    );

    const baskets: ProducerBasket = {
      bigBasket: data.bigBasket ? data.bigBasket : undefined,
      mediumBasket: data.mediumBasket ? data.mediumBasket : undefined,
      smallBasket: data.smallBasket ? data.smallBasket : undefined,
    };

    yield put(GET_PRODUCER_BASKET_SUCCESS({baskets, status}));
  } catch (error) {
    yield put(GET_PRODUCER_BASKET_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([
    takeLatest(GET_PRODUCER, getProducer),
    takeLatest(GET_PRODUCER_BASKET, getProducerBaskets),
  ]);
}

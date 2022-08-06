import api from '@/config/services/api';
import {AxiosResponse} from 'axios';
import {takeLatest, all, put, call} from 'redux-saga/effects';

import {
  ConsumerBasketResponse,
  GET_CONSUMER_BASKET,
  GET_CONSUMER_BASKET_FAILURE,
  GET_CONSUMER_BASKET_SUCCESS,
} from '../slices/consumerSlice';

export function* getConsumerBasket() {
  try {
    const {data, status}: AxiosResponse<ConsumerBasketResponse> = yield call(
      api.get,
      `/consumers/get-consumer-basket`,
    );

    yield put(GET_CONSUMER_BASKET_SUCCESS({data, status}));
  } catch (error) {
    yield put(GET_CONSUMER_BASKET_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([takeLatest(GET_CONSUMER_BASKET, getConsumerBasket)]);
}

import api from '@/config/services/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {AxiosResponse} from 'axios';
import {takeLatest, all, put, call} from 'redux-saga/effects';

import {
  FoodBasketRequest,
  FoodBasketResponse,
  GET_FOODS_BASKET,
  GET_FOODS_BASKET_FAILURE,
  GET_FOODS_BASKET_SUCCESS,
} from '../slices/foodSlice';

export function* getFoodsBasket({payload}: PayloadAction<FoodBasketRequest>) {
  try {
    const {data, status}: AxiosResponse<FoodBasketResponse[]> = yield call(
      api.get,
      `/baskets/basket/${payload.id}`,
    );

    yield put(GET_FOODS_BASKET_SUCCESS({data, status}));
  } catch (error) {
    yield put(GET_FOODS_BASKET_FAILURE({error}));
  }
}

export default function* watcher() {
  yield all([takeLatest(GET_FOODS_BASKET, getFoodsBasket)]);
}

import {combineReducers} from '@reduxjs/toolkit';

import user, {userState} from './userSlice';
import producer, {producerState} from './producerSlice';
import basket, {basketState} from './basketSlice';
import food, {foodState} from './foodSlice';
import consumer, {consumerState} from './consumerSlice';

export const globalState = {
  user: userState,
  producer: producerState,
  basket: basketState,
  food: foodState,
  consumer: consumerState,
};

export const globalReducer = {user, producer, basket, food, consumer};

const rootReducer = combineReducers(globalReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

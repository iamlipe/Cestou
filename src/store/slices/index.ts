import {combineReducers} from '@reduxjs/toolkit';

import user, {userState} from './userSlice';
import producer, {producerState} from './producerSlice';
import basket, {basketState} from './basketSlice';
import food, {foodState} from './foodSlice';

export const globalState = {
  user: userState,
  producer: producerState,
  basket: basketState,
  food: foodState,
};

export const globalReducer = {user, producer, basket, food};

const rootReducer = combineReducers(globalReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

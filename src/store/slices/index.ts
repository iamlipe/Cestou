import {combineReducers} from '@reduxjs/toolkit';

import user, {userState} from './userSlice';
import producer, {producerState} from './producerSlice';
import basket, {basketState} from './basketSlice';

export const globalState = {
  user: userState,
  producer: producerState,
  basket: basketState,
};

export const globalReducer = {user, producer, basket};

const rootReducer = combineReducers(globalReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

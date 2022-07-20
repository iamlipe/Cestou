import {combineReducers} from '@reduxjs/toolkit';

import user, {userState} from './userSlice';

export const globalState = {user: userState};

export const globalReducer = {user};

const rootReducer = combineReducers(globalReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

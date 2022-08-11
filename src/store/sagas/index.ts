import {all} from 'redux-saga/effects';

import userSaga from './userSaga';
import producerSaga from './producerSaga';
import basketSaga from './basketSaga';
import foodSaga from './foodSaga';

function* rootSaga() {
  yield all([userSaga(), producerSaga(), basketSaga(), foodSaga()]);
}

export default rootSaga;

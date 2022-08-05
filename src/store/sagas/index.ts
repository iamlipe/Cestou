import {all} from 'redux-saga/effects';

import userSaga from './userSaga';
import producerSaga from './producerSaga';
import basketSaga from './basketSaga';
import foodSaga from './foodSaga';
import consumerSaga from './consumerSaga';

function* rootSaga() {
  yield all([
    userSaga(),
    producerSaga(),
    basketSaga(),
    foodSaga(),
    consumerSaga(),
  ]);
}

export default rootSaga;

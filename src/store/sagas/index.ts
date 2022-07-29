import {all} from 'redux-saga/effects';

import userSaga from './userSaga';
import producerSaga from './producerSaga';
import basketSaga from './basketSaga';

function* rootSaga() {
  yield all([userSaga(), producerSaga(), basketSaga()]);
}

export default rootSaga;

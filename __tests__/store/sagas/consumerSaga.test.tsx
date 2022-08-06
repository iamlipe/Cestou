import api from '@/config/services/api';
import {runSaga, Saga} from 'redux-saga';

import {apiReturnConsumerBasketSuccessMock} from '@__mocks__/mockConsumerBasket';
import {getConsumerBasket} from '@/store/sagas/consumerSaga';
import {
  GET_CONSUMER_BASKET_FAILURE,
  GET_CONSUMER_BASKET_SUCCESS,
} from '@/store/slices/consumerSlice';

describe('consumerSaga', () => {
  test('should return basket consumer', async () => {
    const get = api.get as jest.Mock;
    const dispatchedAction: any[] = [];

    get.mockResolvedValueOnce(apiReturnConsumerBasketSuccessMock);

    await runSaga(
      {
        dispatch: action => dispatchedAction.push(action),
      },
      getConsumerBasket as unknown as Saga,
      {
        payload: undefined,
      },
    ).toPromise();

    expect(api.get).toHaveBeenCalledWith(`/consumers/get-consumer-basket`);

    expect(dispatchedAction).toContainEqual(
      GET_CONSUMER_BASKET_SUCCESS({
        data: apiReturnConsumerBasketSuccessMock.data,
        status: apiReturnConsumerBasketSuccessMock.status,
      }),
    );
  });

  test('should not return basket consumer if consumer dont have signup one', async () => {
    const notFound = {
      statusCode: 400,
      error: 'Basket not found',
    };

    const get = api.get as jest.Mock;
    const dispatchedAction: any[] = [];

    get.mockRejectedValueOnce(notFound);

    await runSaga(
      {
        dispatch: action => dispatchedAction.push(action),
      },
      getConsumerBasket as unknown as Saga,
      {
        payload: undefined,
      },
    ).toPromise();

    expect(dispatchedAction).toContainEqual(
      GET_CONSUMER_BASKET_FAILURE({
        error: notFound,
      }),
    );
  });
});

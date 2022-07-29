import api from '@/config/services/api';
import {getBaskets} from '@/store/sagas/basketSaga';
import {
  BasketResponse,
  GET_BASKET_FAILURE,
  GET_BASKET_SUCCESS,
} from '@/store/slices/basketSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {apiReturnBasketSuccessMock} from '@__mocks__/mockBasket';
import {runSaga, Saga} from 'redux-saga';

describe('basketSaga', () => {
  test('should return all baskets', async () => {
    const get = api.get as jest.Mock;
    const dispatchedAction: any[] = [];

    get.mockResolvedValueOnce(apiReturnBasketSuccessMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<BasketResponse[]>) =>
          dispatchedAction.push(action),
      },
      getBaskets as unknown as Saga,
      {payload: undefined},
    ).toPromise();

    expect(api.get).toHaveBeenCalledWith('/baskets/list/');

    expect(dispatchedAction).toContainEqual(
      GET_BASKET_SUCCESS({
        allBaskets: apiReturnBasketSuccessMock.data,
        status: apiReturnBasketSuccessMock.status,
      }),
    );
  });

  test('should not return any basket', async () => {
    const get = api.get as jest.Mock;
    const dispatchedAction: any[] = [];

    get.mockRejectedValueOnce({statusCode: 401, message: 'unauthorized'});

    await runSaga(
      {
        dispatch: (action: PayloadAction<BasketResponse[]>) =>
          dispatchedAction.push(action),
      },
      getBaskets as unknown as Saga,
      {payload: undefined},
    ).toPromise();

    expect(api.get).toHaveBeenCalledWith('/baskets/list/');

    expect(dispatchedAction).toContainEqual(
      GET_BASKET_FAILURE({
        error: {statusCode: 401, message: 'unauthorized'},
      }),
    );
  });
});

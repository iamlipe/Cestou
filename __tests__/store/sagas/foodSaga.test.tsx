import api from '@/config/services/api';
import {PayloadAction} from '@reduxjs/toolkit';
import {runSaga, Saga} from 'redux-saga';

import {
  FoodBasketRequest,
  GET_FOODS_BASKET_FAILURE,
  GET_FOODS_BASKET_SUCCESS,
} from '@/store/slices/foodSlice';

import {BasketProducerRequest} from '@/store/slices/basketSlice';

import {getFoodsBasket} from '@/store/sagas/foodSaga';

import {
  apiReturnFoodBasketSuccessMock,
  invalidGetFoodBasketRequest,
  validGetFoodBasketRequest,
} from '@__mocks__/mockFoodBasket';

describe('foodSaga', () => {
  test('should return all foods basket if params is valid', async () => {
    const get = api.get as jest.Mock;
    const dispatchedAction: PayloadAction<FoodBasketRequest>[] = [];

    get.mockResolvedValueOnce(apiReturnFoodBasketSuccessMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<FoodBasketRequest>) =>
          dispatchedAction.push(action),
      },
      getFoodsBasket as unknown as Saga<[{payload: FoodBasketRequest}]>,
      {
        payload: validGetFoodBasketRequest,
      },
    ).toPromise();

    expect(api.get).toHaveBeenCalledWith(
      `/baskets/basket/${validGetFoodBasketRequest.id}`,
    );

    expect(dispatchedAction).toContainEqual(
      GET_FOODS_BASKET_SUCCESS({
        data: apiReturnFoodBasketSuccessMock.data,
        status: apiReturnFoodBasketSuccessMock.status,
      }),
    );
  });

  test('should not return foods basket if params is invalid', async () => {
    const notFound = {
      statusCode: 400,
      error: 'Basket not found',
    };
    const get = api.get as jest.Mock;
    const dispatchedAction: PayloadAction<FoodBasketRequest>[] = [];

    get.mockRejectedValueOnce(notFound);

    await runSaga(
      {
        dispatch: (action: PayloadAction<FoodBasketRequest>) =>
          dispatchedAction.push(action),
      },
      getFoodsBasket as unknown as Saga<[{payload: FoodBasketRequest}]>,
      {
        payload: invalidGetFoodBasketRequest,
      },
    ).toPromise();

    expect(api.get).toHaveBeenCalledWith(
      `/baskets/basket/${invalidGetFoodBasketRequest.id}`,
    );

    expect(dispatchedAction).toContainEqual(
      GET_FOODS_BASKET_FAILURE({
        error: notFound,
      }),
    );
  });
});

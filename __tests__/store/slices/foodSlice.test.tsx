import reducer, {
  GET_FOODS_BASKET,
  GET_FOODS_BASKET_SUCCESS,
  GET_FOODS_BASKET_FAILURE,
} from '@/store/slices/foodSlice';

import {
  validGetFoodBasketRequest,
  apiReturnFoodBasketSuccessMock,
} from '@__mocks__/mockFoodBasket';

describe('basketSlice', () => {
  test('should return the initial state', () => {
    const reducerInitial = reducer(undefined, {type: undefined});

    expect(reducerInitial).toEqual({
      isLoading: false,
      error: null,
      statusCode: null,
      allFoods: null,
      foodsBasket: null,
    });
  });

  test('should handle GET_FOODS_BASKET', () => {
    const reducerGetFoodsBasket = reducer(
      undefined,
      GET_FOODS_BASKET(validGetFoodBasketRequest),
    );

    expect(reducerGetFoodsBasket).toEqual({
      isLoading: true,
      error: null,
      statusCode: null,
      allFoods: null,
      foodsBasket: null,
    });
  });

  test('should handle GET_FOODS_BASKET_SUCCESS', () => {
    const reducerGetFoodsBasketSuccess = reducer(
      undefined,
      GET_FOODS_BASKET_SUCCESS({
        data: apiReturnFoodBasketSuccessMock.data,
        status: apiReturnFoodBasketSuccessMock.status,
      }),
    );

    expect(reducerGetFoodsBasketSuccess).toEqual({
      isLoading: false,
      error: null,
      statusCode: apiReturnFoodBasketSuccessMock.status,
      allFoods: null,
      foodsBasket: apiReturnFoodBasketSuccessMock.data,
    });
  });

  test('should handle GET_FOODS_BASKET_FAILURE', () => {
    const reducerGetFoodsBasketFailure = reducer(
      undefined,
      GET_FOODS_BASKET_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerGetFoodsBasketFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      statusCode: null,
      allFoods: null,
      foodsBasket: null,
    });
  });
});

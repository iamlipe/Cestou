import reducer, {
  GET_CONSUMER_BASKET,
  GET_CONSUMER_BASKET_SUCCESS,
  GET_CONSUMER_BASKET_FAILURE,
} from '@/store/slices/consumerSlice';

import {apiReturnConsumerBasketSuccessMock} from '@__mocks__/mockConsumerBasket';

describe('basketSlice', () => {
  test('should return the initial state', () => {
    const reducerInitial = reducer(undefined, {type: undefined});

    expect(reducerInitial).toEqual({
      isLoading: false,
      error: null,
      statusCode: null,
      consumerBasket: null,
    });
  });

  test('should handle GET_CONSUMER_BASKET', () => {
    const reducerGetConsumerBasket = reducer(undefined, GET_CONSUMER_BASKET());

    expect(reducerGetConsumerBasket).toEqual({
      isLoading: true,
      error: null,
      statusCode: null,
      consumerBasket: null,
    });
  });

  test('should handle GET_CONSUMER_BASKET_SUCCESS', () => {
    const reducerGetConsumerBasketSuccess = reducer(
      undefined,
      GET_CONSUMER_BASKET_SUCCESS({
        data: apiReturnConsumerBasketSuccessMock.data,
        status: apiReturnConsumerBasketSuccessMock.status,
      }),
    );

    expect(reducerGetConsumerBasketSuccess).toEqual({
      isLoading: false,
      error: null,
      statusCode: apiReturnConsumerBasketSuccessMock.status,
      consumerBasket: apiReturnConsumerBasketSuccessMock.data,
    });
  });

  test('should handle GET_CONSUMER_BASKET_FAILURE', () => {
    const reducerGetConsumerBasketFailure = reducer(
      undefined,
      GET_CONSUMER_BASKET_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerGetConsumerBasketFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      statusCode: null,
      consumerBasket: null,
    });
  });
});

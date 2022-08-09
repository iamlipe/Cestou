import reducer, {
  GET_BASKET,
  GET_BASKET_SUCCESS,
  GET_BASKET_FAILURE,
  SIGNUP_PRODUCER_BASKET,
  SIGNUP_PRODUCER_BASKET_FAILURE,
  SIGNUP_PRODUCER_BASKET_SUCCESS,
  SIGNUP_CONSUMER_BASKET,
  SIGNUP_CONSUMER_BASKET_SUCCESS,
  SIGNUP_CONSUMER_BASKET_FAILURE,
  GET_BASKET_PRODUCER_FAILURE,
  GET_BASKET_PRODUCER_SUCCESS,
  GET_BASKET_PRODUCER,
  GET_CONSUMER_BASKET,
  GET_CONSUMER_BASKET_SUCCESS,
  GET_CONSUMER_BASKET_FAILURE,
  REMOVE_FOOD_BASKET,
  REMOVE_FOOD_BASKET_SUCCESS,
  REMOVE_FOOD_BASKET_FAILURE,
} from '@/store/slices/basketSlice';

import {
  apiReturnBasketProducerSuccessMock,
  apiReturnBasketSuccessMock,
  apiReturnConsumerBasketSuccessMock,
  invalidRemovedFoodsBasket,
  validGetBasketProducer,
  validSignupBasketConsumer,
  validSignupBasketProducer,
} from '@__mocks__/mockBasket';
import {foodSmallBasketMock} from '@__mocks__/mockFoodBasket';

describe('basketSlice', () => {
  test('should return the initial state', () => {
    const reducerInitial = reducer(undefined, {type: undefined});

    expect(reducerInitial).toEqual({
      isLoading: false,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle GET_BASKET', () => {
    const reducerGetBasket = reducer(undefined, GET_BASKET());

    expect(reducerGetBasket).toEqual({
      isLoading: true,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle GET_BASKET_SUCCESS', () => {
    const reducerGetBasketSuccess = reducer(
      undefined,
      GET_BASKET_SUCCESS({
        allBaskets: apiReturnBasketSuccessMock.data,
        status: apiReturnBasketSuccessMock.status,
      }),
    );

    expect(reducerGetBasketSuccess).toEqual({
      isLoading: false,
      error: null,
      status: 200,

      allBaskets: apiReturnBasketSuccessMock.data,

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle GET_BASKET_FAILURE', () => {
    const reducerGetBasketFailure = reducer(
      undefined,
      GET_BASKET_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerGetBasketFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle SIGNUP_PRODUCER_BASKET', () => {
    const reducerSignupProducerBasket = reducer(
      undefined,
      SIGNUP_PRODUCER_BASKET(validSignupBasketProducer),
    );

    expect(reducerSignupProducerBasket).toEqual({
      isLoading: true,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle SIGNUP_PRODUCER_BASKET_SUCCESS', () => {
    const reducerSignupProducerBasketSuccess = reducer(
      undefined,
      SIGNUP_PRODUCER_BASKET_SUCCESS(),
    );

    expect(reducerSignupProducerBasketSuccess).toEqual({
      isLoading: false,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle SIGNUP_PRODUCER_BASKET_FAILURE', () => {
    const reducerSignupProducerBasketFailure = reducer(
      undefined,
      SIGNUP_PRODUCER_BASKET_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerSignupProducerBasketFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle SIGNUP_CONSUMER_BASKET', () => {
    const reducerSignupConsumerBasket = reducer(
      undefined,
      SIGNUP_CONSUMER_BASKET(validSignupBasketConsumer),
    );

    expect(reducerSignupConsumerBasket).toEqual({
      isLoading: true,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle SIGNUP_CONSUMER_BASKET_SUCCESS', () => {
    const reducerSignupConsumerBasketSuccess = reducer(
      undefined,
      SIGNUP_CONSUMER_BASKET_SUCCESS(),
    );

    expect(reducerSignupConsumerBasketSuccess).toEqual({
      isLoading: false,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: true,
      basketProducer: null,
    });
  });

  test('should handle SIGNUP_CONSUMER_BASKET_FAILURE', () => {
    const reducerSignupConsumerBasketFailure = reducer(
      undefined,
      SIGNUP_CONSUMER_BASKET_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerSignupConsumerBasketFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle GET_BASKET_PRODUCER', () => {
    const reducerGetBasket = reducer(
      undefined,
      GET_BASKET_PRODUCER(validGetBasketProducer),
    );

    expect(reducerGetBasket).toEqual({
      isLoading: true,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle GET_BASKET_PRODUCER_SUCCESS', () => {
    const reducerGetBasketSuccess = reducer(
      undefined,
      GET_BASKET_PRODUCER_SUCCESS({
        data: apiReturnBasketProducerSuccessMock.data[0],
        status: apiReturnBasketProducerSuccessMock.status,
      }),
    );

    expect(reducerGetBasketSuccess).toEqual({
      isLoading: false,
      error: null,
      status: apiReturnBasketProducerSuccessMock.status,

      allBaskets: [],

      canSignupBasketConsumer: true,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: apiReturnBasketProducerSuccessMock.data[0],
    });
  });

  test('should handle GET_BASKET_PRODUCER_FAILURE', () => {
    const reducerGetBasketFailure = reducer(
      undefined,
      GET_BASKET_PRODUCER_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerGetBasketFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle GET_CONSUMER_BASKET', () => {
    const reducerGetConsumerBasket = reducer(undefined, GET_CONSUMER_BASKET());

    expect(reducerGetConsumerBasket).toEqual({
      isLoading: true,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
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
      status: apiReturnConsumerBasketSuccessMock.status,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: apiReturnConsumerBasketSuccessMock.data,

      canUpdateProducerBasket: false,
      basketProducer: null,
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
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle REMOVE_FOOD_BASKET', () => {
    const reducerRemoveFoodBasket = reducer(
      undefined,
      REMOVE_FOOD_BASKET({
        foodsBasket: foodSmallBasketMock,
        foodsInMyBasket: invalidRemovedFoodsBasket,
      }),
    );

    expect(reducerRemoveFoodBasket).toEqual({
      isLoading: true,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle REMOVE_FOOD_BASKET_SUCCESS', () => {
    const reducerRemoveFoodBasketSuccess = reducer(
      undefined,
      REMOVE_FOOD_BASKET_SUCCESS(),
    );

    expect(reducerRemoveFoodBasketSuccess).toEqual({
      isLoading: false,
      error: null,
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });

  test('should handle REMOVE_FOOD_BASKET_FAILURE', () => {
    const reducerRemoveFoodBasketFailure = reducer(
      undefined,
      REMOVE_FOOD_BASKET_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerRemoveFoodBasketFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      status: null,

      allBaskets: [],

      canSignupBasketConsumer: false,
      basketConsumer: null,

      canUpdateProducerBasket: false,
      basketProducer: null,
    });
  });
});

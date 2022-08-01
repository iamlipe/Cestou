import reducer, {
  GET_BASKET,
  GET_BASKET_SUCCESS,
  GET_BASKET_FAILURE,
  SIGNUP_PRODUCER_BASKET,
  SIGNUP_PRODUCER_BASKET_FAILURE,
  SIGNUP_PRODUCER_BASKET_SUCCESS,
} from '@/store/slices/basketSlice';
import {
  apiReturnBasketSuccessMock,
  validSignupBasketProducer,
} from '@__mocks__/mockBasket';

describe('basketSlice', () => {
  test('should return the initial state', () => {
    const reducerInitial = reducer(undefined, {type: undefined});

    expect(reducerInitial).toEqual({
      isLoading: false,
      error: null,
      status: null,
      allBaskets: [],
    });
  });

  test('should handle GET_BASKET', () => {
    const reducerGetBasket = reducer(undefined, GET_BASKET());

    expect(reducerGetBasket).toEqual({
      isLoading: true,
      error: null,
      status: null,
      allBaskets: [],
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
    });
  });
});

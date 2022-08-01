import reducer, {
  GET_PRODUCER,
  GET_PRODUCER_SUCCESS,
  GET_PRODUCER_FAILURE,
  GET_PRODUCER_BASKET,
  GET_PRODUCER_BASKET_SUCCESS,
  GET_PRODUCER_BASKET_FAILURE,
} from '@/store/slices/producerSlice';
import {
  producerBasketsMock,
  producerMock,
  validProducerID,
} from '@__mocks__/mockProducer';

describe('producerSlice', () => {
  test('should return the initial state', () => {
    const reducerInitial = reducer(undefined, {type: undefined});

    expect(reducerInitial).toEqual({
      isLoading: false,
      error: null,
      status: null,
      producer: null,
      producerBasket: null,
    });
  });

  test('should handle GET_PRODUCER', () => {
    const reducerGetProducer = reducer(
      undefined,
      GET_PRODUCER(validProducerID),
    );

    expect(reducerGetProducer).toEqual({
      isLoading: true,
      error: null,
      status: null,
      producer: null,
      producerBasket: null,
    });
  });

  test('should handle GET_PRODUCER_SUCCESS', () => {
    const reducerGetProducerSuccess = reducer(
      undefined,
      GET_PRODUCER_SUCCESS({producer: producerMock, status: 200}),
    );

    expect(reducerGetProducerSuccess).toEqual({
      isLoading: false,
      error: null,
      status: 200,
      producer: producerMock,
      producerBasket: null,
    });
  });

  test('should handle GET_PRODUCER_FAILURE', () => {
    const reducerGetProducerFailure = reducer(
      undefined,
      GET_PRODUCER_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerGetProducerFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      status: null,
      producer: null,
      producerBasket: null,
    });
  });

  test('should handle GET_PRODUCER_BASKET', () => {
    const reducerGetProducerBasket = reducer(undefined, GET_PRODUCER_BASKET());

    expect(reducerGetProducerBasket).toEqual({
      isLoading: true,
      error: null,
      status: null,
      producer: null,
      producerBasket: null,
    });
  });

  test('should handle GET_PRODUCER_BASKET_SUCCESS', () => {
    const reducerGetProducerBasketSuccess = reducer(
      undefined,
      GET_PRODUCER_BASKET_SUCCESS({baskets: producerBasketsMock, status: 200}),
    );

    expect(reducerGetProducerBasketSuccess).toEqual({
      isLoading: false,
      error: null,
      status: 200,
      producer: null,
      producerBasket: producerBasketsMock,
    });
  });

  test('should handle GET_PRODUCER_BASKET_FAILURE', () => {
    const reducerGetProducerBasketFailure = reducer(
      undefined,
      GET_PRODUCER_BASKET_FAILURE({error: 'something went wrong'}),
    );

    expect(reducerGetProducerBasketFailure).toEqual({
      isLoading: false,
      error: 'something went wrong',
      status: null,
      producer: null,
      producerBasket: null,
    });
  });
});

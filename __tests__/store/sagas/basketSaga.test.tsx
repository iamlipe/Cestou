import api from '@/config/services/api';
import {getDefaulSize, getDefaultDeliver} from '@/helpers/getDefaulParams';
import {PayloadAction} from '@reduxjs/toolkit';

import {runSaga, Saga} from 'redux-saga';
import {
  getBasketProducer,
  getBaskets,
  signupConsumerBasket,
  signupProducerBasket,
} from '@/store/sagas/basketSaga';

import {
  BasketResponse,
  GET_BASKET_FAILURE,
  GET_BASKET_SUCCESS,
  SIGNUP_PRODUCER_BASKET_SUCCESS,
  SIGNUP_PRODUCER_BASKET_FAILURE,
  SignupProducerBasketRequest,
  SignupConsumerBasketRequest,
  SIGNUP_CONSUMER_BASKET_SUCCESS,
  SIGNUP_CONSUMER_BASKET_FAILURE,
  BasketProducerRequest,
  GET_BASKET_PRODUCER_SUCCESS,
  GET_BASKET_PRODUCER_FAILURE,
} from '@/store/slices/basketSlice';

import {
  apiReturnBasketProducerSuccessMock,
  apiReturnBasketSuccessMock,
  invalidGetBasketProducer,
  invalidSignupBasketConsumer,
  invalidSignupBasketProducer,
  validGetBasketProducer,
  validSignupBasketConsumer,
  validSignupBasketProducer,
} from '@__mocks__/mockBasket';

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

  test('should signup a basket to producer with a valid basket id', async () => {
    const dispatchedAction: PayloadAction<SignupProducerBasketRequest>[] = [];

    await runSaga(
      {
        dispatch: (action: PayloadAction<SignupProducerBasketRequest>) =>
          dispatchedAction.push(action),
      },
      signupProducerBasket as unknown as Saga<
        [{payload: SignupProducerBasketRequest}]
      >,
      {payload: validSignupBasketProducer},
    ).toPromise();

    expect(api.patch).toHaveBeenCalledWith(
      '/baskets/assign-basket-to-producer',
      validSignupBasketProducer,
    );

    expect(dispatchedAction).toContainEqual(SIGNUP_PRODUCER_BASKET_SUCCESS());
  });

  test('should not signup a basket to producer with a invalid basket id', async () => {
    const notFound = {statusCode: 404, message: 'not found'};
    const patch = api.patch as jest.Mock;
    const dispatchedAction: PayloadAction<SignupProducerBasketRequest>[] = [];

    patch.mockRejectedValueOnce(notFound);

    await runSaga(
      {
        dispatch: (action: PayloadAction<SignupProducerBasketRequest>) =>
          dispatchedAction.push(action),
      },
      signupProducerBasket as unknown as Saga<
        [{payload: SignupProducerBasketRequest}]
      >,
      {payload: invalidSignupBasketProducer},
    ).toPromise();

    expect(api.patch).toHaveBeenCalledWith(
      '/baskets/assign-basket-to-producer',
      invalidSignupBasketProducer,
    );

    expect(dispatchedAction).toContainEqual(
      SIGNUP_PRODUCER_BASKET_FAILURE({
        error: notFound,
      }),
    );
  });

  test('should signup a basket to consumer with a valid basket id', async () => {
    const dispatchedAction: PayloadAction<SignupConsumerBasketRequest>[] = [];

    await runSaga(
      {
        dispatch: (action: PayloadAction<SignupConsumerBasketRequest>) =>
          dispatchedAction.push(action),
      },
      signupConsumerBasket as unknown as Saga<
        [{payload: SignupConsumerBasketRequest}]
      >,
      {payload: validSignupBasketConsumer},
    ).toPromise();

    expect(api.patch).toHaveBeenCalledWith(
      '/baskets/assign-basket-to-consumer',
      validSignupBasketConsumer,
    );

    expect(dispatchedAction).toContainEqual(SIGNUP_CONSUMER_BASKET_SUCCESS());
  });

  test('should not signup a basket to consumer with a invalid basket id', async () => {
    const notFound = {statusCode: 400, message: 'not found'};
    const patch = api.patch as jest.Mock;
    const dispatchedAction: PayloadAction<SignupConsumerBasketRequest>[] = [];

    patch.mockRejectedValueOnce(notFound);

    await runSaga(
      {
        dispatch: (action: PayloadAction<SignupConsumerBasketRequest>) =>
          dispatchedAction.push(action),
      },
      signupConsumerBasket as unknown as Saga<
        [{payload: SignupConsumerBasketRequest}]
      >,
      {payload: invalidSignupBasketConsumer},
    ).toPromise();

    expect(api.patch).toHaveBeenCalledWith(
      '/baskets/assign-basket-to-consumer',
      invalidSignupBasketConsumer,
    );

    expect(dispatchedAction).toContainEqual(
      SIGNUP_CONSUMER_BASKET_FAILURE({
        error: notFound,
      }),
    );
  });

  test('should get basket producer whit a valid params', async () => {
    const get = api.get as jest.Mock;
    const dispatchedAction: PayloadAction<BasketProducerRequest>[] = [];

    get.mockResolvedValueOnce(apiReturnBasketProducerSuccessMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<BasketProducerRequest>) =>
          dispatchedAction.push(action),
      },
      getBasketProducer as unknown as Saga<[{payload: BasketProducerRequest}]>,
      {
        payload: validGetBasketProducer,
      },
    ).toPromise();

    expect(api.get).toHaveBeenCalledWith('/baskets/producers-baskets/', {
      params: {
        daysPerDeliver: getDefaultDeliver(
          validGetBasketProducer.daysPerDeliver,
        ),
        size: getDefaulSize(validGetBasketProducer.size),
      },
    });

    expect(dispatchedAction).toContainEqual(
      GET_BASKET_PRODUCER_SUCCESS({
        data: apiReturnBasketProducerSuccessMock.data[0],
        status: apiReturnBasketProducerSuccessMock.status,
      }),
    );
  });

  test('should not get basket producer whit a invalid params', async () => {
    const notFound = {
      statusCode: 400,
      error: 'Basket not found',
    };
    const get = api.get as jest.Mock;
    const dispatchedAction: PayloadAction<BasketProducerRequest>[] = [];

    get.mockRejectedValueOnce(notFound);

    await runSaga(
      {
        dispatch: (action: PayloadAction<BasketProducerRequest>) =>
          dispatchedAction.push(action),
      },
      getBasketProducer as unknown as Saga<[{payload: BasketProducerRequest}]>,
      {
        payload: invalidGetBasketProducer,
      },
    ).toPromise();

    expect(api.get).toHaveBeenCalledWith('/baskets/producers-baskets/', {
      params: {
        daysPerDeliver: getDefaultDeliver(
          invalidGetBasketProducer.daysPerDeliver,
        ),
        size: getDefaulSize(invalidGetBasketProducer.size),
      },
    });

    expect(dispatchedAction).toContainEqual(
      GET_BASKET_PRODUCER_FAILURE({
        error: notFound,
      }),
    );
  });
});

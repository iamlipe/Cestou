import api from '@/config/services/api';
import {
  getProducer,
  getProducerBaskets,
  registerPix,
} from '@/store/sagas/producerSaga';
import {
  GET_PRODUCER_BASKET_FAILURE,
  GET_PRODUCER_BASKET_SUCCESS,
  GET_PRODUCER_FAILURE,
  GET_PRODUCER_SUCCESS,
  REGISTER_PIX_SUCCESS,
  REGISTER_PIX_FAILURE,
  RegisterPixRequest,
  Producer,
  ProducerRequest,
} from '@/store/slices/producerSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {
  apiReturnBasketErrorMock,
  apiReturnProducerErrorMock,
  apiReturnProducerSuccessMock,
  apiReturnRegisterPixErrorMock,
  invalidProducerID,
  invalidRegisterPix,
  producerBasketsMock,
  producerMock,
  validProducerID,
  validRegisterPix,
} from '@__mocks__/mockProducer';
import {runSaga, Saga} from 'redux-saga';

describe('producerSaga', () => {
  test('should return a producer with a valid id', async () => {
    const post = api.post as jest.Mock;
    const dispatchedAction: PayloadAction<Producer>[] = [];

    post.mockResolvedValueOnce(apiReturnProducerSuccessMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<Producer>) =>
          dispatchedAction.push(action),
      },
      getProducer as unknown as Saga<[{payload: ProducerRequest}]>,
      {payload: validProducerID},
    ).toPromise();

    expect(api.post).toHaveBeenCalledWith(`/producers/${validProducerID.id}/`);

    expect(dispatchedAction).toContainEqual(
      GET_PRODUCER_SUCCESS({producer: producerMock, status: 200}),
    );
  });

  test('should return a error with a invalid id', async () => {
    const post = api.post as jest.Mock;
    const dispatchedAction: PayloadAction<Producer>[] = [];

    post.mockRejectedValueOnce(apiReturnProducerErrorMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<Producer>) =>
          dispatchedAction.push(action),
      },
      getProducer as unknown as Saga<[{payload: ProducerRequest}]>,
      {payload: invalidProducerID},
    ).toPromise();

    expect(api.post).toHaveBeenCalledWith(
      `/producers/${invalidProducerID.id}/`,
    );

    expect(dispatchedAction).toContainEqual(
      GET_PRODUCER_FAILURE({error: apiReturnProducerErrorMock}),
    );
  });

  test('should return baskets producer', async () => {
    const get = api.get as jest.Mock;
    const dispatchedAction: PayloadAction<Producer>[] = [];

    get.mockResolvedValueOnce(apiReturnProducerSuccessMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<Producer>) =>
          dispatchedAction.push(action),
      },
      getProducerBaskets as unknown as Saga,
      {payload: undefined},
    ).toPromise();

    expect(api.get).toHaveBeenCalledWith('/producers/get-producer-baskets');

    expect(dispatchedAction).toContainEqual(
      GET_PRODUCER_BASKET_SUCCESS({baskets: producerBasketsMock, status: 200}),
    );
  });

  test('should not return baskets producer with not authorized producer', async () => {
    const get = api.get as jest.Mock;
    const dispatchedAction: PayloadAction<Producer>[] = [];

    get.mockRejectedValueOnce(apiReturnBasketErrorMock);

    await runSaga(
      {
        dispatch: (action: PayloadAction<Producer>) =>
          dispatchedAction.push(action),
      },
      getProducerBaskets as unknown as Saga,
      {payload: undefined},
    ).toPromise();

    expect(api.get).toHaveBeenCalledWith('/producers/get-producer-baskets');

    expect(dispatchedAction).toContainEqual(
      GET_PRODUCER_BASKET_FAILURE({error: apiReturnBasketErrorMock}),
    );
  });

  test('should register pix key with a valid credentials', async () => {
    const dispatchedActions: any[] = [];

    await runSaga(
      {
        dispatch: action => dispatchedActions.push(action),
      },
      registerPix as unknown as Saga<[{payload: RegisterPixRequest}]>,
      {payload: validRegisterPix},
    ).toPromise();

    expect(api.post).toHaveBeenCalledWith(
      '/producers/pix/set-pix',
      validRegisterPix,
    );
    expect(dispatchedActions).toContainEqual(REGISTER_PIX_SUCCESS());
  });

  test('should not register with a invalid credentials', async () => {
    const post = api.post as jest.Mock;
    const dispatchedActions: any[] = [];

    post.mockRejectedValueOnce(apiReturnRegisterPixErrorMock);

    await runSaga(
      {
        dispatch: action => dispatchedActions.push(action),
      },
      registerPix as unknown as Saga<[{payload: RegisterPixRequest}]>,
      {payload: invalidRegisterPix},
    ).toPromise();

    expect(api.post).toHaveBeenCalledWith(
      '/producers/pix/set-pix',
      invalidRegisterPix,
    );
    expect(dispatchedActions).toContainEqual(
      REGISTER_PIX_FAILURE({error: apiReturnRegisterPixErrorMock}),
    );
  });
});

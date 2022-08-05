import {
  BasketProducerRequest,
  BasketProducerResponse,
  BasketResponse,
  SignupConsumerBasketRequest,
  SignupProducerBasketRequest,
} from '@/store/slices/basketSlice';

export const apiReturnBasketSuccessMock: {
  data: BasketResponse[];
  status: number;
} = {
  data: [
    {
      id: '1',
      size: 'big',
      daysPerDeliver: '7',
      value: 200,
      createdAt: '2022-07-29T19:24:46.516Z',
      updatedAt: '2022-07-29T19:24:46.516Z',
      deletedAt: null,
    },
    {
      id: '2',
      size: 'medium',
      daysPerDeliver: '7',
      value: 160,
      createdAt: '2022-07-29T19:24:46.516Z',
      updatedAt: '2022-07-29T19:24:46.516Z',
      deletedAt: null,
    },
    {
      id: '3',
      size: 'small',
      daysPerDeliver: '7',
      value: 90,
      createdAt: '2022-07-29T19:24:46.516Z',
      updatedAt: '2022-07-29T19:24:46.516Z',
      deletedAt: null,
    },
  ],
  status: 200,
};

export const validSignupBasketProducer: SignupProducerBasketRequest = {
  basketID: '1',
};

export const invalidSignupBasketProducer: SignupProducerBasketRequest = {
  basketID: '-1',
};

export const validSignupBasketConsumer: SignupConsumerBasketRequest = {
  basketID: '1',
  producerID: '1',
};

export const invalidSignupBasketConsumer: SignupConsumerBasketRequest = {
  basketID: '-1',
  producerID: '-1',
};

export const validGetBasketProducer: BasketProducerRequest = {
  daysPerDeliver: 'Quinzenal',
  size: 'Pequena - R$ 45,00',
};

export const invalidGetBasketProducer: BasketProducerRequest = {
  daysPerDeliver: 'invalid',
  size: 'invalid',
};

export const apiReturnBasketProducerSuccessMock: {
  data: BasketProducerResponse[];
  status: number;
} = {
  data: [
    {
      basket_created_at: '2022-04-08T23:21:08.930Z',
      basket_days_per_deliver: '15',
      basket_deleted_at: null,
      basket_id: '4afaa6ab-cc67-4211-8ffa-644e4fa55381',
      basket_size: 'small',
      basket_updated_at: '2022-04-08T23:21:08.930Z',
      basket_value: '70.00',
      user_id: '1b01aecd-e112-4c67-86db-717da11e0edd',
    },
  ],
  status: 200,
};

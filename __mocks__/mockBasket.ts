import {
  BasketResponse,
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

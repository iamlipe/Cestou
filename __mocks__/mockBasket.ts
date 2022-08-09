import {
  BasketConsumerResponse,
  BasketFoodQuantity,
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
      value: '200',
      createdAt: '2022-07-29T19:24:46.516Z',
      updatedAt: '2022-07-29T19:24:46.516Z',
      deletedAt: null,
    },
    {
      id: '2',
      size: 'medium',
      daysPerDeliver: '7',
      value: '160',
      createdAt: '2022-07-29T19:24:46.516Z',
      updatedAt: '2022-07-29T19:24:46.516Z',
      deletedAt: null,
    },
    {
      id: '3',
      size: 'small',
      daysPerDeliver: '7',
      value: '90',
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

export const apiReturnConsumerBasketSuccessMock: {
  data: BasketConsumerResponse;
  status: number;
} = {
  data: {
    basketID: {
      id: '1',
      daysPerDeliver: '7',
      size: 'big',
      value: '0.00',
      createdAt: '2022-04-08T23:22:52.622Z',
      updatedAt: '2022-04-08T23:22:52.622Z',
      deletedAt: null,
    },
    basketProducerID: {
      balance: '0.00',
      cpfPix: null,
      emailPix: null,
      phonePix: null,
      randomPix: null,
      userID: {
        id: '1',
        firstName: 'José',
        lastName: null,
        email: null,
        phone: '86828282828',
        cpf: null,
        userType: 'producer',
        created_at: '1',
        updated_at: '2022-04-26T03:37:55.745Z',
        deleted_at: null,
      },
    },
  },
  status: 200,
};

export const validRemovedFoodsBasket: BasketFoodQuantity = {
  spices: 1,
  vegetables: 1,
  leaves: 1,
  fruits: 1,
};

export const invalidRemovedFoodsBasket: BasketFoodQuantity = {
  spices: 1000,
  vegetables: 1000,
  leaves: 1000,
  fruits: 1000,
};

export const validRemovedFoodBasket = [
  {foodID: 'cedf512a-5383-4502-bab5-49c6b58eb17f', quantity: 0},
  {foodID: '4cbd5c43-5dc7-4489-8e46-e9b94cbb9e67', quantity: 1},
  {foodID: 'ac3786ee-4001-44c7-a331-e926dc4074fe', quantity: 1},
  {foodID: '3df12342-435d-49d9-87ba-db598794b52b', quantity: 2},
];

export const invalidRemovedFoodBasket = [
  {foodID: 'cedf512a-5383-4502-bab5-49c6b58eb17f', quantity: -999},
  {foodID: '4cbd5c43-5dc7-4489-8e46-e9b94cbb9e67', quantity: -998},
  {foodID: 'ac3786ee-4001-44c7-a331-e926dc4074fe', quantity: -998},
  {foodID: '3df12342-435d-49d9-87ba-db598794b52b', quantity: -997},
];

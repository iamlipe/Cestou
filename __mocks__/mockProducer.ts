import {
  Producer,
  ProducerBasket,
  ProducerBasketResponse,
} from '@/store/slices/producerSlice';

export const validProducerID = {
  id: '1',
};

export const invalidProducerID = {
  id: '-1',
};

export const apiReturnProducerSuccessMock: {
  data: ProducerBasketResponse;
  status: number;
} = {
  data: {
    userID: {
      id: '1',
      firstName: 'bob',
      lastName: 'lee',
      userType: 'producer',
      email: 'bob@email.com',
      phone: '+5511999999999',
      cpf: null,
    },
    cpfPix: '12345678901',
    emailPix: 'bob@email.com',
    phonePix: '+5511999999999',
    randomPix: 'jkln129123mkjj11',
    balance: 0,
    bigBasket: {
      id: '1',
      size: 'big',
      daysPerDeliver: '7',
      value: 200,
      createdAt: '2022-07-29T19:24:46.516Z',
      updatedAt: '2022-07-29T19:24:46.516Z',
      deletedAt: null,
    },
    mediumBasket: {
      id: '2',
      size: 'medium',
      daysPerDeliver: '7',
      value: 160,
      createdAt: '2022-07-29T19:24:46.516Z',
      updatedAt: '2022-07-29T19:24:46.516Z',
      deletedAt: null,
    },
    smallBasket: {
      id: '3',
      size: 'small',
      daysPerDeliver: '7',
      value: 90,
      createdAt: '2022-07-29T19:24:46.516Z',
      updatedAt: '2022-07-29T19:24:46.516Z',
      deletedAt: null,
    },
  },
  status: 200,
};

export const apiReturnProducerErrorMock = {
  statusCode: 404,
  message: 'not found',
};

export const producerMock: Producer = {
  cpfPix: '12345678901',
  emailPix: 'bob@email.com',
  phonePix: '+5511999999999',
  randomPix: 'jkln129123mkjj11',
  balance: 0,
};

export const producerBasketsMock: ProducerBasket = {
  bigBasket: {
    id: '1',
    size: 'big',
    daysPerDeliver: '7',
    value: 200,
    createdAt: '2022-07-29T19:24:46.516Z',
    updatedAt: '2022-07-29T19:24:46.516Z',
    deletedAt: null,
  },
  mediumBasket: {
    id: '2',
    size: 'medium',
    daysPerDeliver: '7',
    value: 160,
    createdAt: '2022-07-29T19:24:46.516Z',
    updatedAt: '2022-07-29T19:24:46.516Z',
    deletedAt: null,
  },
  smallBasket: {
    id: '3',
    size: 'small',
    daysPerDeliver: '7',
    value: 90,
    createdAt: '2022-07-29T19:24:46.516Z',
    updatedAt: '2022-07-29T19:24:46.516Z',
    deletedAt: null,
  },
};

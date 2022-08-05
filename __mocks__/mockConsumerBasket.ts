import {ConsumerBasketResponse} from '@/store/slices/consumerSlice';

export const apiReturnConsumerBasketSuccessMock: {
  data: ConsumerBasketResponse;
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

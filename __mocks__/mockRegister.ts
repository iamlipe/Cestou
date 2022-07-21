import {RegisterRequest} from '@/store/slices/userSlice';

export const registerValidPayload: RegisterRequest = {
  firstName: 'Reece',
  lastName: 'James',
  email: 'reecejames@email.com',
  password: 'password',
  userType: 'consumer',
};

export const registerInvalidPayload: RegisterRequest = {
  firstName: 'namenotvalid',
  lastName: 'lastnamenotvalid',
  email: 'emailnotvalid@email.com',
  password: 'passwordnotvalid',
  userType: 'hacker',
};

export const apiReturnSuccessRegisterMock = {
  data: {
    id: '1',
    firstName: 'Reece',
    lastName: 'James',
    userType: 'consumer',
    email: 'reecejames@email.com',
    phone: null,
    cpf: null,
    createdAt: '2022-07-20T20:16:11.925Z',
    updatedAt: '2022-07-20T20:16:11.925Z',
  },
};

export const apiReturnErrorRegisterMock = {
  statusCode: 400,
  message: 'bad request',
};

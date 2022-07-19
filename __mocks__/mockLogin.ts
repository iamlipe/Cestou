import {LoginRequest, LoginResponse, User} from '@/store/slices/userSlice';

export const loginValidPayload: LoginRequest = {
  phoneOrEmail: 'bob@mail.com',
  password: '123456',
};

export const loginInvalidPayload: LoginRequest = {
  phoneOrEmail: 'noemailvalid@email.com',
  password: 'notvalidpassword',
};

export const apiReturnSuccessMock: {data: LoginResponse} = {
  data: {
    id: '1',
    first_name: 'Bob',
    last_name: 'smith',
    user_type: 'consumer',
    email: 'bob@mail.comm',
    phone: null,
    cpf: null,
    password: 'password_hash',
    token: 'token_hash',
    refresh_token: 'refresh_token_hash',
    created_at: '2022-07-08T17:29:38.595Z',
    updated_at: '2022-07-15T19:26:18.047Z',
    deleted_at: null,
  },
};

export const apiReturnErrorMock = {
  statusCode: 401,
  message: 'Unauthorized',
};

export const userMock: User = {
  id: apiReturnSuccessMock.data.id,
  firstName: apiReturnSuccessMock.data.first_name,
  lastName: apiReturnSuccessMock.data.last_name,
  email: apiReturnSuccessMock.data.email,
  phone: apiReturnSuccessMock.data.phone,
  token: apiReturnSuccessMock.data.token,
  refreshToken: apiReturnSuccessMock.data.refresh_token,
};

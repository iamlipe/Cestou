import {LoginRequest, LoginResponse, User} from '@/store/slices/userSlice';

export const loginValidPayload: LoginRequest = {
  phoneOrEmail: 'bob@mail.com',
  password: '123456',
};

export const loginInvalidPayload: LoginRequest = {
  phoneOrEmail: 'emailnotvalid@email.com',
  password: 'passwordnotvalid',
};

export const apiReturnLoginSuccessMock: {data: LoginResponse} = {
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

export const apiReturnLoginErrorMock = {
  statusCode: 401,
  message: 'Unauthorized',
};

export const userMock: User = {
  id: apiReturnLoginSuccessMock.data.id,
  firstName: apiReturnLoginSuccessMock.data.first_name,
  lastName: apiReturnLoginSuccessMock.data.last_name,
  email: apiReturnLoginSuccessMock.data.email,
  userType: apiReturnLoginSuccessMock.data.user_type,
  phone: apiReturnLoginSuccessMock.data.phone,
  token: apiReturnLoginSuccessMock.data.token,
  refreshToken: apiReturnLoginSuccessMock.data.refresh_token,
};

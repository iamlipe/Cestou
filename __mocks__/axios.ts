const axios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  cancelToken: {
    source: jest.fn(),
  },
  create: () => axios,
  defaults: {
    adapter: {},
    headers: {
      common: {},
    },
  },
};

export default axios;

const test = {
  producer: {
    balance: '0',
    cpfPix: '12345678901',
    emailPix: 'bob@email.com',
    phonePix: '+5511999999999',
    randomPix: 'jkln129123mkjj11',
  },
  status: 200,
};

const test2 = {
  producer: {
    balance: 0,
    cpfPix: '12345678901',
    emailPix: 'bob@email.com',
    phonePix: '+5511999999999',
    randomPix: 'jkln129123mkjj11',
  },
  status: 200,
};

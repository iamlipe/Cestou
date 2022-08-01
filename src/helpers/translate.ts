export const translateBasketToPortuguese = (basket: string): string => {
  switch (basket) {
    case 'big':
      return 'grande';
    case 'medium':
      return 'médio';
    case 'small':
      return 'pequeno';
    default:
      return basket;
  }
};

export const translateBasketToEnglish = (basket: string): string => {
  switch (basket) {
    case 'Grande':
      return 'big';
    case 'Média':
      return 'medium';
    case 'Pequena':
      return 'small';
    default:
      return basket;
  }
};

export const translatePixType = (
  type: string,
): 'cpf' | 'email' | 'phone' | 'random' | undefined => {
  switch (type) {
    case 'CPF':
      return 'cpf';
    case 'E-mail':
      return 'email';
    case 'Celular':
      return 'phone';
    case 'Chave aleatória':
      return 'random';
    default:
      return undefined;
  }
};

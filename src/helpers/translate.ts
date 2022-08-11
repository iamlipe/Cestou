export const translateBasketToPortuguese = (basket: string): string => {
  switch (basket) {
    case 'big':
      return 'grande';
    case 'medium':
      return 'média';
    case 'small':
      return 'pequena';
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
    case 'Celular' || 'Phone':
      return 'phone';
    case 'Chave aleatória' || 'Random key':
      return 'random';
    default:
      return undefined;
  }
};

export const translateFoodToPortuguese = (food: string): string => {
  switch (food) {
    case 'spices':
      return 'Temperos';
    case 'leaves':
      return 'Verduras';
    case 'vegetables':
      return 'Legumes';
    case 'fruits':
      return 'Frutas';
    case 'processed':
      return 'Processados';
    default:
      return food;
  }
};

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

export const getDefaulSize = (size: string) => {
  if (size.startsWith('P')) {
    return 'small';
  }

  if (size.startsWith('M')) {
    return 'medium';
  }

  if (size.startsWith('G')) {
    return 'big';
  }
};

export const getDefaultDeliver = (daysPerDeliver: string) => {
  if (daysPerDeliver.startsWith('S')) {
    return '7';
  }

  if (daysPerDeliver.startsWith('Q')) {
    return '15';
  }
};

export const getDefaulSize = (size: string) => {
  if (size.startsWith('P') || size.startsWith('S')) {
    return 'small';
  }

  if (size.startsWith('M')) {
    return 'medium';
  }

  if (size.startsWith('G') || size.startsWith('L')) {
    return 'big';
  }
};

export const getDefaultDeliver = (daysPerDeliver: string) => {
  if (daysPerDeliver.startsWith('S') || daysPerDeliver.startsWith('W')) {
    return '7';
  }

  if (daysPerDeliver.startsWith('Q') || daysPerDeliver.startsWith('F')) {
    return '15';
  }
};

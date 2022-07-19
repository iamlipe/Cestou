import {RFValue} from 'react-native-responsive-fontsize';

const SIZING = {
  MINOR: `${RFValue(10)}px`,
  SMALLEST: `${RFValue(12)}px`,
  SMALLER: `${RFValue(14)}px`,
  SMALL: `${RFValue(16)}px`,
  MEDIUM: `${RFValue(18)}px`,
  LARGE: `${RFValue(20)}px`,
  LARGER: `${RFValue(22)}px`,
  LARGEST: `${RFValue(24)}px`,
};

export type SIZING_TYPE = typeof SIZING;

export default SIZING;

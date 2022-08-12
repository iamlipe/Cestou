import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import pt from './pt.json';
import en from './en.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {pt, en},
  lng: 'en',
  react: {useSuspense: false},
  interpolation: {escapeValue: false},
});

export default i18next;

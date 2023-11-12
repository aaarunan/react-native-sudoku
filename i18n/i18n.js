import en from './locales/en';
import no from './locales/no';

import I18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import  {getLocales } from 'react-native-localize';

const languages = {
  en: {nativeName: 'English'},
  no: {nativeName: 'Norsk'},
}

const i18n = I18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: 'no',
  resources: {
    en,
    no,
  },
});
 
 
export default i18n;
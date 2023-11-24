import en from './locales/en';
import no from './locales/no';

import I18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const languages = {
    en: {nativeName: 'English'},
    no: {nativeName: 'Norsk'},
}

const i18n = I18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en,
        no,
    },
    interpolation: {
        escapeValue: false 
    },
});


export default i18n;
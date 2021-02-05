import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "../../../public/locales/en/translation.json";
import translationDE from "../../../public/locales/de/translation.json";
import translationFR from "../../../public/locales/fr/translation.json";
import translationIT from "../../../public/locales/it/translation.json";
import translationBA from "../../../public/locales/ba/translation.json";

const fallbackLng = ["de"];
const availableLanguages = ["en", "de", "fr", "it", "ba"];
const resources = {
    en: {
        translation: translationEN
    },
    de: {
        translation: translationDE
    },
    fr: {
        translation: translationFR
    },
    it: {
        translation: translationIT
    },
    ba: {
        translation: translationBA
    }
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng,

        detection: {
            checkWhitelist: true
        },

        debug: false,

        whitelist: availableLanguages,

        interpolation: {
            escapeValue: false
        }
    });

// i18n.on("languageChanged", lng => {
//     // if the language we switched to is the default language we need to remove the /en from URL
//     if (lng === i18n.options.fallbackLng[0]) {
//         if (
//             window.location.pathname.includes("/" + i18n.options.fallbackLng[0])
//         ) {
//             const newUrl = window.location.pathname.replace(
//                 "/" + i18n.options.fallbackLng[0],
//                 ""
//             );
//             window.location.replace(newUrl);
//         }
//     }
// });

export default i18n;

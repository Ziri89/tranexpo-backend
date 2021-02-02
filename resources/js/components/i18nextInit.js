import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../../../public/locales/en/translation.json";
import translationDE from "../../../public/locales/de/translation.json";
import translationFR from "../../../public/locales/fr/translation.json";
import translationIT from "../../../public/locales/it/translation.json";
import translationBA from "../../../public/locales/ba/translation.json";

let lang = localStorage.getItem("lang");
window.addEventListener("storage", () => {
    lang = localStorage.getItem("lang");
    console.log(lang);
});

const fallbackLng = [lang];
const availableLanguages = ["gb", "de", "fr", "it", "ba"];

const resources = {
    gb: {
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

i18n.use(initReactI18next).init({
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

export default i18n;

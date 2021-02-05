import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./LangBtn.css";

const LangBtn = () => {
    const curLocation = useLocation();
    const history = useHistory();
    const pathnameWithoutLang = curLocation.pathname.split("/").splice(-1);
    //console.log(pathnameWithoutLang[0]);
    const { i18n } = useTranslation();

    const changeLang = ev => {
        i18n.changeLanguage(ev.target.value);
        if (i18n.language !== "de") {
            let newUrl = "/#/" + i18n.language + "/" + pathnameWithoutLang;
            window.location.replace(newUrl);
        } else {
            let newUrl = `/#/${pathnameWithoutLang}`;
            window.location.replace(newUrl);
        }
    };

    return (
        <div className="lang-btn">
            <select onChange={changeLang} value={i18n.language}>
                <option value="de">DE</option>
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="it">IT</option>
                <option value="ba">BA</option>
            </select>
        </div>
    );
};

export default LangBtn;

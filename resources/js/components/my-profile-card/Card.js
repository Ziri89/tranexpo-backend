import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Card(props) {
    const { stateFrom, cityFrom, stateTo, cityTo, date, type } = props;
    const { t, i18n } = useTranslation();
    const linkGenerator = link => {
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };
    return (
        <div className="card">
            <div className="card-body">
                <dl>
                    <dt>{t("ship_from")}:</dt>
                    <dd>
                        {stateFrom}, {cityFrom}
                    </dd>
                    <dt>{t("ship_to")}:</dt>
                    <dd>
                        {stateTo}, {cityTo}
                    </dd>
                    <dt>{t("shipping_date")}</dt>
                    <dd>{date}</dd>
                    <dt>{t("type_of_goods")}</dt>
                    <dd>{type}</dd>
                </dl>
                <Link
                    to={linkGenerator(`/carrier-offers`)}
                    className="btn btn-danger"
                >
                    {t("see_offers")}
                </Link>
            </div>
        </div>
    );
}

export default Card;

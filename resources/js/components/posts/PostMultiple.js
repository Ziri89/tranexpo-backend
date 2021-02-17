import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const ReducedPost = props => {
    const { t, i18n } = useTranslation();
    const linkGenerator = link => {
        // if the current language is the default language dont add the lang prefix
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };
    return (
        <div className="post col-4 mb-4">
            <div className="card">
                <img
                    src={props.image}
                    alt={props.altText}
                    className="card-img-top"
                />
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            {t("shipment_from")}: {props.from}
                        </li>
                        <li className="list-group-item">
                            {t("shipment_to")}: {props.to}
                        </li>
                        <li className="list-group-item">
                            {t("shipping_date")}: {props.date}
                        </li>
                    </ul>
                    <Link
                        to={linkGenerator(`single-post/${props.id}`)}
                        className="btn btn-danger"
                    >
                        {t("see_more")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReducedPost;

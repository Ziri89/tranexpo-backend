import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TravelerMultiplePost = props => {
    const { t, i18n } = useTranslation();
    const linkGenerator = link => {
       
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };
    return (
        <div className="post col-lg-4 mb-4">
            <div className="card">
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            {t("place_of_departure")}: {props.from}
                        </li>
                        <li className="list-group-item">
                            {t("destination")}: {props.to}
                        </li>
                        <li className="list-group-item">
                            {t("departure_date")}: {props.date}
                        </li>
                    </ul>
                    <Link
                        to={linkGenerator(`/traveler-single-post/${props.id}`)}
                        className="btn btn-danger"
                    >
                        {t("see_more")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TravelerMultiplePost;

import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useTranslation } from "react-i18next";

function Offer(props) {
    const { t, i18n } = useTranslation();
    const linkGenerator = link => {
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };
    const {
        name,
        company,
        city,
        zipCode,
        rateNum,
        votersNum,
        priceNum,
        stars
    } = props;
    return (
        <div className="col-12 col-lg-6 d-flex border-bottom mb-3 part">
            <div className="col-5">
                <p className="h5">{name}</p>
                <p className="h6">{company}</p>
                <p className="h6">
                    {zipCode} {city}
                </p>
            </div>
            <div className="col-4">
                <p className="h5">{t("direct_price")}</p>
                <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    value={stars}
                    edit={false}
                />
                <p>
                    <small>
                        {rateNum} - {votersNum} {t("reviews")}
                    </small>
                </p>
            </div>
            <div className="col-3">
                <p className="h5">{priceNum}€</p>
                <Link className="btn btn-danger" to={linkGenerator(`/carrier`)}>
                    {t("see_more")}
                </Link>
            </div>
        </div>
    );
}

export default Offer;

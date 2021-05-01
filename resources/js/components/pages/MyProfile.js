import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Banner from "../header/Banner";
import Storehous_1 from "../../img/storehous_1.jpg";
import "./MyProfile.css";

const MyProfile = () => {
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
        <div className="my-profile">
            <Banner
                image={Storehous_1}
                altText="STrucks"
                title={t("my_profile")}
            />
            <div className="container profile">
                <div className="row">
                    <div className="col-12 mb-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center">
                                    {t("hello")} Sasa Trkulja
                                </h2>
                                <h3 className="text-center">
                                    {t("see_profile")}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <dl>
                                    <dt>{t("ship_from")}:</dt>
                                    <dd>Bosnia and Hertzegovina, Sarajevo</dd>
                                    <dt>{t("ship_to")}:</dt>
                                    <dd>Switzerland, Zurich</dd>
                                    <dt>{t("shipping_date")}</dt>
                                    <dd>04/25/2021</dd>
                                </dl>
                                <Link
                                    to={linkGenerator(`/single-post/some-id`)}
                                    className="btn btn-danger"
                                >
                                    {t("see_more")}
                                </Link>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={
                                        <i className="fa fa-star-half-alt"></i>
                                    }
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    value={4.5}
                                    edit={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <dl>
                                    <dt>{t("ship_from")}:</dt>
                                    <dd>Bosnia and Hertzegovina, Sarajevo</dd>
                                    <dt>{t("ship_to")}:</dt>
                                    <dd>Switzerland, Zurich</dd>
                                    <dt>{t("shipping_date")}</dt>
                                    <dd>04/25/2021</dd>
                                </dl>
                                <Link
                                    to={linkGenerator(`/single-post/some-id`)}
                                    className="btn btn-danger"
                                >
                                    {t("see_more")}
                                </Link>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={
                                        <i className="fa fa-star-half-alt"></i>
                                    }
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    value={4}
                                    edit={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <dl>
                                    <dt>{t("ship_from")}:</dt>
                                    <dd>Bosnia and Hertzegovina, Sarajevo</dd>
                                    <dt>{t("ship_to")}:</dt>
                                    <dd>Switzerland, Zurich</dd>
                                    <dt>{t("shipping_date")}</dt>
                                    <dd>04/25/2021</dd>
                                </dl>
                                <Link
                                    to={linkGenerator(`/single-post/some-id`)}
                                    className="btn btn-danger"
                                >
                                    {t("see_more")}
                                </Link>

                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={
                                        <i className="fa fa-star-half-alt"></i>
                                    }
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    value={5}
                                    edit={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

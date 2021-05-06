import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Banner from "../header/Banner";
import Storehous_1 from "../../img/storehous_1.jpg";
import Card from "../my-profile-card/Card";
import "./MyProfile.css";

const MyProfile = () => {
    const { t, i18n } = useTranslation();
    const linkGenerator = link => {
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
                    <div className="col-12 mb-4">
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
                        <Card
                            stateFrom="Bosnia and Hertzegovina"
                            cityFrom="Sarajevo"
                            stateTo="Switzerland"
                            cityTo="Zurich"
                            date="04/25/2021"
                            type="Car and Track"
                        />
                    </div>
                    <div className="col-md-6 col-lg-4 mb-3">
                        <Card
                            stateFrom="Bosnia and Hertzegovina"
                            cityFrom="Sarajevo"
                            stateTo="Switzerland"
                            cityTo="Zurich"
                            date="04/25/2021"
                            type="Car and Track"
                        />
                    </div>
                    <div className="col-md-6 col-lg-4 mb-3">
                        <Card
                            stateFrom="Bosnia and Hertzegovina"
                            cityFrom="Sarajevo"
                            stateTo="Switzerland"
                            cityTo="Zurich"
                            date="04/25/2021"
                            type="Car and Track"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

import React from "react";
import { useTranslation } from "react-i18next";
import Banner from "../header/Banner";
import Storehous_1 from "../../img/storehous_1.jpg";
import "./About.css";

const About = () => {
    const { t, i18n } = useTranslation();
    return (
        <section id="about">
            <Banner
                image={Storehous_1}
                altText="Storehouse"
                title={t("about_title")}
            />
            <div className="container about mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-5">
                                    <h2>{t("contact_address")}</h2>
                                    <ul className="list-unstyled">
                                        <li>{t("contact_name")}</li>
                                        <li>{t("contact_street")}</li>
                                        <li>{t("contact_city")}</li>
                                        <li>{t("contact_state")}</li>
                                        <li>{t("contact_email")}</li>
                                    </ul>
                                </div>
                                <div className="mb-5">
                                    <h2>{t("authorized_title")}</h2>
                                    <ul className="list-unstyled">
                                        <li>{t("authorized_person_1")}</li>
                                        <li>{t("authorized_person_2")}</li>
                                    </ul>
                                </div>
                                <div className="mb-5">
                                    <h2>{t("register_title")}</h2>
                                    <ul className="list-unstyled">
                                        <li>{t("register_name")}</li>
                                        <li>{t("register_num")}</li>
                                    </ul>
                                </div>
                                <div className="mb-5">
                                    <h2>{t("disclaimer_title")}</h2>
                                    <p className="text-justify">
                                        {t("disclaimer_text")}
                                    </p>
                                </div>
                                <div className="mb-5">
                                    <h2>{t("laibility_title")}</h2>
                                    <p className="text-justify">
                                        {t("laibility_text")}
                                    </p>
                                </div>
                                <div className="mb-0">
                                    <h2>{t("copyright_title")}</h2>
                                    <p className="text-justify mb-0">
                                        {t("copyright_text")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

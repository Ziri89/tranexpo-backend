import React from "react";
import { useTranslation } from "react-i18next";
import LogoLight from "../../img/logo-white.svg";
import "./Footer.css";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
    const { t, i18n } = useTranslation();
    const lng = i18n.language;
    console.log(lng);
    return (
        <footer className="p-4 bg-dark text-white">
            <div className="container">
                <div className="row justify-content-between align-items-start text-center">
                    <div className="col-lg-3">
                        <h3>{t("general_conditions")}</h3>
                        <ul className="list-unstyled">
                            <li>
                                <a
                                    href={`/images/conditions/Tranexpo-${lng}.pdf`}
                                    target="_blank"
                                    className="text-danger"
                                >
                                    {t("see_conditions")}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <img
                            src={LogoLight}
                            alt="Logo footer"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-lg-3">
                        <h3>{t("contact")}</h3>
                        <ul className="list-unstyled">
                            <li>
                                <a
                                    href="mailto: info@tranexpo.com"
                                    className="text-danger"
                                >
                                    info@tranexpo.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel: +41754111234"
                                    className="text-danger"
                                >
                                    +41 75 411 1234
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <hr />
            </div>
            <div className="bottom container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-12">
                        <p className="m-0 text-center">
                            {t("copyright_1")} {year} {t("copyright_2")}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

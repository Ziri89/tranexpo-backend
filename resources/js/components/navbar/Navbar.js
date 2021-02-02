import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { logout } from "../actions/auth";
import "react-flags-select/css/react-flags-select.css";
import "./Navbar.css";
import Logo from "../../img/logo.svg";
const Navbar = () => {
    const useLang = localStorage.getItem("lang");
    const [lang, setLang] = useState(useLang.toUpperCase());

    const onSelectFlag = countryCode => {
        setLang(countryCode);
        location.reload();
    };
    useEffect(() => {
        window.localStorage.setItem("lang", lang.toLocaleLowerCase());
    }, [lang]);
    useEffect(() => {
        window.localStorage.setItem("lang", lang.toLocaleLowerCase());
    }, []);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const logoutHandler = () => {
        dispatch(logout());
    };
    const { t } = useTranslation();
    return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img width="200" src={Logo} alt="Logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar"
                    aria-controls="navbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbar">
                    <div className="choose-lang">
                        <ReactFlagsSelect
                            countries={["GB", "FR", "DE", "IT", "BA"]}
                            customLabels={{
                                GB: "EN",
                                FR: "FR",
                                DE: "DE",
                                IT: "IT",
                                BA: "BA"
                            }}
                            defaultCountry={lang}
                            onSelect={onSelectFlag}
                        />
                    </div>
                    <div className="navbar-nav mx-auto">
                        <NavLink exact className="nav-link" to="/">
                            {t("home")}
                        </NavLink>
                        <NavLink className="nav-link" to="/about">
                            {t("about_us")}
                        </NavLink>

                        <NavLink
                            className="nav-link"
                            to="/transport-registration"
                        >
                            {t("transport_registration")}
                        </NavLink>
                    </div>
                    <div className="login">
                        {!isLoggedIn ? (
                            <NavLink to="/login" className="text-danger">
                                {t("login")}
                            </NavLink>
                        ) : (
                            <button
                                type="button"
                                onClick={logoutHandler}
                                className="text-danger logout"
                            >
                                {t("logout")}
                            </button>
                        )}

                        <NavLink
                            to="/create-account"
                            className="btn btn-danger btn-lg ml-3"
                        >
                            {t("create_my_account")}
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;

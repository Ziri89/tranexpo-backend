import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import LangBtn from "./LangBtn";
import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import { logout } from "../actions/auth";
import "./Navbar.css";
import Logo from "../../img/logo.svg";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { user } = useSelector(state => state.auth);
    const linkGenerator = link => {
        // if the current language is the default language dont add the lang prefix
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };

    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <nav className="navbar navbar-expand-xl navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to={linkGenerator("/")}>
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
                        <LangBtn />
                    </div>
                    <div className="navbar-nav mx-auto">
                        <NavLink
                            exact
                            className="nav-link"
                            to={linkGenerator("/")}
                        >
                            {t("home")}
                        </NavLink>
                        <NavLink
                            className="nav-link"
                            to={linkGenerator("/about")}
                        >
                            {t("about_us")}
                        </NavLink>
                        <NavLink
                            className="nav-link"
                            to={linkGenerator("/transport-registration")}
                        >
                            {t("transport_registration")}
                        </NavLink>
                        {user !== null && user.data.company_number ? (
                            <React.Fragment>
                                <NavLink
                                    className="nav-link"
                                    to={linkGenerator("/posts")}
                                >
                                    {t("posts_for_transport")}
                                </NavLink>
                                <NavLink
                                    className="nav-link"
                                    to={linkGenerator("/packages-plans")}
                                >
                                    {t("package_plans")}
                                </NavLink>
                            </React.Fragment>
                        ) : null}
                    </div>
                    <div className="login">
                        {!isLoggedIn ? (
                            <NavLink
                                to={linkGenerator("/login")}
                                className="text-danger"
                            >
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
                            to={linkGenerator("/create-account")}
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

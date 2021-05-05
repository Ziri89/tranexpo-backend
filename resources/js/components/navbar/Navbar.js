import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import LangBtn from "./LangBtn";
import * as moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../actions/auth";
import "./Navbar.css";
import Logo from "../../img/logo.svg";

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const today = new Date();
    const linkGenerator = link => {
    
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };

    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const logoutHandler = () => {
        dispatch(logout());
        history.push(linkGenerator("/login"));
    };
    let userEndDate;
    let thisDay;
    if (user !== null) {
        if (user.data.vehicle_number && user.data.endPay !== null) {
            thisDay = moment(today).format('YYYY-MM-DD');
            userEndDate = moment(user.data.endPay).format('YYYY-MM-DD');
        }
    }
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
                            disabled={isLoggedIn === true ? true : false}
                        >
                            {t("transport_registration")}
                        </NavLink>
                        {(user !== null && !user.data.vehicle_number) && (
                            <NavLink
                                className="nav-link"
                                to={linkGenerator("/my-profile")}
                            >
                                {t("my_profile")}
                            </NavLink>
                        )}
                        {user !== null &&
                        user.data.vehicle_number &&  (thisDay < userEndDate) ? (
                            <NavLink
                                className="nav-link"
                                to={linkGenerator("/posts")}
                            >
                                {t("posts")}
                            </NavLink>
                        ) : null}
                        {user !== null &&
                        user.data.vehicle_number &&
                        (thisDay > userEndDate) ? (
                            <NavLink
                                className="nav-link"
                                to={linkGenerator("/packages-plans")}
                            >
                                {t("package_plans")}
                            </NavLink>
                        ) : null}
                        {user !== null && !user.data.country ? (
                            <NavLink
                                className="nav-link"
                                to={linkGenerator("/admin-dashboard")}
                            >
                                Admin
                            </NavLink>
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
                            disabled={isLoggedIn === true ? true : false}
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

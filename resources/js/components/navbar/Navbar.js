import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import "react-flags-select/css/react-flags-select.css";
import "./Navbar.css";
import Logo from "../../img/logo.svg";
const Navbar = () => {
    const [lang, setLang] = useState("GB");

    const onSelectFlag = countryCode => {
        setLang(countryCode);
    };
    useEffect(() => {
        console.log(lang);
    }, [lang]);
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(state => state.auth);
    const logoutHandler = () => {
        dispatch(logout());
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
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
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="#">
                            Link
                        </NavLink>
                        <NavLink className="nav-link" to="#">
                            Link
                        </NavLink>

                        <NavLink className="nav-link" to="#">
                            Link
                        </NavLink>
                    </div>
                    <div className="login">
                        {!isLoggedIn ? (
                            <NavLink to="/login" className="text-danger">
                                Login
                            </NavLink>
                        ) : (
                            <button
                                type="button"
                                onClick={logoutHandler}
                                className="text-danger logout"
                            >
                                Logout
                            </button>
                        )}

                        <NavLink
                            to="/create-account"
                            className="btn btn-danger btn-lg ml-3"
                        >
                            Create my account
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;

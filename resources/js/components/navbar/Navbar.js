import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";
import "./Navbar.css";
import Logo from "../../../../storage/app/public/logo.svg";
const Navbar = () => {
    const [lang, setLang] = useState("DE");
    const onSelectFlag = countryCode => {
        setLang(countryCode);
    };
    useEffect(() => {
        console.log(lang);
    }, [lang]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                <div className="choose-lang">
                    <ReactFlagsSelect
                        countries={["GB", "FR", "DE", "IT", "BA"]}
                        customLabels={{
                            GB: "EN-GB",
                            FR: "FR",
                            DE: "DE",
                            IT: "IT",
                            BA: "BA"
                        }}
                        defaultCountry={lang}
                        onSelect={onSelectFlag}
                    />
                </div>

                <div className="collapse navbar-collapse" id="navbar">
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
                </div>
                <div className="login">
                    <Link to="/login">Login</Link>
                    <Link
                        to="/create-account"
                        className="btn btn-danger btn-lg ml-3"
                    >
                        Create my account
                    </Link>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;

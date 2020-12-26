import React from "react";
import { NavLink, Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Navbar
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
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">
                            Home <span className="sr-only">(current)</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="#">
                            Link
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink
                            className="nav-link dropdown-toggle"
                            to="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Dropdown
                        </NavLink>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <Link className="dropdown-item" to="#">
                                Action
                            </Link>
                            <Link className="dropdown-item" to="#">
                                Another action
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#">
                                Something else here
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link disabled"
                            to="#"
                            tabIndex="-1"
                            aria-disabled="true"
                        >
                            Disabled
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default Navbar;

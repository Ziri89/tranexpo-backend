import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useTranslation } from "react-i18next";
import { login } from "../actions/auth";
import Loader from "../../img/loader.gif";
import "./Login.css";
import Banner from "../header/Banner";
import Storehouse_1 from "../../img/storehous_1.jpg";
import "./Login.css";

const Login = () => {
    const form = useRef();
    const { t, i18n } = useTranslation();
    const required = value => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    {t("field_required")}
                </div>
            );
        }
    };
    const checkBtn = useRef();
    const [state, setState] = useState({
        email: "",
        password: "",
        loading: false
    });
    const [checked, setChecked] = useState(false);
    const handleInputsChange = event => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const history = useHistory();
    const onSubmitHandler = ev => {
        ev.preventDefault();
        setState({
            ...state,
            loading: true
        });
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(login(state.email, state.password))
                .then(() => {
                    //console.log(response.data);
                    window.location.reload();
                    setState({
                        ...state,
                        loading: false
                    });
                })
                .catch(() => {
                    setState({
                        ...state,
                        loading: false
                    });
                });
        } else {
            setState({
                ...state,
                loading: false
            });
        }
    };

    if (isLoggedIn && !user.data.vehicle_number) {
        history.push("/");
    } else if (isLoggedIn && user.data.vehicle_number) {
        history.push("/posts");
    }
    return (
        <div className="login-form mb-5">
            <Banner
                image={Storehouse_1}
                altText="Storehouse"
                title={t("login")}
            />
            <div className="container">
                <div
                    id="login-row"
                    className="row justify-content-center align-items-center"
                >
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <Form
                                id="login-form"
                                className="form"
                                onSubmit={onSubmitHandler}
                                ref={form}
                            >
                                <div className="form-group">
                                    <label
                                        htmlFor="email"
                                        className="text-danger"
                                    >
                                        Email:
                                    </label>
                                    <br />
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        autoComplete={
                                            checked === true ? "on" : "off"
                                        }
                                        value={state.email}
                                        onChange={handleInputsChange}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="password"
                                        className="text-danger"
                                    >
                                        {t("password")}:
                                    </label>
                                    <br />
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        autoComplete={
                                            checked === true ? "on" : "off"
                                        }
                                        value={state.password}
                                        onChange={handleInputsChange}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="remember-me"
                                        className="text-danger"
                                    >
                                        <span>{t("remember_me")}</span> 
                                        <span>
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                value={checked}
                                                onChange={() =>
                                                    setChecked(!checked)
                                                }
                                            />
                                        </span>
                                    </label>
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-danger btn-lg"
                                    >
                                        {t("submit")}
                                        {state.loading ? (
                                            <img
                                                src={Loader}
                                                width="20"
                                                className="ml-2"
                                                alt="Loader"
                                            />
                                        ) : null}
                                    </button>
                                </div>
                                <div id="register-link" className="text-right">
                                    <Link
                                        to="/create-account"
                                        className="text-danger"
                                    >
                                        {t("register_here")}
                                    </Link>
                                </div>
                                {message && (
                                    <div className="form-group">
                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            {message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{ display: "none" }}
                                    ref={checkBtn}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

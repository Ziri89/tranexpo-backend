import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../actions/auth";
import Loader from "../../img/loader.gif";
import "./Login.css";
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
const Login = () => {
    const form = useRef();

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
    const { isLoggedIn } = useSelector(state => state.auth);
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

    if (isLoggedIn) {
        history.push("/");
    }
    return (
        <div className="login-form">
            <h3 className="text-center text-danger pt-5">Login</h3>
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
                                        Password:
                                    </label>
                                    <br />
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control"
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
                                        <span>Remember me</span> 
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
                                        submit
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
                                        Register here
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

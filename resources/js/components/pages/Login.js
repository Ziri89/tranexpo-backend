import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: ""
    });
    const [checked, setChecked] = useState(false);
    const handleInputsChange = event => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value
        });
    };
    useEffect(() => {
        console.log(state.email, state.password);
    }, [state]);
    const onSubmitHandler = ev => {
        ev.preventDefault();
        axios
            .post("/api/login", {
                email: state.email,
                password: state.password
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.data);
            });
    };
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
                            <form
                                id="login-form"
                                className="form"
                                onSubmit={onSubmitHandler}
                            >
                                <div className="form-group">
                                    <label
                                        htmlFor="email"
                                        className="text-danger"
                                    >
                                        Email:
                                    </label>
                                    <br />
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        value={state.email}
                                        onChange={handleInputsChange}
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
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        value={state.password}
                                        onChange={handleInputsChange}
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
                                    <input
                                        type="submit"
                                        name="submit"
                                        className="btn btn-danger btn-lg"
                                        value="submit"
                                    />
                                </div>
                                <div id="register-link" className="text-right">
                                    <Link
                                        to="/create-account"
                                        className="text-danger"
                                    >
                                        Register here
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

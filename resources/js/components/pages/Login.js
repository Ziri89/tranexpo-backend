import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions";
import Loader from "../../img/loader.gif";
import allReducers from "../reducers";
import "./Login.css";

const Login = () => {
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
    const loginDetails = useSelector(state => state.LogInReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        //console.log(state.email, state.password);
    }, [state]);
    const onSubmitHandler = ev => {
        ev.preventDefault();
        setState({
            ...state,
            loading: true
        });
        dispatch(login(state.username, state.password))
            .then(response => {
                console.log(response.data.success);
            })
            .then(() => {
                setState({
                    ...state,
                    loading: false,
                    email: "",
                    password: ""
                });
                history.push("/");
            })
            .catch(() => {
                setState({
                    ...state,
                    loading: false,
                    email: "",
                    password: ""
                });
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

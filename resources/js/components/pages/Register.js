import React, { useState, useEffect } from "react";

const Register = () => {
    const [state, setState] = useState({
        username: "",
        email: "",
        company: "",
        phone: "",
        city: "",
        zipcode: "",
        password: "",
        password_confirm: "",
        message: ""
    });

    const onChanfeHandler = ev => {
        const [name, value] = ev.target;
        setState({
            ...state,
            [name]: value
        });
    };
    return (
        <div className="register">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <form className="col-md-10 mt-5">
                        <div id="legend">
                            <h2 className="text-danger text-center">
                                Register
                            </h2>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="username"
                                        className="text-danger"
                                    >
                                        Full Name*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder=""
                                            className="form-control"
                                            value={state.username}
                                            onChange={onChanfeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="email"
                                        className="text-danger"
                                    >
                                        E-mail*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder=""
                                            className="form-control"
                                            value={state.email}
                                            onChange={onChanfeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="company"
                                        className="text-danger"
                                    >
                                        Company Name
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder=""
                                            className="form-control"
                                            value={state.company}
                                            onChange={onChanfeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="phone"
                                        className="text-danger"
                                    >
                                        Phone*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder=""
                                            className="form-control"
                                            value={state.phone}
                                            onChange={onChanfeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="company"
                                        className="text-danger"
                                    >
                                        City
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder=""
                                            className="form-control"
                                            value={state.city}
                                            onChange={onChanfeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="company"
                                        className="text-danger"
                                    >
                                        Zip Code
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            placeholder=""
                                            className="form-control"
                                            value={state.zipcode}
                                            onChange={onChanfeHandler}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="password"
                                        className="text-danger"
                                    >
                                        Password*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder=""
                                            className="form-control"
                                            value={state.password}
                                            onChange={onChanfeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="password_confirm"
                                        className="text-danger"
                                    >
                                        Password (Confirm)*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="password"
                                            id="password_confirm"
                                            name="password_confirm"
                                            placeholder=""
                                            className="form-control"
                                            value={state.password_confirm}
                                            onChange={onChanfeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label
                                        htmlFor="message"
                                        className="text-danger"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        className="form-control"
                                        rows="10"
                                        value={state.message}
                                        onChange={onChanfeHandler}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="controls">
                                <button className="btn btn-danger btn-lg">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

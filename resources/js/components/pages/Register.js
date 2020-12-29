import React, { useState, useEffect } from "react";

const Register = () => {
    const [registrationData, setRegistrationData] = useState({
        username: "",
        email: "",
        company: "",
        phone: "",
        city: "",
        zipcode: "",
        password: "",
        password_confirm: ""
    });

    const onChangeHandler = ev => {
        const { name, value } = ev.target;
        setRegistrationData({
            ...registrationData,
            [name]: value
        });
        console.log(registrationData);
    };
    const onSubmitHandler = ev => {
        ev.preventDefault();
        axios
            .post("/api/register", {
                username: registrationData.username,
                email: registrationData.email,
                company: registrationData.company,
                phone: registrationData.phone,
                city: registrationData.city,
                zipcode: registrationData.zipcode,
                password: registrationData.password,
                password_confirm: registrationData.password_confirm
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div className="register">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <form className="col-md-10 mt-5" onSubmit={onSubmitHandler}>
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
                                            value={registrationData.username}
                                            onChange={onChangeHandler}
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
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder=""
                                            className="form-control"
                                            value={registrationData.email}
                                            onChange={onChangeHandler}
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
                                            value={registrationData.company}
                                            onChange={onChangeHandler}
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
                                            value={registrationData.phone}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="city"
                                        className="text-danger"
                                    >
                                        City
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder=""
                                            className="form-control"
                                            value={registrationData.city}
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="zipcode"
                                        className="text-danger"
                                    >
                                        Zip Code
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="zipcode"
                                            name="zipcode"
                                            placeholder=""
                                            className="form-control"
                                            value={registrationData.zipcode}
                                            onChange={onChangeHandler}
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
                                            value={registrationData.password}
                                            onChange={onChangeHandler}
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
                                            value={
                                                registrationData.password_confirm
                                            }
                                            onChange={onChangeHandler}
                                        />
                                    </div>
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

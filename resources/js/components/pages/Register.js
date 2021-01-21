import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../../img/loader.gif";
import Banner from "../header/Banner";
import Storehouse_3 from "../../img/storehous_3.jpg";
import "./Register.css";

const Register = () => {
    const [registrationData, setRegistrationData] = useState({
        name: "",
        email: "",
        company_name: "",
        phone: "",
        city: "",
        zip_code: "",
        password: "",
        password_confirm: "",
        loading: false,
        message: "Fields with * are required",
        email_message: "",
        name_message: "",
        phone_message: "",
        pass_message: ""
    });
    const history = useHistory();
    const onChangeHandler = ev => {
        const { name, value } = ev.target;
        setRegistrationData({
            ...registrationData,
            [name]: value
        });
    };
    const onSubmitHandler = ev => {
        ev.preventDefault();
        if (registrationData.password !== registrationData.password_confirm) {
            setRegistrationData({
                ...registrationData,
                pass_message:
                    "Password confirm doesn't match password. Pleas retape"
            });
        } else {
            setRegistrationData({
                ...registrationData,
                loading: true
            });
            axios
                .post("/api/register", {
                    name: registrationData.name,
                    email: registrationData.email,
                    company_name: registrationData.company_name,
                    phone: registrationData.phone,
                    city: registrationData.city,
                    zip_code: registrationData.zip_code,
                    password: registrationData.password
                })
                .then(res => {
                    if (res.data.status === 200) {
                        setRegistrationData({
                            ...registrationData,
                            name: "",
                            email: "",
                            company_name: "",
                            phone: "",
                            city: "",
                            zip_code: "",
                            password: "",
                            password_confirm: "",
                            loading: false,
                            message:
                                "You have successfully registered. Thank you"
                        });
                        history.push("/login");
                    } else {
                        setRegistrationData({
                            ...registrationData,
                            name_message: res.data.validation_errors.name
                                ? res.data.validation_errors.name[0]
                                : "",
                            email_message: res.data.validation_errors.email
                                ? res.data.validation_errors.email[0]
                                : "",
                            phone_message: res.data.validation_errors.phone
                                ? res.data.validation_errors.phone[0]
                                : "",
                            pass_message: res.data.validation_errors.password
                                ? res.data.validation_errors.password[0]
                                : "",
                            loading: false
                        });
                    }
                })
                .catch(err => {
                    setRegistrationData({
                        ...registrationData,
                        message: err.message + "." + " Please try later.",
                        loading: false
                    });
                });
        }
    };
    return (
        <div className="register">
            <Banner
                image={Storehouse_3}
                altText="Storehouse"
                title="Registration"
            />
            <div className="container mb-5">
                <div className="row justify-content-center align-items-center">
                    <form
                        id="register-form"
                        className="col-md-10"
                        onSubmit={onSubmitHandler}
                    >
                        <div id="legend">
                            <p className="text-dark text-center">
                                {registrationData.message}
                            </p>
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
                                            name="name"
                                            placeholder=""
                                            className="form-control"
                                            value={registrationData.name}
                                            onChange={onChangeHandler}
                                        />
                                        <p className="warning">
                                            {registrationData.name_message}
                                        </p>
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
                                        <p className="warning">
                                            {registrationData.email_message}
                                        </p>
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
                                            name="company_name"
                                            placeholder=""
                                            className="form-control"
                                            value={
                                                registrationData.company_name
                                            }
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
                                        <p className="warning">
                                            {registrationData.phone_message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="city"
                                        className="text-danger"
                                    >
                                        City*
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
                                        Zip Code*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="zipcode"
                                            name="zip_code"
                                            placeholder=""
                                            className="form-control"
                                            value={registrationData.zip_code}
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
                                        <p className="warning">
                                            {registrationData.pass_message}
                                        </p>
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
                                    {registrationData.loading ? (
                                        <img
                                            src={Loader}
                                            width="20"
                                            className="ml-2"
                                            alt="Loader"
                                        />
                                    ) : null}
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

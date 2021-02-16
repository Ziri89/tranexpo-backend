import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactFlagsSelect from "react-flags-select";
import { countriesData } from "../countries/data-shortcode";
import Loader from "../../img/loader.gif";
import Select from "../select/Select";
import Banner from "../header/Banner";
import Storehouse_3 from "../../img/storehous_3.jpg";
import "./Register.css";

import { API_BASE_URL } from "../config/config";

const Register = () => {
    const { t, i18n } = useTranslation();
    const countrieOptions = Object.keys(countriesData);
    const [registrationData, setRegistrationData] = useState({
        name: "",
        email: "",
        company_name: "",
        phone: "",
        country: "",
        city: "",
        zip_code: "",
        password: "",
        password_confirm: "",
        loading: false,
        message: `${t("field_with_stars")}`,
        email_message: "",
        name_message: "",
        phone_message: "",
        pass_message: "",
        country_message: "",
        city_message: "",
        zip_code_message: ""
    });
    const history = useHistory();
    const onChangeHandler = ev => {
        const { name, value } = ev.target;
        setRegistrationData({
            ...registrationData,
            [name]: value
        });
    };
    useEffect(() => {
        console.log(registrationData);
    }, [registrationData]);
    const setValueCity = ev => {
        setRegistrationData({
            ...registrationData,
            city: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };
    const cities = countrieOptions.includes(registrationData.country)
        ? countriesData[registrationData.country]
              .filter(item => {
                  return (
                      item.match(new RegExp(`${registrationData.city}`, "i")) &&
                      registrationData.city !== ""
                  );
              })
              .map((item, key) => (
                  <li
                      className="list-group-item list-group-item-action w-100"
                      key={key}
                      onClick={setValueCity}
                  >
                      {item}
                  </li>
              ))
        : null;
    const onSubmitHandler = ev => {
        ev.preventDefault();
        if (registrationData.password !== registrationData.password_confirm) {
            setRegistrationData({
                ...registrationData,
                pass_message: `${t("password_confirm_match")}`
            });
        } else {
            setRegistrationData({
                ...registrationData,
                loading: true
            });
            axios
                .post(API_BASE_URL + "/register", {
                    name: registrationData.name,
                    email: registrationData.email,
                    company_name: registrationData.company_name,
                    phone: registrationData.phone,
                    country: registrationData.country,
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
                            country: "",
                            city: "",
                            zip_code: "",
                            password: "",
                            password_confirm: "",
                            loading: false,
                            message: `${t("success_registration")}`
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
                            country_message: res.data.validation_errors.country
                                ? res.data.validation_errors.country[0]
                                : "",
                            city_message: res.data.validation_errors.city
                                ? res.data.validation_errors.city[0]
                                : "",
                            zip_code_message: res.data.validation_errors
                                .zip_code
                                ? res.data.validation_errors.zip_code[0]
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
                        message: `${err.message}. ${t("try_latter")}`,
                        loading: false
                    });
                    console.log(err);
                });
        }
    };
    return (
        <div className="register">
            <Banner
                image={Storehouse_3}
                altText="Storehouse"
                title={t("registration")}
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
                                        {t("full_name")}*
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
                                        {t("company_name")}
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
                                        {t("phone")}*
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
                            <div className="col-md-4">
                                <label
                                    htmlFor="country"
                                    className="text-danger"
                                >
                                    {t("country")}*
                                </label>
                                <ReactFlagsSelect
                                    countries={countrieOptions}
                                    id="country"
                                    selected={registrationData.country}
                                    onSelect={code =>
                                        setRegistrationData({
                                            ...registrationData,
                                            country: code
                                        })
                                    }
                                    placeholder={t("your_country")}
                                    searchable
                                />
                                <p className="warning">
                                    {registrationData.country_message}
                                </p>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label
                                        htmlFor="city"
                                        className="text-danger"
                                    >
                                        {t("city")}*
                                    </label>
                                    <div className="controls">
                                        <Select
                                            char="▼"
                                            type="text"
                                            placeholder={t("city")}
                                            name="city"
                                            value={registrationData.city}
                                            onChange={onChangeHandler}
                                            options={cities}
                                        />
                                        <p className="warning">
                                            {registrationData.city_message}
                                        </p>
                                        {/* <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="form-control"
                                            value={shipperReg.city}
                                            onChange={onChangeHandler}
                                        />*/}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label
                                        htmlFor="zipcode"
                                        className="text-danger"
                                    >
                                        {t("zip_code")}*
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
                                        <p className="warning">
                                            {registrationData.zip_cod_message}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="password"
                                        className="text-danger"
                                    >
                                        {t("password")}*
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
                                        {t("password_confirm")}*
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
                                    {t("register")}
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

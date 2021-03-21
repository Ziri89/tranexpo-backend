import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactFlagsSelect from "react-flags-select";
import { countriesData } from "../countries/data-shortcode";
import Loader from "../../img/loader.gif";
import Banner from "../header/Banner";
import Truck_6 from "../../img/truck_6.jpg";
import Select from "../select/Select";
import "./TransportRegistration.css";

import { API_BASE_URL } from "../config/config";

const TransportRegistration = () => {
    const { t, i18n } = useTranslation();
    const countrieOptions = Object.keys(countriesData);
    const linkGenerator = link => {
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };
    const [shipperReg, setShipperReg] = useState({
        name: "",
        email: "",
        company_name: "",
        company_number: "",
        phone: "",
        country: "",
        city: "",
        zip_code: "",
        vehicle_number: 1,
        password: "",
        password_confirm: "",
        loading: false,
        message: `${t("field_with_stars")}`,
        email_message: "",
        name_message: "",
        phone_message: "",
        pass_message: "",
        company_name_message: "",
        company_reg_num_message: "",
        vehicle_number_message: ""
    });
    const history = useHistory();
    const onChangeHandler = ev => {
        const { name, value } = ev.target;
        setShipperReg({
            ...shipperReg,
            [name]: value
        });
    };
    const setValueCity = ev => {
        setShipperReg({
            ...shipperReg,
            city: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };
    const cities = countrieOptions.includes(shipperReg.country)
        ? countriesData[shipperReg.country]
              .filter(item => {
                  return (
                      item.match(new RegExp(`${shipperReg.city}`, "i")) &&
                      shipperReg.city !== ""
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
        if (shipperReg.password !== shipperReg.password_confirm) {
            setShipperReg({
                ...shipperReg,
                pass_message: `${t("password_confirm_match")}`
            });
        } else {
            setShipperReg({
                ...shipperReg,
                loading: true
            });
            axios
                .post(API_BASE_URL + "api/registerShipper", {
                    name: shipperReg.name,
                    email: shipperReg.email,
                    company_name: shipperReg.company_name,
                    company_number: shipperReg.company_number,
                    phone: shipperReg.phone,
                    vehicle_number: shipperReg.vehicle_number,
                    country: shipperReg.country,
                    city: shipperReg.city,
                    zip_code: shipperReg.zip_code,
                    password: shipperReg.password
                })
                .then(res => {
                    if (res.data.status === 200) {
                        setShipperReg({
                            ...shipperReg,
                            name: "",
                            email: "",
                            company_name: "",
                            company_number: "",
                            phone: "",
                            country: "",
                            city: "",
                            country: "",
                            zip_code: "",
                            vehicle_number: 1,
                            password: "",
                            password_confirm: "",
                            loading: false,
                            message: `${t("success_registration")}`
                        });
                        history.push(linkGenerator("/login"));
                    } else {
                        setShipperReg({
                            ...shipperReg,
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
                            company_name_message: res.data.validation_errors
                                .company_name_message
                                ? res.data.validation_errors
                                      .company_name_message[0]
                                : "",
                            vehicle_number_message: res.data.validation_errors
                                .vehicle_number_message
                                ? res.data.validation_errors
                                      .vehicle_number_message[0]
                                : "",
                            loading: false
                        });
                    }
                })
                .catch(err => {
                    setShipperReg({
                        ...shipperReg,
                        message: `${err.message}. ${t("try_latter")}`,
                        loading: false
                    });
                });
        }
    };
    return (
        <div className="shipper-registration">
            <Banner
                image={Truck_6}
                altText="STrucks"
                title={t("shipper_registration")}
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
                                {shipperReg.message}
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
                                            value={shipperReg.name}
                                            onChange={onChangeHandler}
                                        />
                                        <p className="warning">
                                            {shipperReg.name_message}
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
                                            value={shipperReg.email}
                                            onChange={onChangeHandler}
                                        />
                                        <p className="warning">
                                            {shipperReg.email_message}
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
                                        {t("company_name")}*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="company"
                                            name="company_name"
                                            placeholder=""
                                            className="form-control"
                                            value={shipperReg.company_name}
                                            onChange={onChangeHandler}
                                        />
                                        <p className="warning">
                                            {shipperReg.company_name_message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="company_reg_num"
                                        className="text-danger"
                                    >
                                        {t("company_registration_number")}
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="company_reg_num"
                                            name="company_number"
                                            placeholder=""
                                            className="form-control"
                                            value={shipperReg.company_number}
                                            onChange={onChangeHandler}
                                        />
                                        <p className="warning">
                                            {shipperReg.company_reg_num_message}
                                        </p>
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
                                            placeholder="e.g. +4144XXXXXXX"
                                            className="form-control"
                                            value={shipperReg.phone}
                                            onChange={onChangeHandler}
                                        />
                                        <p className="warning">
                                            {shipperReg.phone_message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label
                                        htmlFor="vehicle_number"
                                        className="text-danger"
                                    >
                                        {t("amount_of_vehicle")}*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="number"
                                            id="vehicle_number"
                                            name="vehicle_number"
                                            className="form-control"
                                            min="1"
                                            value={shipperReg.vehicle_number}
                                            onChange={onChangeHandler}
                                        />
                                        <p className="warning">
                                            {shipperReg.vehicle_number_message}
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
                                    selected={shipperReg.country}
                                    onSelect={code =>
                                        setShipperReg({
                                            ...shipperReg,
                                            country: code
                                        })
                                    }
                                    placeholder={t("your_country")}
                                    searchable
                                />
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
                                            value={shipperReg.city}
                                            onChange={onChangeHandler}
                                            options={cities}
                                        />
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
                                            value={shipperReg.zip_code}
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
                                        {t("password")}*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder=""
                                            className="form-control"
                                            value={shipperReg.password}
                                            onChange={onChangeHandler}
                                        />
                                        <p className="warning">
                                            {shipperReg.pass_message}
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
                                            value={shipperReg.password_confirm}
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
                                    {shipperReg.loading ? (
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

export default TransportRegistration;

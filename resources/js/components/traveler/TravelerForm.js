import React, { useState } from "react";
import { countriesData } from "../countries/data";
import { useSelector } from "react-redux";
import Select from "../select/Select";
import Loader from "../../img/loader.gif";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./TravelerForm.css";

import { API_BASE_URL } from "../config/config";

function TravelerForm() {
    const countrieOptions = Object.keys(countriesData);
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const userId = user !== null ? user.data.id : "";
    const [traveler, setTraveler] = useState({
        countryFrom: "",
        cityFrom: "",
        countryTo: "",
        cityTo: "",
        departureDate: new Date(),
        dateOfReturn: null,
        onewayOrReturn: "A one-way ticket"
    });
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const formChangeHandler = ev => {
        const target = ev.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setTraveler({
            ...traveler,
            [name]: value
        });
    };
    const setValueCountryFrom = ev => {
        setTraveler({
            ...traveler,
            countryFrom: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };

    const setValueCountryTo = ev => {
        setTraveler({
            ...traveler,
            countryTo: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };

    const setValueCityFrom = ev => {
        setTraveler({
            ...traveler,
            cityFrom: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };

    const setValueCityTo = ev => {
        setTraveler({
            ...traveler,
            cityTo: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };
    const onSubmitHandler = ev => {
        ev.preventDefault();

        let formdata = new FormData();
        formdata.append("countryFrom", traveler.countryFrom);
        formdata.append("cityFrom", traveler.cityFrom);
        formdata.append("countryTo", traveler.countryTo);
        formdata.append("cityTo", traveler.cityTo);
        formdata.append(
            "departureDate",
            moment(traveler.departureDate).format("YYYY.MM.DD")
        );
        formdata.append(
            "dateOfReturn",
            moment(traveler.dateOfReturn).format("YYYY.MM.DD")
        );
        formdata.append("onewayOrReturn", traveler.onewayOrReturn);

        setLoading(true);
        if (user !== null) {
            if (
                traveler.countryFrom !== "" &&
                traveler.cityFrom !== "" &&
                traveler.countryTo !== "" &&
                traveler.cityTo !== ""
            ) {
                axios
                    .post(API_BASE_URL + "api/passengerPublish", formdata, {
                        headers: {
                            Authorization: `Bearer ${
                                user.token ? user.token : null
                            }`,
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        }
                    })
                    .then(res => {
                        setTraveler({
                            countryFrom: "",
                            cityFrom: "",
                            countryTo: "",
                            cityTo: "",
                            departureDate: new Date(),
                            dateOfReturn: null,
                            onewayOrReturn: "A one-way ticket"
                        });
                        setSuccess(true);
                        setMessage(`${t("successfully_added_your_goods")}`);
                        setLoading(false);
                        setTimeout(() => {
                            location.reload();
                        }, 3000);
                        console.log(res);
                    })
                    .catch(err => {
                        setTraveler({
                            countryFrom: "",
                            cityFrom: "",
                            countryTo: "",
                            cityTo: "",
                            departureDate: new Date(),
                            dateOfReturn: null,
                            onewayOrReturn: "A one-way ticket"
                        });
                        setSuccess(false);
                        setMessage(`${t("something_is_wrong")}`);
                        setLoading(false);
                    });
            } else {
                setMessage(`${t("field_with_stars")}`);
            }
        }
    };
    const countriesFrom = countrieOptions
        .filter(item => {
            return (
                item.match(new RegExp(`${traveler.countryFrom}`, "i")) &&
                traveler.countryFrom !== ""
            );
        })
        .map((item, key) => (
            <li
                className="list-group-item list-group-item-action w-100"
                key={key}
                onClick={setValueCountryFrom}
            >
                {item}
            </li>
        ));

    const countriesTo = countrieOptions
        .filter(item => {
            return (
                item.match(new RegExp(`${traveler.countryTo}`, "i")) &&
                traveler.countryTo !== ""
            );
        })
        .map((item, key) => (
            <li
                className="list-group-item list-group-item-action w-100"
                key={key}
                onClick={setValueCountryTo}
            >
                {item}
            </li>
        ));

    const citiesFrom = countrieOptions.includes(traveler.countryFrom)
        ? countriesData[traveler.countryFrom]
              .filter(item => {
                  return (
                      item.match(new RegExp(`${traveler.cityFrom}`, "i")) &&
                      traveler.cityFrom !== ""
                  );
              })
              .map((item, key) => (
                  <li
                      className="list-group-item list-group-item-action w-100"
                      key={key}
                      onClick={setValueCityFrom}
                  >
                      {item}
                  </li>
              ))
        : null;

    const citiesTo = countrieOptions.includes(traveler.countryTo)
        ? countriesData[traveler.countryTo]
              .filter(item => {
                  return (
                      item.match(new RegExp(`${traveler.cityTo}`, "i")) &&
                      traveler.cityTo !== ""
                  );
              })
              .map((item, key) => (
                  <li
                      className="list-group-item list-group-item-action w-100"
                      key={key}
                      onClick={setValueCityTo}
                  >
                      {item}
                  </li>
              ))
        : null;
    return (
        <div id="travel" className="container pb-5">
            <h2 className="text-danger mb-3">{t("reservation_request")}</h2>
            <form onSubmit={onSubmitHandler}>
                <fieldset>
                    <div className="row">
                        <div className="col-lg-6 border-right border-danger">
                            <h3 className="h5">
                                {t("place_of_departure")}{" "}
                                <span className="text-danger">*</span>
                            </h3>
                            <div className="row align-items-center mb-2">
                                <div className="col-lg-6">
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder={t("country")}
                                        name="countryFrom"
                                        value={traveler.countryFrom}
                                        onChange={formChangeHandler}
                                        options={countriesFrom}
                                    />
                                </div>
                                <div className="col-lg-6 text-right">
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder={t("city")}
                                        name="cityFrom"
                                        value={traveler.cityFrom}
                                        onChange={formChangeHandler}
                                        options={citiesFrom}
                                    />
                                </div>
                            </div>
                            <h3 className="h5">
                                {t("destination")}{" "}
                                <span className="text-danger">*</span>
                            </h3>
                            <div className="row align-items-center mb-2">
                                <div className="col-lg-6">
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder={t("country")}
                                        name="countryTo"
                                        value={traveler.countryTo}
                                        onChange={formChangeHandler}
                                        options={countriesTo}
                                    />
                                </div>
                                <div className="col-lg-6 text-right">
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder={t("city")}
                                        name="cityTo"
                                        value={traveler.cityTo}
                                        onChange={formChangeHandler}
                                        options={citiesTo}
                                    />
                                </div>
                            </div>
                            <p className={success ? "success" : "error"}>
                                {message}
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <div className="row m-0">
                                <div className="radio-buttons">
                                    <div className="custom-control custom-radio custom-control-inline mr-0">
                                        <input
                                            className="custom-control-input"
                                            type="radio"
                                            name="onewayOrReturn"
                                            id="one-way"
                                            value="A one-way ticket"
                                            checked={
                                                traveler.onewayOrReturn ===
                                                "A one-way ticket"
                                            }
                                            onChange={formChangeHandler}
                                        />
                                        <label
                                            className="custom-control-label h5"
                                            htmlFor="one-way"
                                        >
                                            {t("one-way_ticket")}
                                        </label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline mr-0 ml-2">
                                        <input
                                            className="custom-control-input"
                                            type="radio"
                                            name="onewayOrReturn"
                                            id="return"
                                            value="A round-trip ticket"
                                            checked={
                                                traveler.onewayOrReturn ===
                                                "A round-trip ticket"
                                            }
                                            onChange={formChangeHandler}
                                        />
                                        <label
                                            className="custom-control-label h5"
                                            htmlFor="return"
                                        >
                                            {t("round-trip_ticket")}
                                        </label>
                                    </div>
                                </div>
                                <div className="row w-100">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label className="h5 w-100">
                                                {t("departure_date")}{" "}
                                                <span className="text-danger">
                                                    *
                                                </span>
                                            </label>
                                            <DatePicker
                                                selected={
                                                    traveler.departureDate
                                                }
                                                onChange={date => {
                                                    setTraveler({
                                                        ...traveler,
                                                        departureDate: date
                                                    });
                                                }}
                                                className="w-100 form-control"
                                            />
                                        </div>
                                    </div>
                                    {traveler.onewayOrReturn !==
                                    "A one-way ticket" ? (
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="h5 w-100">
                                                    {t("date_of_return")}
                                                </label>
                                                <DatePicker
                                                    selected={
                                                        traveler.dateOfReturn
                                                    }
                                                    onChange={date => {
                                                        setTraveler({
                                                            ...traveler,
                                                            dateOfReturn: date
                                                        });
                                                    }}
                                                    className="w-100 form-control"
                                                />
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                                <button
                                    type="submit"
                                    name="submit"
                                    className="btn btn-danger btn-block shipment-btn mt-4"
                                >
                                    {t("submit_request")}{" "}
                                    {loading ? (
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
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default TravelerForm;

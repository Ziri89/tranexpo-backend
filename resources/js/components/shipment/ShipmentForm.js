import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { countriesData } from "../countries/data";
import Select from "../select/Select";
import Loader from "../../img/loader.gif";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as moment from "moment";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./ShipmentForm.css";

//import { API_BASE_URL } from "../config/config";

const ShipmentForm = () => {
    const countrieOptions = Object.keys(countriesData);
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const userId = user !== null ? user.data.id : "";
    const { t, i18n } = useTranslation();
    const linkGenerator = link => {
        // if the current language is the default language dont add the lang prefix
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };
    const [formData, setFormData] = useState({
        countryFrom: "",
        cityFrom: "",
        checkFrom: "Residential",
        countryTo: "",
        cityTo: "",
        checkTo: "Residential",
        shippingDate: new Date(),
        parcel: true,
        envelope: false,
        pallet: false,
        quantity: "1",
        weight: "",
        lenght: "",
        width: "",
        height: "",
        image: null
    });
    const [isUserShiper, setIsUserShiper] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user !== null) {
            if (Object.keys(user.data).includes("vehicle_number")) {
                setIsUserShiper(true);
            } else {
                setIsUserShiper(false);
            }
        }
    }, [isLoggedIn]);
    const fileInput = useRef();
    const hiddenInput = useRef();
    const formChangeHandler = ev => {
        const target = ev.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const setValueCountryFrom = ev => {
        setFormData({
            ...formData,
            countryFrom: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };

    const setValueCountryTo = ev => {
        setFormData({
            ...formData,
            countryTo: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };

    const setValueCityFrom = ev => {
        setFormData({
            ...formData,
            cityFrom: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };

    const setValueCityTo = ev => {
        setFormData({
            ...formData,
            cityTo: ev.target.textContent
        });
        ev.target.parentElement.style.display = "none";
    };

    const countriesFrom = countrieOptions
        .filter(item => {
            return (
                item.match(new RegExp(`${formData.countryFrom}`, "i")) &&
                formData.countryFrom !== ""
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
                item.match(new RegExp(`${formData.countryTo}`, "i")) &&
                formData.countryTo !== ""
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

    const citiesFrom = countrieOptions.includes(formData.countryFrom)
        ? countriesData[formData.countryFrom]
              .filter(item => {
                  return (
                      item.match(new RegExp(`${formData.cityFrom}`, "i")) &&
                      formData.cityFrom !== ""
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

    const citiesTo = countrieOptions.includes(formData.countryTo)
        ? countriesData[formData.countryTo]
              .filter(item => {
                  return (
                      item.match(new RegExp(`${formData.cityTo}`, "i")) &&
                      formData.cityTo !== ""
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

    const onSubmitHandler = ev => {
        ev.preventDefault();

        let formdata = new FormData();
        formdata.append("image", formData.image, formData.image.name);
        formdata.append("countryFrom", formData.countryFrom);
        formdata.append("cityFrom", formData.cityFrom);
        formdata.append("checkFrom", formData.checkFrom);
        formdata.append("countryTo", formData.countryTo);
        formdata.append("cityTo", formData.cityTo);
        formdata.append("checkTo", formData.checkTo);
        formdata.append(
            "shippingDate",
            moment(formData.shippingDate).format("YYYY-MM-DD")
        );
        formdata.append("parcel", formData.parcel === true ? 1 : 0);
        formdata.append("envelope", formData.envelope === true ? 1 : 0);
        formdata.append("pallet", formData.pallet === true ? 1 : 0);
        formdata.append("quantity", formData.quantity);
        formdata.append("weight", formData.weight);
        formdata.append("lenght", formData.lenght);
        formdata.append("width", formData.width);
        formdata.append("height", formData.height);
        formdata.append("user_id", hiddenInput.current.value);
        setLoading(true);
        if (user !== null) {
            axios
                .post("api/publish", formdata, {
                    headers: {
                        Authorization: `Bearer ${
                            user.token ? user.token : null
                        }`,
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => {
                    setFormData({
                        countryFrom: "",
                        cityFrom: "",
                        checkFrom: "Residential",
                        countryTo: "",
                        cityTo: "",
                        checkTo: "Residential",
                        shippingDate: new Date(),
                        parcel: 1,
                        envelope: 0,
                        pallet: 0,
                        quantity: "1",
                        weight: "",
                        lenght: "",
                        width: "",
                        height: "",
                        image: null
                    });
                    setSuccess(true);
                    setMessage(`${t("successfully_added_your_goods")}`);
                    setLoading(false);
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                })
                .catch(err => {
                    setFormData({
                        countryFrom: "",
                        cityFrom: "",
                        checkFrom: "Residential",
                        countryTo: "",
                        cityTo: "",
                        checkTo: "Residential",
                        shippingDate: new Date(),
                        parcel: 1,
                        envelope: 0,
                        pallet: 0,
                        quantity: "1",
                        weight: "",
                        lenght: "",
                        width: "",
                        height: "",
                        image: null
                    });
                    setSuccess(false);
                    setMessage(`${t("something_is_wrong")}`);
                    setLoading(false);
                });
        }
    };
    const onImage = ev => {
        if (ev.target.files[0].size > 3145728) {
            setMessage(`${t("image_file_is_bigger")}`);
        } else {
            setFormData({
                ...formData,
                image: fileInput.current.files[0]
            });
        }
    };

    return (
        <div id="shipment" className="container pb-5">
            <form onSubmit={onSubmitHandler} encType="multipart/form-data">
                <fieldset>
                    <div className="row">
                        <div className="col-lg-6 border-right border-danger">
                            <h2 className="text-danger mb-3">
                                {t("your_destination")}
                            </h2>
                            <div className="row align-items-center mb-2">
                                <div className="col-lg-5">
                                    <h3 className="h5">{t("ship_from")}</h3>
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder={t("country")}
                                        name="countryFrom"
                                        value={formData.countryFrom}
                                        onChange={formChangeHandler}
                                        options={countriesFrom}
                                    />
                                </div>
                                <div className="col-lg-7 text-right">
                                    <div className="custom-control custom-radio custom-control-inline mr-0">
                                        <input
                                            className="custom-control-input"
                                            type="radio"
                                            name="checkFrom"
                                            id="from-res"
                                            value="Residential"
                                            checked={
                                                formData.checkFrom ===
                                                "Residential"
                                            }
                                            onChange={formChangeHandler}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="from-res"
                                        >
                                            {t("residential")}
                                        </label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline mr-0 ml-2">
                                        <input
                                            className="custom-control-input"
                                            type="radio"
                                            name="checkFrom"
                                            id="from-bus"
                                            value="Business"
                                            checked={
                                                formData.checkFrom ===
                                                "Business"
                                            }
                                            onChange={formChangeHandler}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="from-bus"
                                        >
                                            {t("business")}
                                        </label>
                                    </div>
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder={t("city")}
                                        name="cityFrom"
                                        value={formData.cityFrom}
                                        onChange={formChangeHandler}
                                        options={citiesFrom}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-2">
                                <div className="col-lg-5">
                                    <h3 className="h5">{t("ship_to")}</h3>
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder={t("country")}
                                        name="countryTo"
                                        value={formData.countryTo}
                                        onChange={formChangeHandler}
                                        options={countriesTo}
                                    />
                                </div>
                                <div className="col-lg-7 text-right">
                                    <div className="custom-control custom-radio custom-control-inline mr-0">
                                        <input
                                            className="custom-control-input"
                                            type="radio"
                                            name="checkTo"
                                            id="to-res"
                                            value="Residential"
                                            checked={
                                                formData.checkTo ===
                                                "Residential"
                                            }
                                            onChange={formChangeHandler}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="to-res"
                                        >
                                            {t("residential")}
                                        </label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline mr-0 ml-2">
                                        <input
                                            className="custom-control-input"
                                            type="radio"
                                            name="checkTo"
                                            id="to-bus"
                                            value="Business"
                                            checked={
                                                formData.checkTo === "Business"
                                            }
                                            onChange={formChangeHandler}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="to-bus"
                                        >
                                            {t("business")}
                                        </label>
                                    </div>
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder={t("city")}
                                        name="cityTo"
                                        value={formData.cityTo}
                                        onChange={formChangeHandler}
                                        options={citiesTo}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="form-group">
                                        <label className="h5 w-100">
                                            {t("shipping_date")}
                                        </label>
                                        <DatePicker
                                            selected={formData.shippingDate}
                                            onChange={date => {
                                                setFormData({
                                                    ...formData,
                                                    shippingDate: date
                                                });
                                            }}
                                            className="w-100 form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p className={success ? "success" : "error"}>
                                {message}
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <h2 className="text-danger mb-3">
                                {t("your_shipment")}
                            </h2>
                            <div className="row">
                                <div className="col-12">
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                        <input
                                            type="checkbox"
                                            id="parcel"
                                            name="parcel"
                                            className="custom-control-input"
                                            checked={formData.parcel}
                                            onChange={formChangeHandler}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="parcel"
                                        >
                                            {t("parcel")}
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                        <input
                                            type="checkbox"
                                            id="envelope"
                                            name="envelope"
                                            className="custom-control-input"
                                            checked={formData.envelope}
                                            onChange={formChangeHandler}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="envelope"
                                        >
                                            {t("envelope")}
                                        </label>
                                    </div>
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                        <input
                                            type="checkbox"
                                            id="pallet"
                                            name="pallet"
                                            className="custom-control-input"
                                            checked={formData.pallet}
                                            onChange={formChangeHandler}
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="pallet"
                                        >
                                            {t("pallet")}
                                        </label>
                                    </div>
                                    <div className="form-row align-items-end">
                                        <div className="form-group col-md-2">
                                            <label htmlFor="qty">
                                                {t("quantity")}
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="qty"
                                                name="quantity"
                                                min="1"
                                                step="1"
                                                value={formData.quantity}
                                                onChange={formChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <label htmlFor="weight">
                                                {t("weight")} (kg)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="weight"
                                                name="weight"
                                                placeholder={t("unit")}
                                                value={formData.weight}
                                                onChange={formChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label>
                                                {t("dimensions")} (cm)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="inputAddress"
                                                name="lenght"
                                                placeholder={t("lenght")}
                                                value={formData.lenght}
                                                onChange={formChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="width"
                                                placeholder={t("width")}
                                                value={formData.width}
                                                onChange={formChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group  col-md-2">
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="inputCity"
                                                name="height"
                                                placeholder={t("height")}
                                                value={formData.height}
                                                onChange={formChangeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-12">
                                            <label htmlFor="image">
                                                {t("upload_image")}
                                            </label>
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                ref={fileInput}
                                                onChange={onImage}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <input
                                    className="custom-control-input"
                                    type="hidden"
                                    name="user_id"
                                    id="user_id"
                                    ref={hiddenInput}
                                    value={userId}
                                />
                            </div>
                            <button
                                type="submit"
                                name="submit"
                                className="btn btn-danger btn-block shipment-btn mt-4"
                            >
                                {t("send_my_parcel")}{" "}
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
                </fieldset>
            </form>
        </div>
    );
};
export default ShipmentForm;

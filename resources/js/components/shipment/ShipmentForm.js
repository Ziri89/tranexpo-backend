import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { countriesData } from "../countries/data";
import { Multiselect } from "multiselect-react-dropdown";
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
        typeOfGoods: "",
        quantity: [],
        weight: [],
        lenght: [],
        width: [],
        height: [],
        image: null
    });
    const [isUserShiper, setIsUserShiper] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [formPart, setFormPart] = useState(1);
    const objectArray = [
        { name: `${t("parcel")}`, key: "package", id: 1 },
        { name: `${t("pallet")}`, key: "pallet", id: 2 },
        { name: `${t("envelope")}`, key: "letter", id: 3 },
        { name: `${t("bulky_goods")}`, key: "bulky goods", id: 4 },
        { name: `${t("car_and_truck")}`, key: "car and truck", id: 5 },
        { name: `${t("food")}`, key: "food", id: 6 },
        { name: `${t("animals")}`, key: "animals", id: 7 },
        { name: `${t("cool_and_frozen")}`, key: "cool and frozen", id: 8 },
        { name: `${t("machinery")}`, key: "machinery", id: 9 },
        { name: `${t("chemicals")}`, key: "chemicals", id: 10 }
    ];
    const costumStyle = {
        chips: { background: "#fc823c" },
        searchBox: {
            border: "1px solid #ced4da",
            fontSize: "0.8rem",
            backgroundColor: "#fff",
            borderRadius: "0.25rem"
        }
    };

    useEffect(() => {
        if (user !== null) {
            if (Object.keys(user.data).includes("vehicle_number")) {
                setIsUserShiper(true);
            } else {
                setIsUserShiper(false);
            }
        }
    }, [isLoggedIn]);
    useEffect(() => {
        console.log(formData);
    }, [formData]);
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
        //console.log(formData);
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
        formData.image
            ? formdata.append("image", formData.image, formData.image.name)
            : formdata.append("image", null);
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
        formdata.append("typeOfGoods", formData.typeOfGoods);
        formdata.append("quantity", JSON.stringify(formData.quantity));
        formdata.append("weight", JSON.stringify(formData.weight));
        formdata.append("lenght", JSON.stringify(formData.lenght));
        formdata.append("width", JSON.stringify(formData.width));
        formdata.append("height", JSON.stringify(formData.height));
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
                        typeOfGoods: "",
                        quantity: [],
                        weight: [],
                        lenght: [],
                        width: [],
                        height: [],
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
                        typeOfGoods: "",
                        quantity: [],
                        weight: [],
                        lenght: [],
                        width: [],
                        height: [],
                        image: null
                    });
                    setSuccess(false);
                    setMessage(`${t("something_is_wrong")}`);
                    setLoading(false);
                });
        }
    };
    const onImage = ev => {
        if (ev.target.files) {
            if (ev.target.files[0].size > 3145728) {
                setMessage(`${t("image_file_is_bigger")}`);
            } else {
                setFormData({
                    ...formData,
                    image: fileInput.current.files[0]
                });
            }
        } else {
            setFormData({
                ...formData,
                image: null
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
                                <div className="col-12 col-xl-11">
                                    <Multiselect
                                        options={objectArray}
                                        displayValue="name"
                                        placeholder={t("type_of_goods")}
                                        id="css_custom"
                                        showCheckbox={true}
                                        selectionLimit={1}
                                        avoidHighlightFirstOption={true}
                                        style={costumStyle}
                                        onSelect={selectedList => {
                                            setFormData({
                                                ...formData,
                                                typeOfGoods: JSON.stringify(
                                                    selectedList
                                                )
                                            });
                                            console.log(
                                                JSON.stringify(selectedList)
                                            );
                                        }}
                                    />
                                </div>
                                {[...Array(formPart)].map(
                                    (v = undefined, i) => {
                                        return (
                                            <div className="col-12" key={i}>
                                                <div className="form-row align-items-end">
                                                    <div className="form-group col-md-2">
                                                        <label
                                                            htmlFor={`qty-${i +
                                                                1}`}
                                                        >
                                                            {t("quantity")}
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id={`qty-${i + 1}`}
                                                            name={`quantity-${i +
                                                                1}`}
                                                            placeholder="kom"
                                                            onChange={ev => {
                                                                let quantities = formData.quantity.slice();
                                                                quantities[i] =
                                                                    ev.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    quantity: quantities
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-2">
                                                        <label
                                                            htmlFor={`weight-${i +
                                                                1}`}
                                                        >
                                                            {t("weight")} (kg)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id={`weight-${i +
                                                                1}`}
                                                            name={`weight-${i +
                                                                1}`}
                                                            placeholder={t(
                                                                "unit"
                                                            )}
                                                            onChange={ev => {
                                                                let weights = formData.weight.slice();
                                                                weights[i] =
                                                                    ev.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    weight: weights
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label>
                                                            {t("dimensions")}{" "}
                                                            (cm)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="inputAddress"
                                                            name={`lenght-${i +
                                                                1}`}
                                                            placeholder={t(
                                                                "lenght"
                                                            )}
                                                            onChange={ev => {
                                                                let lenghts = formData.lenght.slice();
                                                                lenghts[i] =
                                                                    ev.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    lenght: lenghts
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-2">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name={`width-${i +
                                                                1}`}
                                                            placeholder={t(
                                                                "width"
                                                            )}
                                                            onChange={ev => {
                                                                let widths = formData.width.slice();
                                                                widths[i] =
                                                                    ev.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    width: widths
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="form-group  col-md-2">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name={`height-${i +
                                                                1}`}
                                                            placeholder={t(
                                                                "height"
                                                            )}
                                                            onChange={ev => {
                                                                let heights = formData.height.slice();
                                                                heights[i] =
                                                                    ev.target.value;
                                                                setFormData({
                                                                    ...formData,
                                                                    height: heights
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                                <div className="col-12 col-md-11 text-right">
                                    <button
                                        className="btn btn-danger font-weight-bold mr-2"
                                        type="button"
                                        onClick={ev => {
                                            ev.preventDefault();
                                            if (formPart < 7) {
                                                setFormPart(formPart + 1);
                                            }
                                        }}
                                    >
                                        + {t("add_parcel")}
                                    </button>
                                    <button
                                        className="btn btn-danger font-weight-bold"
                                        type="button"
                                        onClick={ev => {
                                            ev.preventDefault();
                                            if (formPart > 1) {
                                                setFormPart(formPart - 1);
                                            }
                                        }}
                                    >
                                        - {t("remove_parcel")}
                                    </button>
                                </div>
                                <div className="col-12">
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

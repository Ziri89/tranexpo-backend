import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { countriesData } from "../countries/data";
import Select from "./Select";
import Loader from "../../img/loader.gif";
import ImgLoader from "../../img/img-loader.gif";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ShipmentForm.css";
import InputFile from "./InputFile";

const ShipmentForm = props => {
    const countrieOptions = Object.keys(countriesData);
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
        image: ""
    });
    const [isUserShiper, setIsUserShiper] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [progress, setProgress] = useState("getUpload");
    const [imgUpladErrMsg, setImgUpladErrMsg] = useState("");
    const { isLoggedIn, user } = useSelector(state => state.auth);
    useEffect(() => {
        if (user !== null) {
            if (Object.keys(user.data).includes("vehicle_number")) {
                setIsUserShiper(true);
            } else {
                setIsUserShiper(false);
            }
        }
    }, [isLoggedIn]);
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

        let myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            "Bearer Beraer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMCIsImlhdCI6MTU5MDUxODE5NCwibmJmIjoxNTkwNTE4MTk0LCJleHAiOjE1OTExMjI5OTQsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.SdWEGbFk3HJBuZFpZ4RQu1J74YyRyNM7QgSdGmDv3Po"
        );
        let formdata = new FormData();
        formdata.append(...formData);
        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };
        if (
            formData.countryFrom === "" &&
            formData.cityFrom === "" &&
            formData.countryTo === "" &&
            formData.cityTo === "" &&
            formData.weight === "" &&
            formData.lenght === "" &&
            formData.width === "" &&
            formData.height === "" &&
            formData.image === ""
        ) {
            setMessage("All fields are required");
            setSuccess(false);
        } else {
            setLoading(true);
            axios("/api/publish", requestOptions)
                .then(res => {
                    console.log(res.data);
                    if (res.status === 200) {
                        setFormData({
                            ...formData,
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
                            image: ""
                        });
                        setLoading(false);
                        setSuccess(true);
                        setMessage(
                            "You have successfully scheduled the shipment"
                        );
                        //history.push("/login");
                    } else {
                        setMessage("Something went wrong. Please try later");
                        setLoading(false);
                        setSuccess(false);
                    }
                })
                .catch(err => {
                    setMessage(err.message + "." + " Please try later.");
                    setLoading(false);
                    setSuccess(false);
                });
        }
    };

    const onImage = (failedImages, successImages) => {
        const imageData = successImages[0];
        const parts = imageData.split(";");
        const mime = parts[0].split(":")[1];
        const name = parts[1].split("=")[1];
        const data = parts[2];
        setFormData({
            ...formData,
            image: imageData
        });
    };
    const imgUploadContent = () => {
        switch (progress) {
            case "getUpload":
                return (
                    <InputFile
                        labelText="Upload image of cargo"
                        onImage={onImage}
                        image={image}
                    />
                );
            case "uploading":
                return <img src={ImgLoader} alt="Image Loader" />;
            case "uploaded":
                return <img src={image} alt="Uploaded Image" width="250" />;
            case "uploadError":
                return (
                    <h2>
                        <InputFile
                            labelText="Upload image of cargo"
                            onImage={onImage}
                            image={image}
                        />
                        <div className="text-muted h6 text-center">
                            Error message: {imgUpladErrMsg}
                        </div>
                    </h2>
                );
        }
    };
    return (
        <div id="shipment" className="container pb-5">
            {(isLoggedIn === false && isUserShiper === false) ||
            (isLoggedIn === true && isUserShiper === true) ||
            (isLoggedIn === false && isUserShiper === true) ? (
                <h2 className="text-danger text-center mt-5">
                    You must be logged in to be able to fill out the form
                </h2>
            ) : null}

            <form onSubmit={onSubmitHandler}>
                <fieldset
                    disabled={
                        isLoggedIn === true && isUserShiper === false
                            ? false
                            : true
                    }
                >
                    <div className="row mt-5">
                        <div className="col-lg-6 border-right border-danger">
                            <h2 className="text-danger mb-3">
                                Your destination
                            </h2>
                            <div className="row align-items-center">
                                <div className="col-lg-5">
                                    <h3 className="h5">Ship From</h3>
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder="Country"
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
                                            Residential
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
                                            Business
                                        </label>
                                    </div>
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder="City"
                                        name="cityFrom"
                                        value={formData.cityFrom}
                                        onChange={formChangeHandler}
                                        options={citiesFrom}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-lg-5">
                                    <h3 className="h5">Ship To</h3>
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder="Country"
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
                                            Residential
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
                                            Business
                                        </label>
                                    </div>
                                    <Select
                                        char="▼"
                                        type="text"
                                        placeholder="City"
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
                                        <label className="h6 w-100">
                                            Shipping date
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
                            <h2 className="text-danger mb-3">Your shipment</h2>
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
                                            Parcel
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
                                            Envelope
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
                                            Pallet
                                        </label>
                                    </div>
                                    <div className="form-row align-items-end">
                                        <div className="form-group col-md-2">
                                            <label htmlFor="qty">Qty</label>
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
                                                Weight (kg)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="weight"
                                                name="weight"
                                                placeholder="/unit"
                                                value={formData.weight}
                                                onChange={formChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group col-md-3">
                                            <label>Dimensions (cm)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="inputAddress"
                                                name="lenght"
                                                placeholder="Lenght"
                                                value={formData.lenght}
                                                onChange={formChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="width"
                                                placeholder="Width"
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
                                                placeholder="Height"
                                                value={formData.height}
                                                onChange={formChangeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-12">
                                            <InputFile
                                                labelText="Upload image of cargo"
                                                onImage={onImage}
                                                image={formData.image}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                name="submit"
                                className="btn btn-danger btn-block shipment-btn mt-4"
                            >
                                Send my parcel{" "}
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

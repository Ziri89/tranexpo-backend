import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Loader from "../../img/loader.gif";
import Banner from "../header/Banner";
import Truck_6 from "../../img/truck_6.jpg";

const TransportRegistration = () => {
    const [shipperReg, setShipperReg] = useState({
        name: "",
        email: "",
        company_name: "",
        company_number: "",
        phone: "",
        city: "",
        zip_code: "",
        vehicle_number: 1,
        password: "",
        password_confirm: "",
        loading: false,
        message: "All fields are required",
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
    const onSubmitHandler = ev => {
        ev.preventDefault();
        console.log("Yesss");
        if (shipperReg.password !== shipperReg.password_confirm) {
            setShipperReg({
                ...shipperReg,
                pass_message:
                    "Password confirm doesn't match password. Pleas retape"
            });
        } else {
            setShipperReg({
                ...shipperReg,
                loading: true
            });
            axios
                .post("/api/registerShipper", {
                    name: shipperReg.name,
                    email: shipperReg.email,
                    company_name: shipperReg.company_name,
                    company_number: shipperReg.company_reg_num,
                    phone: shipperReg.phone,
                    vehicle_number: shipperReg.vehicle_number,
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
                            city: "",
                            zip_code: "",
                            vehicle_number: 1,
                            password: "",
                            password_confirm: "",
                            loading: false,
                            message:
                                "You have successfully registered. Thank you"
                        });
                        history.push("/login");
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
                            company_reg_num_message: res.data.validation_errors
                                .company_reg_num_message
                                ? res.data.validation_errors
                                      .company_reg_num_message[0]
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
                        message: err.message + "." + " Please try later.",
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
                title="Shipper Registration"
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
                                        Full Name*
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
                                        Company Name*
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
                                        Company Registration Number*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="text"
                                            id="company_reg_num"
                                            name="company_reg_num"
                                            placeholder=""
                                            className="form-control"
                                            value={shipperReg.company_reg_num}
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
                                        Phone*
                                    </label>
                                    <div className="controls">
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
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
                                        Amount Of Vehicle *
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
                                            className="form-control"
                                            value={shipperReg.city}
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
                                        Password*
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
                                        Password (Confirm)*
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
                                    Register
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

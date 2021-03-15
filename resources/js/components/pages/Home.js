import React, { useState, useEffect } from "react";
import HomeSlider from "../slider/HomeSlider";
import ShipmentForm from "../shipment/ShipmentForm";
import TravelerForm from "../traveler/TravelerForm";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Home = () => {
    const { t } = useTranslation();
    const { isLoggedIn, user } = useSelector(state => state.auth);
    const [transport, setTransport] = useState("");
    const [isUserShiper, setIsUserShiper] = useState(false);
    useEffect(() => {
        if (user !== null) {
            if (Object.keys(user.data).includes("vehicle_number")) {
                setIsUserShiper(true);
            } else {
                setIsUserShiper(false);
            }
        }
    }, [isLoggedIn]);
    return (
        <div className="home">
            <HomeSlider />
            <div className="container mt-5">
                {(isLoggedIn === false && isUserShiper === false) ||
                (isLoggedIn === true && isUserShiper === true) ||
                (isLoggedIn === false && isUserShiper === true) ? (
                    <h2 className="text-danger text-center my-5">
                        {t("you_must_be_logged")}
                    </h2>
                ) : null}
                <div className="row mb-5" role="group">
                    <div className="col-12 col-md-6 mb-4">
                        <button
                            type="button"
                            className="btn btn-danger btn-block btn-lg"
                            onClick={() => setTransport("goods")}
                            disabled={
                                isLoggedIn === true && isUserShiper === false
                                    ? false
                                    : true
                            }
                        >
                            {t("transport_of_goods")}
                        </button>
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                        <button
                            type="button"
                            className="btn btn-danger btn-block btn-lg"
                            onClick={() => setTransport("passenger")}
                            disabled={
                                isLoggedIn === true && isUserShiper === false
                                    ? false
                                    : true
                            }
                        >
                            {t("passenger_registration")}
                        </button>
                    </div>
                </div>
            </div>
            {transport === "goods" && <ShipmentForm />}
            {transport === "passenger" && <TravelerForm />}
        </div>
    );
};
export default Home;

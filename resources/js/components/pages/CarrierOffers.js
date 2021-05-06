import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useTranslation } from "react-i18next";
import Offer from "../my-profile-card/Offer";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./CarrierOffers.css";

const CarrierOffers = () => {
    const { t } = useTranslation();
    return (
        <div className="carrier-offers">
            <Banner
                image={Storehouse_2}
                altText="Storehouse"
                title={t("carrier_offers")}
            />
            <div className="container">
                <div className="card mb-5">
                    <div className="card-body row pb-0">
                        <Offer
                            name="Karcher Burckhardt"
                            company="Marti Gruppe"
                            city="Zurich"
                            zipCode="8050"
                            rateNum="4.0"
                            votersNum="6"
                            priceNum="7.050"
                            stars="4"
                        />
                        <Offer
                            name="Karcher Burckhardt"
                            company="Marti Gruppe"
                            city="Zurich"
                            zipCode="8050"
                            rateNum="3.5"
                            votersNum="4"
                            priceNum="7.000"
                            stars="3.5"
                        />
                        <Offer
                            name="Karcher Burckhardt"
                            company="Marti Gruppe"
                            city="Zurich"
                            zipCode="8050"
                            rateNum="5.0"
                            votersNum="5"
                            priceNum="6.050"
                            stars="7"
                        />
                        <Offer
                            name="Karcher Burckhardt"
                            company="Marti Gruppe"
                            city="Zurich"
                            zipCode="8050"
                            rateNum="4.5"
                            votersNum="10"
                            priceNum="8.050"
                            stars="4.5"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierOffers;

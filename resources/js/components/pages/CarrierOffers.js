import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Offer from "../my-profile-card/Offer";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./CarrierOffers.css";

const CarrierOffers = () => {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.auth);
    const [price, setPrice] = useState([]);
    useEffect(() => {
        axios
            .get("/api/priceShow", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token ? user.token : null}`
                }
            })
            .then(res => {
                //console.log(res.data.data);
                setPrice(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        price.length
            ? axios
                  .get("api/shipperAll", {
                      headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${
                              user.token ? user.token : null
                          }`
                      }
                  })
                  .then(res => {
                      if (price.length) {
                          console.log(price[0].id);
                      }
                  })
                  .catch(err => {
                      console.log(err);
                  })
            : null;
    }, [price]);
    const content = price.length
        ? price.map(item => {
              return (
                  <Offer
                      key={item.id}
                      name="Karcher Burckhardt"
                      company="Marti Gruppe"
                      city="Zurich"
                      zipCode="8050"
                      rateNum={4}
                      votersNum="6"
                      priceNum={item.price}
                      stars={4}
                  />
              );
          })
        : null;
    return (
        <div className="carrier-offers">
            <Banner
                image={Storehouse_2}
                altText="Storehouse"
                title={t("carrier_offers")}
            />
            <div className="container">
                <div className="card mb-5">
                    <div className="card-body row pb-0">{content}</div>
                </div>
            </div>
        </div>
    );
};

export default CarrierOffers;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useTranslation } from "react-i18next";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./CarrierOffers.css";

const CarrierOffers = () => {
    const { t, i18n } = useTranslation();
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
                        <div className="col-12 col-lg-6 d-flex border-bottom mb-3 part">
                            <div className="col-5">
                                <p className="h5">Karcher Burckhardt</p>
                                <p className="h6">Marti Gruppe</p>
                                <p className="h6">8050 Zurich</p>
                            </div>
                            <div className="col-4">
                                <p className="h5">Direct price</p>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={
                                        <i className="fa fa-star-half-alt"></i>
                                    }
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    value={4}
                                    edit={false}
                                />
                                <p>
                                    <small>4.0 - 5 Reviews</small>
                                </p>
                            </div>
                            <div className="col-3">
                                <p className="h5">7.050€</p>
                                <Link className="btn btn-danger" to="/carrier">
                                    {t("see_more")}
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 d-flex border-bottom mb-3 part">
                            <div className="col-5">
                                <p className="h5">Karcher Burckhardt</p>
                                <p className="h6">Marti Gruppe</p>
                                <p className="h6">8050 Zurich</p>
                            </div>
                            <div className="col-4">
                                <p className="h5">Direct price</p>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={
                                        <i className="fa fa-star-half-alt"></i>
                                    }
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    value={4}
                                    edit={false}
                                />
                                <p>
                                    <small>4.0 - 5 Reviews</small>
                                </p>
                            </div>
                            <div className="col-3">
                                <p className="h5">7.050€</p>
                                <Link className="btn btn-danger" to="/carrier">
                                    {t("see_more")}
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 d-flex border-bottom mb-3 part">
                            <div className="col-5">
                                <p className="h5">Karcher Burckhardt</p>
                                <p className="h6">Marti Gruppe</p>
                                <p className="h6">8050 Zurich</p>
                            </div>
                            <div className="col-4">
                                <p className="h5">Direct price</p>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={
                                        <i className="fa fa-star-half-alt"></i>
                                    }
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    value={4}
                                    edit={false}
                                />
                                <p>
                                    <small>4.0 - 5 Reviews</small>
                                </p>
                            </div>
                            <div className="col-3">
                                <p className="h5">7.050€</p>
                                <Link className="btn btn-danger" to="/carrier">
                                    {t("see_more")}
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 d-flex border-bottom mb-3 part">
                            <div className="col-5">
                                <p className="h5">Karcher Burckhardt</p>
                                <p className="h6">Marti Gruppe</p>
                                <p className="h6">8050 Zurich</p>
                            </div>
                            <div className="col-4">
                                <p className="h5">Direct price</p>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={
                                        <i className="fa fa-star-half-alt"></i>
                                    }
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    value={4}
                                    edit={false}
                                />
                                <p>
                                    <small>4.0 - 5 Reviews</small>
                                </p>
                            </div>
                            <div className="col-3">
                                <p className="h5">7.050€</p>
                                <Link className="btn btn-danger" to="/carrier">
                                    {t("see_more")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarrierOffers;

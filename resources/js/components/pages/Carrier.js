import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useTranslation } from "react-i18next";
import CarrierInformation from "../my-profile-card/CarrierInformation";
import Rating from "../my-profile-card/Rating";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./Carrier.css";

const Carrier = () => {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.auth);
    const [rate, setRate] = useState({
        stars: 0,
        comment: "",
        shipper_id: 1
    });
    const ratingSubmitHandler = ev => {
        ev.preventDefault();
        if (user !== null && !user.data.vehicle_number) {
            let csrf = RegExp("XSRF-TOKEN[^;]+").exec(document.cookie);
            csrf = decodeURIComponent(
                csrf ? csrf.toString().replace(/^[^=]+./, "") : ""
            );
            let formdata = new FormData();
            formdata.append("stars", rate.stars);
            formdata.append("comment", rate.comment);
            formdata.append("shipper_id", rate.shipper_id);
            //formdata.append("user_id", rate.user_id);
            let myHeaders = new Headers();
            myHeaders.append(
                "Authorization",
                `Bearer ${user !== null ? user.token : null}`
            );
            myHeaders.append("Cookie", csrf);
            myHeaders.append("Content-Type", "application/json");
            axios
                .post("api/rate", formdata, { headers: myHeaders })
                .then(res => {
                    if (res) {
                        console.log(res.data);
                        setRate({
                            stars: 0,
                            comment: "",
                            shipper_id: 1,
                            user_id: user !== null ? user.data.id : null
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    setRate({
                        stars: 0,
                        comment: "",
                        shipper_id: 1,
                        user_id: user !== null ? user.data.id : null
                    });
                });
        }
    };
    return (
        <div className="carrier">
            <Banner
                image={Storehouse_2}
                altText="Storehouse"
                title={t("carrier_profile")}
            />
            <div className="container mb-5">
                <div className="card">
                    <div className="row card-body">
                        <CarrierInformation
                            name="Elbert Addleman"
                            email="elbert@gmail.com"
                            company="Gosselin Moving"
                            phone="+41583561400"
                            state="Switzerland"
                            city="Zurich"
                            zipCode="8050"
                            typeOfGoods="Package, Pallet, Letter, bulky goods, Car
                                    and Truck, Machinery"
                        />

                        <div className="col-12 col-lg-4">
                            <h2>{t("rate_the_carrier")}</h2>
                            <form onSubmit={ratingSubmitHandler}>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={false}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    value={parseInt(rate.stars)}
                                    onChange={newRating => {
                                        setRate({
                                            ...rate,
                                            stars: newRating
                                        });
                                    }}
                                />
                                <div className="form-group">
                                    <label htmlFor="comment">
                                        {t("comment")}
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="comment"
                                        rows="3"
                                        value={rate.comment}
                                        onChange={ev => {
                                            setRate({
                                                ...rate,
                                                comment: ev.target.value
                                            });
                                        }}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                >
                                    {t("send")}
                                </button>
                            </form>
                        </div>

                        <div className="col-12">
                            <h2>{t("ratings")}</h2>
                            <div className="row">
                                <Rating
                                    ratingVal={5}
                                    comment="Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Dolores, quae dolor.
                                        Maiores praesentium quia qui voluptates
                                        ab provident deleniti perspiciatis sequi
                                        laboriosam dolor, temporibus molestias
                                        iusto adipisci ad quisquam autem?"
                                />
                                <Rating
                                    ratingVal={4}
                                    comment="Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Dolores, quae dolor.
                                        Maiores praesentium quia qui voluptates
                                        ab provident deleniti perspiciatis sequi
                                        laboriosam dolor, temporibus molestias
                                        iusto adipisci ad quisquam autem?"
                                />
                                <Rating
                                    ratingVal={3}
                                    comment="Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Dolores, quae dolor.
                                        Maiores praesentium quia qui voluptates
                                        ab provident deleniti perspiciatis sequi
                                        laboriosam dolor, temporibus molestias
                                        iusto adipisci ad quisquam autem?"
                                />
                                <Rating
                                    ratingVal={5}
                                    comment="Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Dolores, quae dolor.
                                        Maiores praesentium quia qui voluptates
                                        ab provident deleniti perspiciatis sequi
                                        laboriosam dolor, temporibus molestias
                                        iusto adipisci ad quisquam autem?"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carrier;

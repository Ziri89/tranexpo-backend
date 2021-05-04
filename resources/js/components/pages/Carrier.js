import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { useTranslation } from "react-i18next";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./Carrier.css";
const Carrier = () => {
    const { t, i18n } = useTranslation();
    const [rate, setRate] = useState({
        stars: 0,
        comment: ""
    });
    useEffect(() => {
        console.log(rate);
    }, [rate]);
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
                        <div className="col-12 col-lg-8">
                            <h2>{t("carrier_information")}</h2>
                            <dl className="border p-4 rounded">
                                <dt>{t("full_name")}</dt>
                                <dd>Elbert Addleman</dd>
                                <dt>E-mail</dt>
                                <dd>
                                    <a
                                        href="mailto:elbert@gmail.com"
                                        className="text-danger"
                                    >
                                        elbert@gmail.com
                                    </a>
                                </dd>
                                <dt>{t("company_name")}</dt>
                                <dd>Gosselin Moving</dd>
                                <dt>{t("phone")}</dt>
                                <dd>
                                    <a
                                        href="tel:+41583561400"
                                        className="text-danger"
                                    >
                                        +41583561400
                                    </a>
                                </dd>
                                <dt>{t("country")}</dt>
                                <dd>Switzerland</dd>
                                <dt>{t("city")}</dt>
                                <dd>Zurich</dd>
                                <dt>{t("zip_code")}</dt>
                                <dd>8050</dd>
                                <dt>{t("type_of_goods")}</dt>
                                <dd>
                                    Package, Pallet, Letter, bulky goods, Car
                                    and Truck, Machinery
                                </dd>
                            </dl>
                        </div>
                        <div className="col-12 col-lg-4">
                            <h2>{t("rate_the_carrier")}</h2>
                            <form>
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
                                    value={rate.stars}
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
                                    Submit
                                </button>
                            </form>
                        </div>
                        <div className="col-12">
                            <h2>{t("ratings")}</h2>
                            <div className="row">
                                <div className="col-12 col-lg-3">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        isHalf={true}
                                        emptyIcon={
                                            <i className="far fa-star"></i>
                                        }
                                        halfIcon={
                                            <i className="fa fa-star-half-alt"></i>
                                        }
                                        fullIcon={
                                            <i className="fa fa-star"></i>
                                        }
                                        activeColor="#ffd700"
                                        value={4.5}
                                        edit={false}
                                    />
                                    <p className="comment">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Dolores, quae dolor.
                                        Maiores praesentium quia qui voluptates
                                        ab provident deleniti perspiciatis sequi
                                        laboriosam dolor, temporibus molestias
                                        iusto adipisci ad quisquam autem?
                                    </p>
                                </div>
                                <div className="col-12 col-lg-3">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        isHalf={true}
                                        emptyIcon={
                                            <i className="far fa-star"></i>
                                        }
                                        halfIcon={
                                            <i className="fa fa-star-half-alt"></i>
                                        }
                                        fullIcon={
                                            <i className="fa fa-star"></i>
                                        }
                                        activeColor="#ffd700"
                                        value={4}
                                        edit={false}
                                    />
                                    <p className="comment">
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Exercitationem quidem
                                        voluptate nobis consequuntur est itaque
                                        molestias ea nam. Ducimus reiciendis
                                        recusandae illum neque cumque, sequi
                                        maiores debitis officiis veritatis
                                        impedit?
                                    </p>
                                </div>
                                <div className="col-12 col-lg-3">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        isHalf={true}
                                        emptyIcon={
                                            <i className="far fa-star"></i>
                                        }
                                        halfIcon={
                                            <i className="fa fa-star-half-alt"></i>
                                        }
                                        fullIcon={
                                            <i className="fa fa-star"></i>
                                        }
                                        activeColor="#ffd700"
                                        value={3}
                                        edit={false}
                                    />
                                    <p className="comment">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Excepturi molestiae
                                        aliquam aspernatur, nam recusandae ipsa
                                        odit eius hic accusantium animi,
                                        voluptas sint, quas voluptatem itaque
                                        impedit facere maxime et sapiente.
                                    </p>
                                </div>
                                <div className="col-12 col-lg-3">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        isHalf={true}
                                        emptyIcon={
                                            <i className="far fa-star"></i>
                                        }
                                        halfIcon={
                                            <i className="fa fa-star-half-alt"></i>
                                        }
                                        fullIcon={
                                            <i className="fa fa-star"></i>
                                        }
                                        activeColor="#ffd700"
                                        value={5}
                                        edit={false}
                                    />
                                    <p className="comment">
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit. Quo nesciunt dolorem
                                        inventore omnis harum asperiores
                                        laudantium eligendi aspernatur
                                        consequuntur accusantium labore optio
                                        aperiam vitae perferendis autem ex,
                                        animi repellat minus?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carrier;

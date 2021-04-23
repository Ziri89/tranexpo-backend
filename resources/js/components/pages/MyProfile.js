import React from "react";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import Banner from "../header/Banner";
import Storehous_1 from "../../img/storehous_1.jpg";
import "./MyProfile.css";

const MyProfile = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className="my-profile">
            <Banner
                image={Storehous_1}
                altText="STrucks"
                title={t("my_profile")}
            />
            <div className="container profile">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center">
                                    {t("hello")} Sasa Trkulja
                                </h2>
                                <h3></h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
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
                                    value="4.5"
                                    edit={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
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
                                    value="4"
                                    edit={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
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
                                    value="5"
                                    edit={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

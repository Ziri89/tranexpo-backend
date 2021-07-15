import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Banner from "../header/Banner";
import Storehous_1 from "../../img/storehous_1.jpg";
import Card from "../my-profile-card/Card";
import "./MyProfile.css";
import axios from "axios";

const MyProfile = () => {
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(false);
    let [unmounted, setUnmounted] = useState(false);
    const { t, i18n } = useTranslation();
    const linkGenerator = link => {
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        let source = axios.CancelToken.source();
        setLoading(true);
        axios
            .get("/api/parcelShow", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token ? user.token : null}`
                }
            })
            .then(res => {
                setLoading(false);
                setState(res.data.data);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        return () => {
            setUnmounted(true);
            source.cancel("axios request cancelled");
        };
    }, []);
    useEffect(() => {
        //console.log(state);
    }, [state]);
    const items =
        state !== null
            ? state.map(item => {
                  let typeOfGoods = JSON.parse(item.typeOfGoods);
                  return (
                      <div className="col-md-6 col-lg-4 mb-3" key={item.id}>
                          <Card
                              stateFrom={item.countryFrom}
                              cityFrom={item.cityFrom}
                              stateTo={item.countryTo}
                              cityTo={item.cityTo}
                              date={item.shippingDate}
                              type={typeOfGoods.map(type => {
                                  return type.name;
                              })}
                              url={`/carrier-offers/${item.id}`}
                          />
                      </div>
                  );
              })
            : null;
    return (
        <div className="my-profile">
            <Banner
                image={Storehous_1}
                altText="STrucks"
                title={t("my_profile")}
            />
            <div className="container profile">
                <div className="row">
                    <div className="col-12 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="text-center">
                                    {t("hello")} {user.data.name}
                                </h2>
                                <h3 className="text-center">
                                    {t("see_profile")}
                                </h3>
                            </div>
                        </div>
                    </div>
                    {items}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

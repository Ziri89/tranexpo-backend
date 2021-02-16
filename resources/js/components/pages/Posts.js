import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ReducedPost from "../posts/PostMultiple";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./Posts.css";

const Posts = () => {
    const { t, i18n } = useTranslation();
    const { user } = useSelector(state => state.auth);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    let [unmounted, setUnmounted] = useState(false);
    useEffect(() => {
        let source = axios.CancelToken.source();
        setLoading(true);
        if (user !== null && user.data.company_number) {
            axios
                .get("/api/parcelShow", {
                    headers: {
                        Authorization: `Bearer ${
                            user.token ? user.token : null
                        }`
                    }
                })
                .then(res => {
                    console.log(res.data.data);
                    return res.data.data;
                })
                .then(data => {
                    setPost(data);
                    setLoading(false);
                    console.log(data);
                })
                .catch(err => {
                    setErrMsg(`${t("")}`);
                    console.log(err);
                    setLoading(false);
                });
        }

        return () => {
            setUnmounted(true);
            source.cancel("axios request cancelled");
        };
    }, []);
    const posts =
        post !== null
            ? post.map(item => {
                  return (
                      <ReducedPost
                          key={item.id}
                          image={`images/${item.image}`}
                          altText="Post Image"
                          from={`${item.countryFrom}, ${item.cityFrom}`}
                          to={`${item.countryTo}, ${item.cityTo}`}
                          date={item.shippingDate}
                          id={item.id}
                      />
                  );
              })
            : null;

    return (
        <div className="posts">
            <Banner
                image={Storehouse_2}
                altText="Storehouse"
                title={t("transportation_offers")}
            />
            <div className="container mb-5">
                {!errMsg ? (
                    <div className="row">
                        {loading ? (
                            <div className="col-6 m-auto text-center">
                                <img src={Loader} alt="Loader" />
                            </div>
                        ) : (
                            posts
                        )}
                    </div>
                ) : (
                    <p className="text-danger text-center">{errMsg}</p>
                )}
            </div>
        </div>
    );
};
export default Posts;

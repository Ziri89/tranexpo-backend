import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import OnePost from "../posts/TravelerOnePost";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./SinglePost.css";

const TravelerPost = () => {
    const { t, i18n } = useTranslation();
    const { user } = useSelector(state => state.auth);
    const [post, setPost] = useState(null);
    const [postOwner, setPostOwner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const { id } = useParams();
    //console.log(id);
    let [unmounted, setUnmounted] = useState(false);
    useEffect(() => {
        let source = axios.CancelToken.source();
        setLoading(true);
        if (user !== null && user.data.vehicle_number) {
            axios
                .get(`/api/passengerShowById/${id}`, {
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
                    setPost({
                        ...post,
                        user_id: data.user_id,
                        countryFrom: data.countryFrom,
                        cityFrom: data.cityFrom,
                        countryTo: data.countryTo,
                        cityTo: data.cityTo,
                        departureDate: data.departureDate,
                        dateOfReturn: data.dateOfReturn,
                        ticket: data.onewayOrReturn
                    });
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
    useEffect(() => {
        if (post !== null) {
            setPostOwner({
                ...postOwner,
                loading: false
            });
            axios
                .get(`/api/user/${post.user_id}`)
                .then(res => {
                    console.log(res.data.user);

                    setPostOwner({
                        ...postOwner,
                        name: res.data.user.name,
                        email: res.data.user.email,
                        phone: res.data.user.phone,
                        loading: false
                    });
                })
                .catch(err => {
                    setPostOwner({
                        ...postOwner,
                        error_msg: err.msg,
                        loading: false
                    });
                });
        }
        return () => {
            setPostOwner({
                ...postOwner,
                loadingOwner: false
            });
        };
    }, [post]);
    const onePost =
        post !== null && postOwner !== null ? (
            <OnePost
                person={postOwner.name}
                email={postOwner.email}
                phone={postOwner.phone}
                from={`${post.countryFrom}, ${post.cityFrom}`}
                to={`${post.countryTo}, ${post.cityTo}`}
                departuredate={post.departureDate}
                returndate={post.dateOfReturn}
                ticket={post.ticket}
            />
        ) : null;

    return (
        <div className="post">
            <Banner
                image={Storehouse_2}
                altText="Storehouse"
                title={t("transportation_offers")}
            />
            <div className="container mb-5">
                {!errMsg ? (
                    <div className="row justify-content-center">
                        {loading ? (
                            <div className="col-6 m-auto text-center">
                                <img src={Loader} alt="Loader" />
                            </div>
                        ) : (
                            onePost
                        )}
                    </div>
                ) : (
                    <p className="text-danger text-center">{errMsg}</p>
                )}
            </div>
        </div>
    );
};
export default TravelerPost;

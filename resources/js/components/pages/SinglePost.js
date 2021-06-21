import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import OnePost from "../posts/OnePost";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./SinglePost.css";

const Posts = () => {
    const { t } = useTranslation();
    const { user } = useSelector(state => state.auth);
    const [post, setPost] = useState(null);
    const [postOwner, setPostOwner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const { id } = useParams();
    const [applay, setApplay] = useState({
        price: "",
        shipperId: "",
        parcelId: "",
        message: "",
        err: false
    });
    //console.log(id);
    let [unmounted, setUnmounted] = useState(false);
    useEffect(() => {
        let source = axios.CancelToken.source();
        setLoading(true);
        if (user !== null && user.data.vehicle_number) {
            axios
                .get(`/api/parcelShowById/${id}`, {
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
                        checkFrom: data.checkFrom,
                        countryTo: data.countryTo,
                        cityTo: data.cityTo,
                        checkTo: data.checkTo,
                        shippingDate: data.shippingDate,
                        typeOfGoods: JSON.parse(data.typeOfGoods),
                        quantity: JSON.parse(data.quantity),
                        weight: JSON.parse(data.weight),
                        lenght: JSON.parse(data.lenght),
                        width: JSON.parse(data.width),
                        height: JSON.parse(data.height),
                        image: data.image,
                        id: data.id
                    });
                    setLoading(false);
                    // console.log(data);
                })
                .catch(err => {
                    setErrMsg(`${t("")}`);
                    //console.log(err);
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
                        company: res.data.user.company_name,
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
    const applayForJobHanndler = ev => {
        ev.preventDefault();
        let formdata = new FormData();
        formdata.append("price", applay.price);
        formdata.append("shipper_id", applay.shipperId);
        formdata.append("parcel_id", applay.parcelId);
        axios
            .post("/api/price", formdata, {
                headers: {
                    Authorization: `Bearer ${user.token ? user.token : null}`,
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(() => {
                setApplay({
                    ...applay,
                    message: `${t("offer_submitted")}`,
                    err: false
                });
            })
            .catch(err => {
                console.log(err);
                setApplay({
                    ...applay,
                    message: `${t("something_is_wrong")}`,
                    err: true
                });
            });
    };
    const setPriceHandler = ev => {
        const { value } = ev.target;
        if (post !== null && user) {
            setApplay({
                ...applay,
                price: value,
                shipperId: user.data.id,
                parcelId: post.id
            });
        }
    };
    useEffect(() => {
        console.log(applay);
    }, [applay]);
    const onePost =
        post !== null && postOwner !== null ? (
            <OnePost
                image={
                    post.image ? `images/${post.image}` : `images/no-image.png`
                }
                altText="Post Image"
                person={postOwner.name}
                company={postOwner.company}
                from={`${post.countryFrom}, ${post.cityFrom}`}
                to={`${post.countryTo}, ${post.cityTo}`}
                date={post.shippingDate}
                type={post.typeOfGoods[0].name}
                quantity={post.quantity.map((item, key) => {
                    return key + 1 + ": " + item + "kom, ";
                })}
                weight={post.weight.map((item, key) => {
                    return key + 1 + ": " + item + "kg, ";
                })}
                lenght={post.lenght.map((item, key) => {
                    return key + 1 + ": " + item + "cm, ";
                })}
                width={post.width.map((item, key) => {
                    return key + 1 + ": " + item + "cm, ";
                })}
                height={post.height.map((item, key) => {
                    return key + 1 + ": " + item + "cm" + ", ";
                })}
                onSubmit={applayForJobHanndler}
                onChangePrice={setPriceHandler}
                price={applay.price}
                message={applay.message}
                attrVal={applay.err ? "error" : "success"}
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
                    <div className="row">
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
export default Posts;

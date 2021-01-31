import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../posts/Post";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import "./Posts.css";

const Posts = () => {
    const [post, setPost] = useState(null);
    let [unmounted, setUnmounted] = useState(false);
    useEffect(() => {
        let source = axios.CancelToken.source();
        axios
            .get("/api/parcelShow")
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err.message);
            });
        return () => {
            setUnmounted(true);
            source.cancel("axios request cancelled");
        };
    }, [post]);
    return (
        <div className="posts">
            <Banner
                image={Storehouse_2}
                altText="Storehouse"
                title="Transportation offers"
            />
            <div className="container mb-5">
                <div className="row">
                    <Post
                        image={Storehouse_2}
                        altText="Storehouse"
                        person="Dordje Djordjevic"
                        email="example@gmail.com"
                        phone="+38765444444"
                        from="Bosnia and Hertzegovina, Sarajevo"
                        to="Austria, Vienna"
                        date="01.03.2021"
                        type="parcel"
                        quantity="45"
                        weight="450"
                        lenght="150"
                        width="75"
                        height="125"
                    />
                </div>
            </div>
        </div>
    );
};
export default Posts;

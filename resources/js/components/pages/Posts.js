import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../posts/Post";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./Posts.css";

const Posts = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    let [unmounted, setUnmounted] = useState(false);
    useEffect(() => {
        let source = axios.CancelToken.source();
        setLoading(true);
        axios
            .get("/api/parcelShow")
            .then(res => {
                setPost(res.data.data);
                console.log(res.data.data);
            })
            .then(() => {
                setLoading(false);
            })
            .catch(err => {
                setErrMsg("Something went wrong. Please try latter");
                console.log(err);
                setLoading(false);
            });

        return () => {
            setUnmounted(true);
            source.cancel("axios request cancelled");
        };
    }, []);
    const posts =
        post !== null
            ? post.map(item => {
                  return (
                      <Post
                          key={item.id}
                          image={`images/${item.image}`}
                          altText="Post Image"
                          person="Djordje Djordjevic"
                          email="example@gmail.com"
                          phone="+38765444444"
                          from={`${item.countryFrom}, ${item.cityFrom}`}
                          to={`${item.countryTo}, ${item.cityTo}`}
                          date={item.shippingDate}
                          type={`${item.parcel === 1 ? "parcel" : ""}, ${
                              item.envelope === 1 ? "envelope" : ""
                          }, ${item.pallet === 1 ? "pallet" : ""}`}
                          quantity={item.quantity}
                          weight={item.weight}
                          lenght={item.lenght}
                          width={item.width}
                          height={item.height}
                      />
                  );
              })
            : null;

    return (
        <div className="posts">
            <Banner
                image={Storehouse_2}
                altText="Storehouse"
                title="Transportation offers"
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

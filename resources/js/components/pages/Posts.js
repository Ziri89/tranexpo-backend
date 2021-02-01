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
                setPost(res.data.data);
                console.log(res.data.data);
            })
            .catch(err => {
                console.log(err.message);
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
                          person="Dordje Djordjevic"
                          email="example@gmail.com"
                          phone="+38765444444"
                          from={`${item.countryFrom}, ${item.cityFrom}`}
                          to={`${item.countryTo}, ${item.cityTo}`}
                          date={item.shippingDate}
                          type={`${item.parcel === 1 ? "parcel" : null}, ${
                              item.envelope === 1 ? "envelope" : null
                          }, ${item.pallet === 1 ? "pallet" : null}`}
                          quantity={item.quantity}
                          weight={`${item.weight}kg`}
                          lenght={`${item.lenght}cm`}
                          width={`${item.width}cm`}
                          height={`${item.height}cm`}
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
                <div className="row">{posts}</div>
            </div>
        </div>
    );
};
export default Posts;

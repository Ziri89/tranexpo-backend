import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ReducedPost from "../posts/TravelerMultiplePost";
import Storehouse_2 from "../../img/storehous_2.jpg";
import Banner from "../header/Banner";
import Loader from "../../img/img-loader.gif";
import "./Posts.css";

const PassengersPosts = () => {
    const { t, i18n } = useTranslation();
    const { user } = useSelector(state => state.auth);
    const [post, setPost] = useState(null);
    const [paginationLinks, setPaginationLinks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    let [unmounted, setUnmounted] = useState(false);

    useEffect(() => {
        let source = axios.CancelToken.source();
        setLoading(true);
        if (user !== null && user.data.vehicle_number) {
            let csrf = RegExp("XSRF-TOKEN[^;]+").exec(document.cookie);
            csrf = decodeURIComponent(
                csrf ? csrf.toString().replace(/^[^=]+./, "") : ""
            );

            axios
                .get("/api/passengerShow", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrf,
                        Authorization: `Bearer ${
                            user.token ? user.token : null
                        }`
                    }
                })
                .then(res => {
                    return res.data;
                })
                .then(data => {
                    setPost(data.data);
                    setPaginationLinks(data.links);
                    setLoading(false);
                })
                .catch(err => {
                    setErrMsg(`${t("")}`);
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
                          date={item.departureDate}
                          id={item.id}
                      />
                  );
              })
            : null;
    const pagination = paginationLinks
        ? paginationLinks.map((item, key) => {
              return (
                  <li
                      key={key}
                      className={`page-item ${
                          item.url === null ? "disabled" : ""
                      }`}
                  >
                      <a
                          className={`page-link ${
                              item.active === true ? "active" : ""
                          }`}
                          href="#"
                          onClick={ev => {
                              ev.preventDefault();
                              setLoading(true);
                              axios
                                  .get(item.url, {
                                      headers: {
                                          Authorization: `Bearer ${
                                              user.token ? user.token : null
                                          }`
                                      }
                                  })
                                  .then(res => {
                                      setPost(res.data.data);
                                      setPaginationLinks(res.data.links);
                                      setLoading(false);
                                      //console.log(paginationLinks);
                                  })
                                  .catch(err => {
                                      //console.log(err);
                                      setLoading(false);
                                  });
                          }}
                      >
                          {item.label === "&laquo; Previous"
                              ? "<<"
                              : item.label === "Next &raquo;"
                              ? ">>"
                              : item.label}
                      </a>
                  </li>
              );
          })
        : null;
    return (
        <div className="posts">
            <Banner
                image={Storehouse_2}
                altText="Storehouse"
                title={t("passenger_posts")}
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
            <nav className="page-pagination d-flex">
                <ul className="pagination mx-auto">{pagination}</ul>
            </nav>
        </div>
    );
};
export default PassengersPosts;

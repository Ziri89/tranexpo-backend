import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Goods = () => {
    const [state, setState] = useState(null);
    const [paginationLinks, setPaginationLinks] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.auth);
    let [unmounted, setUnmounted] = useState(false);
    useEffect(() => {
        let source = axios.CancelToken.source();
        if (user !== null && !user.data.city) {
            let csrf = RegExp("XSRF-TOKEN[^;]+").exec(document.cookie);
            csrf = decodeURIComponent(
                csrf ? csrf.toString().replace(/^[^=]+./, "") : ""
            );
            setLoading(true);
            axios
                .get("/api/parcelShow", {
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
                    setState(res.data.data);
                    setPaginationLinks(res.data.links);
                    setLoading(false);
                })
                .catch(err => {
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
        console.log(state);
    }, [state]);
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
                                      setState(res.data.data);
                                      setPaginationLinks(res.data.links);
                                      setLoading(false);
                                      console.log(paginationLinks);
                                  })
                                  .catch(err => {
                                      console.log(err);
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
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Zemlja polaska</th>
                        <th scope="col">Grad polaska</th>
                        <th scope="col">Zemlja isporuke</th>
                        <th scope="col">Grad isporuke</th>
                        <th scope="col">Status pošiljaoca</th>
                        <th scope="col">Status primaoca</th>
                        <th scope="col">Paket</th>
                        <th scope="col">Koverta</th>
                        <th scope="col">Palete</th>
                        <th scope="col">Količina</th>
                        <th scope="col">Težina</th>
                        <th scope="col">Dužina</th>
                        <th scope="col">Širina</th>
                        <th scope="col">Visina</th>
                        <th scope="col">Datum polaska</th>
                        <th scope="col">Obriši</th>
                    </tr>
                </thead>
                <tbody>
                    {state === null
                        ? null
                        : state.map((item, key) => {
                              return (
                                  <tr key={key}>
                                      <th scope="row">{key + 1}</th>
                                      <td>{item.countryFrom}</td>
                                      <td>{item.cityFrom}</td>
                                      <td>{item.countryTo}</td>
                                      <td>{item.cityTo}</td>
                                      <td>{item.checkFrom}</td>
                                      <td>{item.checkTo}</td>
                                      <td>{item.parcel}</td>
                                      <td>{item.envelope}</td>
                                      <td>{item.pallet}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.weight}</td>
                                      <td>{item.lenght}</td>
                                      <td>{item.width}</td>
                                      <td>{item.height}</td>
                                      <td>{item.shippingDate}</td>
                                      <td>
                                          <button
                                              type="button"
                                              onClick={ev => {
                                                  if (
                                                      user !== null &&
                                                      !user.data.city
                                                  ) {
                                                      let csrf = RegExp(
                                                          "XSRF-TOKEN[^;]+"
                                                      ).exec(document.cookie);
                                                      csrf = decodeURIComponent(
                                                          csrf
                                                              ? csrf
                                                                    .toString()
                                                                    .replace(
                                                                        /^[^=]+./,
                                                                        ""
                                                                    )
                                                              : ""
                                                      );
                                                      axios.delete(
                                                          `/api/deleteParcel/${item.id}`,
                                                          {
                                                              headers: {
                                                                  Accept:
                                                                      "application/json",
                                                                  "Content-Type":
                                                                      "application/json",
                                                                  "X-CSRF-TOKEN": csrf,
                                                                  Authorization: `Bearer ${
                                                                      user.token
                                                                          ? user.token
                                                                          : null
                                                                  }`
                                                              }
                                                          }
                                                      );
                                                      ev.target.parentElement.parentElement.remove();
                                                  }
                                              }}
                                          >
                                              X
                                          </button>
                                      </td>
                                  </tr>
                              );
                          })}
                </tbody>
            </table>
            <nav className="page-pagination d-flex">
                <ul className="pagination mx-auto">{pagination}</ul>
            </nav>
        </div>
    );
};

export default Goods;

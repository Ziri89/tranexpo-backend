import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Passengers = () => {
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
                        <th scope="col">Zemlja odredišta</th>
                        <th scope="col">Grad odredišta</th>
                        <th scope="col">Datum polaska</th>
                        <th scope="col">Datum povratka</th>
                        <th scope="col">Pravci</th>
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
                                      <td>{item.departureDate}</td>
                                      <td>{item.dateOfReturn}</td>
                                      <td>{item.onewayOrReturn}</td>
                                      <td>
                                          <button type="button">X</button>
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

export default Passengers;

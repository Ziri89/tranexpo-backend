import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Carriers = () => {
    let source = axios.CancelToken.source();
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
                .get("/api/shipperAll", {
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
                    //console.log(err);
                    setLoading(false);
                });
        }

        return () => {
            setUnmounted(true);
            source.cancel("axios request cancelled");
        };
    }, []);
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
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ime i prezime</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ime kompanije</th>
                        <th scope="col">Registarski broj kompanije</th>
                        <th scope="col">Telefon</th>
                        <th scope="col">Država</th>
                        <th scope="col">Grad</th>
                        <th scope="col">Poštanski broj</th>
                        <th scope="col">Broj vozila</th>
                        <th scope="col">Datum uplate paketa</th>
                        <th scope="col">Datum isteka pakeat</th>
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
                                      <td>{item.name}</td>
                                      <td>{item.email}</td>
                                      <td>{item.company_name}</td>
                                      <td>{item.company_number}</td>
                                      <td>{item.phone}</td>
                                      <td>{item.country}</td>
                                      <td>{item.city}</td>
                                      <td>{item.zip_code}</td>
                                      <td>{item.vehicle_number}</td>
                                      <td>{item.startPay}</td>
                                      <td>{item.endPay}</td>
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
                                                          `/api/deleteshipper/${item.id}`,
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

export default Carriers;

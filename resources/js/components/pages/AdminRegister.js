import React, { useState, useEffect } from "react";
import axios from "axios";

//import { API_BASE_URL } from "../config/config";
const AdminRegister = () => {
    const [admin, setAdmin] = useState({
        email: "",
        password: ""
    });
    const submitAdmin = ev => {
        ev.preventDefault();
        axios
            .post("api/registerAdmin", {
                email: admin.email,
                password: admin.password
            })
            .then(res => {
                //console.log(res);
                setAdmin({
                    email: "",
                    password: ""
                });
            })
            .catch(err => {
                //console.log(err);
                setAdmin({
                    email: "",
                    password: ""
                });
            });
    };
    return (
        <div>
            <div className="container my-5">
                <div className="row justify-content-center alogn-items-center">
                    <div className="card col-lg-6 py-4">
                        <div className="caed-body">
                            <form onSubmit={submitAdmin}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        id="email"
                                        value={admin.email}
                                        onChange={ev =>
                                            setAdmin({
                                                ...admin,
                                                email: ev.target.value
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        id="password"
                                        value={admin.password}
                                        onChange={ev =>
                                            setAdmin({
                                                ...admin,
                                                password: ev.target.value
                                            })
                                        }
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;

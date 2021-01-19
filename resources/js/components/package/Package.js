import React from "react";
import { Link } from "react-router-dom";

const Package = props => {
    return (
        <div className="col-lg-4 mb-4">
            <div className="card">
                <div className="card-header bg-danger text-white">
                    <h3 className="text-center">
                        {props.plan} / {props.title}
                    </h3>
                    <p>
                        This package allows you to use our web application for{" "}
                        {props.number} months
                    </p>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Price: {props.price}€</h5>
                    <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                    </p>
                    <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target={props.target}
                        onClick={props.click}
                    >
                        Bay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Package;

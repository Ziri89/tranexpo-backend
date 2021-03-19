import React from "react";
import { useTranslation } from "react-i18next";

const Package = props => {
    const { t, i18n } = useTranslation();
    return (
        <div className="col-lg-4 mb-4">
            <div className="card">
                <div className="card-header bg-danger text-white">
                    <h3 className="text-center">
                        {props.plan} / {props.title}
                    </h3>
                    <p>
                        {t("use_application")} {props.number} {props.time}
                    </p>
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        {t("price")}: {props.price}€
                    </h5>
                    <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                    </p>
                    <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target={props.target}
                        data-price={props.price}
                        data-text={props.text}
                        data-limit={props.limit}
                        onClick={props.click}
                    >
                        {t("bay_now")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Package;

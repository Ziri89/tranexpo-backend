import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
const ReducedPost = props => {
    const { t, i18n } = useTranslation();
    return (
        <div className="post col-4 mb-4">
            <div className="card">
                <img
                    src={props.image}
                    alt={props.altText}
                    className="card-img-top"
                />
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            {t("shipment_from")}: {props.from}
                        </li>
                        <li className="list-group-item">
                            {t("shipment_to")}: {props.to}
                        </li>
                        <li className="list-group-item">
                            {t("shipping_date")}: {props.date}
                        </li>
                    </ul>
                    <Link
                        to={`single-post/${props.id}`}
                        className="btn btn-danger"
                    >
                        {t("see_more")}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReducedPost;

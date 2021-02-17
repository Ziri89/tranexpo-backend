import React from "react";
import { useTranslation } from "react-i18next";
const Post = props => {
    const { t, i18n } = useTranslation();
    return (
        <div className="single-post col-12 mb-4">
            <div className="card">
                <div className="row">
                    <div className="col-lg-6">
                        <img
                            src={props.image}
                            alt={props.altText}
                            className="card-img-top"
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className="card-body">
                            <h5 className="card-title">
                                {t("contact")}: {props.person}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Email:{" "}
                                <a
                                    href={`mailto: ${props.email}`}
                                    className="text-danger"
                                >
                                    {props.email}
                                </a>
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {t("phone")}:{" "}
                                <a
                                    href={`tel: ${props.phone}`}
                                    className="text-danger"
                                >
                                    {props.phone}
                                </a>
                            </h6>
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
                                <li className="list-group-item">
                                    {t("type_of_shipment")}: {props.type}
                                </li>
                                <li className="list-group-item">
                                    {t("quantity")}: {props.quantity}
                                </li>
                                <li className="list-group-item">
                                    {t("weight_unit")}: {props.weight}kg
                                </li>
                                <li className="list-group-item">
                                    {t("lenght")}: {props.lenght}cm
                                </li>
                                <li className="list-group-item">
                                    {t("width")}: {props.width}cm
                                </li>
                                <li className="list-group-item">
                                    {t("height")}: {props.height}cm
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;

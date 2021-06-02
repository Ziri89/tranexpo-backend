import React from "react";
import { useTranslation } from "react-i18next";
const Post = props => {
    const { t, i18n } = useTranslation();
    return (
        <>
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
                                <h3 className="card-title h4">
                                    {t("contact")}: {props.person}
                                </h3>
                                <p>
                                    {t("company_name")}: {props.company}
                                </p>

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
                                        {t("weight_unit")}: {props.weight}
                                    </li>
                                    <li className="list-group-item">
                                        {t("lenght")}: {props.lenght}
                                    </li>
                                    <li className="list-group-item">
                                        {t("width")}: {props.width}
                                    </li>
                                    <li className="list-group-item">
                                        {t("height")}: {props.height}
                                    </li>
                                </ul>
                                <button
                                    className="btn btn-danger"
                                    data-toggle="modal"
                                    data-target="#applay"
                                    type="button"
                                >
                                    {t("apply_for_job")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="applay"
                tabIndex="-1"
                aria-labelledby="applayLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="applayLabel">
                                {t("apply_for_job")}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={props.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="price">{t("price")}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="price"
                                        aria-describedby="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        aria-describedby="hidden"
                                        value={props.shipperId}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                >
                                    {t("send")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;

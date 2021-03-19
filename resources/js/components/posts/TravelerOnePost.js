import React from "react";
import { useTranslation } from "react-i18next";
const TravelerPost = props => {
    const { t, i18n } = useTranslation();
    return (
        <div className="single-post col-6 mb-4">
            <div className="card">
                <div className="row justify-content-center">
                    <div className="col-12">
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
                                    {t("place_of_departure")}: {props.from}
                                </li>
                                <li className="list-group-item">
                                    {t("destination")}: {props.to}
                                </li>
                                <li className="list-group-item">
                                    {t("ticket")}: {props.ticket}
                                </li>
                                <li className="list-group-item">
                                    {t("departure_date")}: {props.departuredate}
                                </li>
                                <li className="list-group-item">
                                    {t("date_of_return")}: {props.returndate}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelerPost;

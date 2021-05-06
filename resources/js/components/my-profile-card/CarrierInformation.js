import React from "react";
import { useTranslation } from "react-i18next";

function CarrierInformation(props) {
    const { t } = useTranslation();
    const {
        name,
        email,
        company,
        phone,
        state,
        city,
        zipCode,
        typeOfGoods
    } = props;
    return (
        <div className="col-12 col-lg-8">
            <h2>{t("carrier_information")}</h2>
            <dl className="border p-4 rounded">
                <dt>{t("full_name")}</dt>
                <dd>{name}</dd>
                <dt>E-mail</dt>
                <dd>
                    <a href={`mailto:${email}`} className="text-danger">
                        {email}
                    </a>
                </dd>
                <dt>{t("company_name")}</dt>
                <dd>{company}</dd>
                <dt>{t("phone")}</dt>
                <dd>
                    <a href={`tel:${phone}`} className="text-danger">
                        {phone}
                    </a>
                </dd>
                <dt>{t("country")}</dt>
                <dd>{state}</dd>
                <dt>{t("city")}</dt>
                <dd>{city}</dd>
                <dt>{t("zip_code")}</dt>
                <dd>{zipCode}</dd>
                <dt>{t("type_of_transport")}</dt>
                <dd>{typeOfGoods}</dd>
            </dl>
        </div>
    );
}

export default CarrierInformation;

import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector } from "react-redux";
import Package from "../package/Package";
import Banner from "../header/Banner";
import StoreHouse_4 from "../../img/storehous_4.jpg";
import "./PackagePlans.css";
import { useTranslation } from "react-i18next";

const PackagesPlan = () => {
    const { user } = useSelector(state => state.auth);
    const { t, i18n } = useTranslation();
    const [modal, setModal] = useState(false);
    const options = [
        {
            id: "a21d1336-49f4-4a01-840e-c476522af706",
            plan: `${t("basic")}`,
            title: `${t("one_month")}`,
            number: 1,
            time: `${t("month")}`,
            price:
                user.data.country === "CH"
                    ? 64
                    : user.data.country === "BA" || "HR" || "MK" || "ME" || "RS"
                    ? 15
                    : 29
        },
        {
            id: "813dc1e3-f128-4e75-99e4-960806dd1a1e",
            plan: `${t("basic")}`,
            title: `${t("six_months")}`,
            number: 6,
            time: `${t("months")}`,
            price:
                user.data.country === "CH"
                    ? 332
                    : user.data.country === "BA" || "HR" || "MK" || "ME" || "RS"
                    ? 79
                    : 159
        },
        {
            id: "c3d49e89-83e5-43cf-8ef8-f763473c3359",
            plan: `${t("basic")}`,
            title: `${t("a_year")}`,
            number: 12,
            time: `${t("months")}`,
            price:
                user.data.country === "CH"
                    ? 600
                    : user.data.country === "BA" || "HR" || "MK" || "ME" || "RS"
                    ? 149
                    : 309
        }
    ];
    const clickModalBtnHandler = () => {
        setModal(!modal);
    };

    const content = options.map(item => {
        return (
            <Package
                key={item.id}
                plan={item.plan}
                title={item.title}
                number={item.number}
                time={item.time}
                price={item.price}
                target="paypal"
                click={clickModalBtnHandler}
            />
        );
    });

    return (
        <div className="package-plans">
            <Banner
                image={StoreHouse_4}
                altText="Storehouse"
                title={t("our_packages")}
            />
            <div className="container packages mb-5">
                <div className="row">{content}</div>
            </div>
            {modal ? (
                <div id="paypal-parent">
                    <PayPalButton
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "USD",
                                            value: "0.01"
                                        }
                                    }
                                ]
                                // application_context: {
                                //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                                // }
                            });
                        }}
                        onApprove={(data, actions) => {
                            // Capture the funds from the transaction
                            return actions.order
                                .capture()
                                .then(function(details) {
                                    // Show a success message to your buyer
                                    alert(
                                        "Transaction completed by " +
                                            details.payer.name.given_name
                                    );

                                    // OPTIONAL: Call your server to save the transaction
                                    return fetch(
                                        "/paypal-transaction-complete",
                                        {
                                            method: "post",
                                            body: JSON.stringify({
                                                orderID: data.orderID
                                            })
                                        }
                                    );
                                });
                        }}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default PackagesPlan;

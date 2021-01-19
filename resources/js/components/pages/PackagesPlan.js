import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import Package from "../package/Package";
import Banner from "../header/Banner";
import StoreHouse_4 from "../../img/storehous_4.jpg";
import "./PackagePlans.css";

const PackagesPlan = () => {
    const [modal, setModal] = useState(false);
    const options = [
        {
            id: "a21d1336-49f4-4a01-840e-c476522af706",
            plan: "Basic",
            title: "Three months",
            number: 3,
            price: 10
        },
        {
            id: "813dc1e3-f128-4e75-99e4-960806dd1a1e",
            plan: "Basic",
            title: "Six months",
            number: 6,
            price: 15
        },
        {
            id: "c3d49e89-83e5-43cf-8ef8-f763473c3359",
            plan: "Basic",
            title: "A year",
            number: 12,
            price: 30
        },
        {
            id: "1a9f793e-ff5c-4cf5-8369-19f77fc12748",
            plan: "Premium",
            title: "Three months",
            number: 3,
            price: 20
        },
        {
            id: "c5c13044-3ec5-4957-acb3-37c5aa77d60d",
            plan: "Premium",
            title: "Six months",
            number: 6,
            price: 35
        },
        {
            id: "ef527429-769d-4bbb-9318-1ff35daa4175",
            plan: "Premium",
            title: "A year",
            number: 12,
            price: 65
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
                title="Our packages"
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

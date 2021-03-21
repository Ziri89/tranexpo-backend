import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as moment from "moment";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function PayPal(props) {
    const paypal = useRef();
    const history = useHistory();
    const today = new Date();
    let expiresDate = new Date();
    expiresDate.setMonth(expiresDate.getMonth() + props.limit);
    const { user } = useSelector(state => state.auth);
    const { i18n } = useTranslation();
    const linkGenerator = link => {
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: props.desription,
                                amount: {
                                    currency_code: "EUR",
                                    value: props.value
                                }
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    const timeData = await {
                        ...user.data,
                        startPay: moment(today).format("YYYY-MM-DD"),
                        endPay: moment(expiresDate).format("YYYY-MM-DD")
                    };
                    const req = await axios
                        .put(`/api/updateshipper/${user.data.id}`, timeData, {
                            headers: {
                                Authorization: `Bearer ${
                                    user.token ? user.token : null
                                }`
                            }
                        })
                        .then(res => {
                            console.log("It's paid");
                            history.push(linkGenerator("/posts"));
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                },
                onError: err => {
                    console.log(err);
                }
            })
            .render(paypal.current);
    }, []);
    return (
        <>
            <div ref={paypal}></div>
        </>
    );
}

export default PayPal;

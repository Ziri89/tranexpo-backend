import React, { useRef, useEffect } from "react";

function PayPal(props) {
    const paypal = useRef();
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
                    console.log(order, data);
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

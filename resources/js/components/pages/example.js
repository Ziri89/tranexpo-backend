import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import ReactStars from "react-rating-stars-component";

const Example = () => {
    const ratingChanged = newRating => {
        console.log(newRating);
    };
    return (
        <React.Fragment>
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
                    return actions.order.capture().then(function(details) {
                        // Show a success message to your buyer
                        alert(
                            "Transaction completed by " +
                                details.payer.name.given_name
                        );

                        // OPTIONAL: Call your server to save the transaction
                        return fetch("/paypal-transaction-complete", {
                            method: "post",
                            body: JSON.stringify({
                                orderID: data.orderID
                            })
                        });
                    });
                }}
            />
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={38}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                classNames="stars"
            />
        </React.Fragment>
    );
};
export default Example;

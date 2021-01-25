import React from "react";

const Post = props => {
    return (
        <div className="post col-lg-6">
            <div className="card">
                <img
                    src={props.image}
                    alt={props.altText}
                    className="card-img-top"
                />
                <div className="card-body">
                    <h5 className="card-title">{props.person}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        <a
                            href={`mailto: ${props.email}`}
                            className="text-danger"
                        >
                            {props.email}
                        </a>
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        <a href={`tel: ${props.phone}`} className="text-danger">
                            {props.phone}
                        </a>
                    </h6>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            Shipment from: {props.from}
                        </li>
                        <li className="list-group-item">
                            Shipment to: {props.to}
                        </li>
                        <li className="list-group-item">
                            Shipping date: {props.date}
                        </li>
                        <li className="list-group-item">
                            Type of shipment: {props.type}
                        </li>
                        <li className="list-group-item">
                            Quantity: {props.quantity}
                        </li>
                        <li className="list-group-item">
                            Weight/unit: {props.weight}kg
                        </li>
                        <li className="list-group-item">
                            Lenght: {props.lenght}cm
                        </li>
                        <li className="list-group-item">
                            Width: {props.width}cm
                        </li>
                        <li className="list-group-item">
                            Height: {props.height}cm
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Post;

import React from "react";
import "./Banner.css";

const Banner = props => {
    return (
        <div className="banner">
            <img src={props.image} alt={props.altText} />
            <h1>{props.title}</h1>
        </div>
    );
};
export default Banner;

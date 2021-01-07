import React from "react";
import HomeSlider from "../slider/HomeSlider";
import ShipmentForm from "../shipment/ShipmentForm";

const Home = () => {
    return (
        <div className="home">
            <HomeSlider />
            <ShipmentForm />
        </div>
    );
};
export default Home;

import React from "react";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
    return (
        <footer className="d-flex justify-content-center p-4 bg-dark text-white">
            <p className="m-0">TranExpo © {year}</p>
        </footer>
    );
};

export default Footer;

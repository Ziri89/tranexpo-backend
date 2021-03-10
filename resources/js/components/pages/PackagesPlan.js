import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Package from "../package/Package";
import Banner from "../header/Banner";
import StoreHouse_4 from "../../img/storehous_4.jpg";
import "./PackagePlans.css";
import { useTranslation } from "react-i18next";
import PayPal from "../paypal/PayPal";
import { set } from "js-cookie";

const PackagesPlan = () => {
    const { user } = useSelector(state => state.auth);
    const { t, i18n } = useTranslation();
    const [modal, setModal] = useState(false);
    const [packagePrice, setPackagePrice] = useState();
    const [text, setText] = useState();
    const options = [
        {
            id: "a21d1336-49f4-4a01-840e-c476522af706",
            plan: `${t("basic")}`,
            title: `${t("one_month")}`,
            number: 1,
            time: `${t("month")}`,
            price:
                user.data.country === "CH"
                    ? "64.00"
                    : user.data.country === "BA" || "HR" || "MK" || "ME" || "RS"
                    ? "15.00"
                    : "29.00"
        },
        {
            id: "813dc1e3-f128-4e75-99e4-960806dd1a1e",
            plan: `${t("basic")}`,
            title: `${t("six_months")}`,
            number: 6,
            time: `${t("months")}`,
            price:
                user.data.country === "CH"
                    ? "332.00"
                    : user.data.country === "BA" || "HR" || "MK" || "ME" || "RS"
                    ? "79.00"
                    : "159.00"
        },
        {
            id: "c3d49e89-83e5-43cf-8ef8-f763473c3359",
            plan: `${t("basic")}`,
            title: `${t("a_year")}`,
            number: 12,
            time: `${t("months")}`,
            price:
                user.data.country === "CH"
                    ? "600.00"
                    : user.data.country === "BA" || "HR" || "MK" || "ME" || "RS"
                    ? "149.00"
                    : "309.00"
        }
    ];
    const clickModalBtnHandler = ev => {
        setPackagePrice(ev.target.dataset.price);
        setText(ev.target.dataset.text);
        setModal(!modal);
    };
    const content = options.map(item => {
        return (
            <Package
                key={item.id}
                price={item.price}
                plan={item.plan}
                title={item.title}
                text={item.title}
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
                <div id="paypal">
                    <PayPal
                        description={`${t("paypal-description")} ${text}`}
                        value={packagePrice}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default PackagesPlan;

import React from "react";
import { useTranslation } from "react-i18next";
import Banner from "../header/Banner";
import Storehous_1 from "../../img/storehous_1.jpg";

const MyProfile = () => {
    const { t, i18n } = useTranslation();
    return (
        <div className="my-profile">
            <Banner
                image={Storehous_1}
                altText="STrucks"
                title={t("my_profile")}
            />
            <h1>My Profile</h1>
        </div>
    );
};

export default MyProfile;

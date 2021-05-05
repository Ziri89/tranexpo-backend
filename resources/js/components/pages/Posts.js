import React from "react";
import { Link } from "react-router-dom";
import Banner from "../header/Banner";
import Storehouse_1 from "../../img/storehous_1.jpg";
import { useTranslation } from "react-i18next";

const Posts = () => {
    const { t, i18n } = useTranslation();
    const linkGenerator = link => {
      
        const languageLocale =
            i18n.options.fallbackLng[0] === i18n.language
                ? null
                : i18n.language;
        return languageLocale ? "/" + languageLocale + link : link;
    };
    return (
        <div className="posts">
            <Banner
                image={Storehouse_1}
                altText="Storehouse"
                title={t("posts")}
            />
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-6">
                        <Link
                            className="btn btn-danger btn-lg btn-block"
                            to={linkGenerator("/freight-posts")}
                        >
                            {t("posts_for_transport")}
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link
                            className="btn btn-danger btn-lg btn-block"
                            to={linkGenerator("/passenger-posts")}
                        >
                            {t("passenger_posts")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Posts;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/lazy/lazy.scss";
import "./HomeSlider.css";
import Slide_01 from "../../img/truck_1.jpg";
import Slide_02 from "../../img/truck_2.jpg";
import Slide_03 from "../../img/truck_3.jpg";
import Slide_04 from "../../img/truck_4.jpg";
import Slide_05 from "../../img/truck_5.jpg";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const HomeSlider = () => {
    return (
        <Swiper
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={0}
            speed={900}
        >
            <SwiperSlide>
                <img src={Slide_01} alt="Truck 1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Slide_02} alt="Truck 2" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Slide_03} alt="Truck 3" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Slide_04} alt="Truck 4" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={Slide_05} alt="Truck 5" />
            </SwiperSlide>
        </Swiper>
    );
};

export default HomeSlider;

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import {
  Pagination,
  Navigation,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// images
// import slide_image_1 from "../../assets/images/img_1.jpg";
// import slide_image_2 from "../../assets/images/img_2.jpg";
// import slide_image_3 from "../../assets/images/img_3.jpg";
// import slide_image_4 from "../../assets/images/img_4.jpg";
// import slide_image_5 from "../../assets/images/img_5.jpg";
// import slide_image_6 from "../../assets/images/img_6.jpg";
// import slide_image_7 from "../../assets/images/img_7.jpg";
import stranger_things_image from "../../assets/images/stranger_things.jpg";
import batman_image from "../../assets/images/batman.jpg";
import star_wars_image from "../../assets/images/star-wars.jpg";
import doctor_strange_image from "../../assets/images/doctor_strange.jpg";
import mechanic_image from "../../assets/images/mechanic.jpg";
import john_wick_image from "../../assets/images/john_wick.jpg";
import spider_man_image from "../../assets/images/spider_man.jpg";
import harry_potter_image from "../../assets/images/magic-harry-poster.jpg";
import inception_image from "../../assets/images/inception_2010.jpg";
import gladiator_image from "../../assets/images/gladiator.jpg";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const StyledSliderWrapper = styled(Box)(() => ({
  position: "relative",
  top: "-80px",
}));

const SliderMovies = () => {
  return (
    <StyledSliderWrapper>
      <Swiper
        onSlideChange={(swiperCore) => {
          const { activeIndex, snapIndex, previousIndex, realIndex } =
            swiperCore;
          console.log({ activeIndex, snapIndex, previousIndex, realIndex });
        }}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        modules={[Pagination, Navigation, EffectCoverflow, Autoplay]}
        className="swiper-container"
      >
        {/* List rendering------------------------------------------------------ */}

        <SwiperSlide>
          {/* Add default img----------------------------------------------------- */}
          <img src={stranger_things_image} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={batman_image} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={star_wars_image} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={doctor_strange_image} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={mechanic_image} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={john_wick_image} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={spider_man_image} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={harry_potter_image} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={inception_image} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={gladiator_image} alt="slide_image" />
        </SwiperSlide>

        <div className="slider-controller">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </StyledSliderWrapper>
  );
};

export default SliderMovies;

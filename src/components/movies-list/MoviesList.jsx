// Import Swiper React components
import { Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@mui/system";

// import required modules
import { Navigation } from "swiper/modules";

// Images
import super_mario_bros_image from "../../assets/images/super_mario_bros.jpg";
import shazam_fury_of_gods_image from "../../assets/images/shazam_fury_of_the_gods.jpg";
import evil_dead_rise_image from "../../assets/images/evil_dead_rise.jpg";
import puss_in_boots from "../../assets/images/puss_in_boots.jpg";
import john_wick_chapter_4_image from "../../assets/images/john_wick_chapter_4.jpg";
import the_communion_girl_image from "../../assets/images/the_communion_girl.jpg";
import sixty_five_image from "../../assets/images/65.jpg";
import the_popes_exorcist_image from "../../assets/images/the_popes_exorcist.jpg";
import super_cell_image from "../../assets/images/super_cell.jpg";
import ghosted_image from "../../assets/images/ghosted.jpg";

// Styled Component
const StyledMovieListTitle = styled(Typography)(() => ({
  fontSize: "2rem" /* 32px */,
  color: "white",
  fontWeight: "bold",
  fontFamily: "serif",
}));

const StyledMovieImage = styled("img")(() => ({
  "&.movie-image": {
    width: "100%",
    height: "500px",
  },
}));

const StyledSwiper = styled(Swiper)(() => ({
  userSelect: "none",
}));

const MoviesList = () => {
  return (
    <>
      <StyledMovieListTitle>Now Playing</StyledMovieListTitle>
      <StyledSwiper
        slidesPerView={5}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          576: {
            // width: 576px
            slidesPerView: 2,
          },
          768: {
            // width: 768px
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
        className="swiper-movie-wrapper"
      >
        <SwiperSlide>
          <StyledMovieImage
            src={super_mario_bros_image}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <StyledMovieImage
            src={shazam_fury_of_gods_image}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <StyledMovieImage
            src={evil_dead_rise_image}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <StyledMovieImage
            src={puss_in_boots}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <StyledMovieImage
            src={john_wick_chapter_4_image}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <StyledMovieImage
            src={the_communion_girl_image}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <StyledMovieImage
            src={sixty_five_image}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <StyledMovieImage
            src={the_popes_exorcist_image}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <StyledMovieImage
            src={super_cell_image}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>

        <SwiperSlide>
          <StyledMovieImage
            src={ghosted_image}
            alt="Movie Image"
            className="movie-image"
          />
        </SwiperSlide>
      </StyledSwiper>
    </>
  );
};

export default MoviesList;

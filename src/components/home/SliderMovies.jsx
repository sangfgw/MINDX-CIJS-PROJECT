/* eslint-disable react/prop-types */
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
import { Alert, Box } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useReducer } from "react";
import { initializeMovieState, movieReducer } from "../../utils/movie-reducer";
import { getMoviesByType } from "../../utils/API/movie-api";

const StyledSliderWrapper = styled(Box)(() => ({
  position: "relative",
  top: "-80px",
}));

const SliderMovies = ({ updateMovie }) => {
  const [state, dispatch] = useReducer(movieReducer, initializeMovieState);

  useEffect(() => {
    if (state.nowPlaying && !state.nowPlaying.length > 0) {
      const nowPlayingMoviesPromise = getMoviesByType("now-playing");
      nowPlayingMoviesPromise.then((moviesData) => {
        // console.log(moviesData);
        if (moviesData)
          dispatch({ type: "now-playing", payload: moviesData.results });
      });
    }
    // console.log("Called")
  }, []);

  // useEffect(() => {
  //   console.log(movieId);
  // }, [movieId]);

  return state.nowPlaying.length > 0 ? (
    <StyledSliderWrapper>
      <Swiper
        // onSwiper={(swiper) => {
        //   dispatch({
        //     type: "movie-trending-id",
        //     payload: Number(
        //       document.querySelector(".swiper-slide-active").id
        //     ),
        //   });
        // }}
        onSlideChange={(swiperCore) => {
          // console.log(swiperCore);
          // const { activeIndex, snapIndex, previousIndex, realIndex } =
          //   swiperCore;
          // console.log({
          //   activeIndex,
          //   snapIndex,
          //   previousIndex,
          //   realIndex,
          // });

          const { realIndex } = swiperCore;

          const slides = document.querySelectorAll(".swiper-slide");
          slides.forEach((slide) => {
            if (Number(slide.dataset.swiperSlideIndex) === realIndex) {
              // console.log(slide.id);
              // setMovieId(Number(slide.id));
              // dispatch({
              //   type: "movie-trending-id",
              //   payload: Number(slide.id),
              // });

              updateMovie(
                state.nowPlaying.find((_movie) => {
                  return _movie.id === Number(slide.id);
                })
              );
            }
          });
          // console.log(movieIdRef.current);
        }}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 60,
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
        {state.nowPlaying.map((nowPlayingMovie) => (
          <SwiperSlide key={nowPlayingMovie.id} id={nowPlayingMovie.id}>
            <img
              src={`${import.meta.env.VITE_API_ORIGINAL_IMAGE_ENDPOINT}${
                nowPlayingMovie.poster_path
              }`}
              alt="slide_image"
            />
          </SwiperSlide>
        ))}

        <div className="slider-controller">
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </StyledSliderWrapper>
  ) : (
    <Alert severity="info">No Now Playing Movies Found...</Alert>
  );
};

export default SliderMovies;

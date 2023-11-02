/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@mui/system";

// import required modules
import { Navigation } from "swiper/modules";

import { useContext } from "react";
import { Link } from "react-router-dom";
import GenresContext from "../../contexts/GenresContext";

// Styled Component
const StyledMovieImage = styled("img")(() => ({
  "&.movie-image": {
    width: "100%",
    height: "500px",
  },
}));

const StyledSwiper = styled(Swiper)(() => ({
  userSelect: "none",
}));

const MoviesSwiper = ({ movies }) => {
  // const [state, dispatch] = useReducer(movieReducer, initializeMovieState);

  // useEffect(() => {
  //   // console.log(title, movies);
  //   if (state.genres && !state.genres.length > 0) {
  //     const genresPromise = getGenres();

  //     genresPromise.then((genresData) =>
  //       dispatch({ type: "genres", payload: genresData.genres })
  //     );
  //     return;
  //   }
  // }, []);
  const genresContext = useContext(GenresContext);

  // useEffect(() => {
  //   console.log(genresContext);
  // }, [genresContext]);

  return (
    movies &&
    genresContext && (
      <>
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
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <Link
                  to={`/${
                    genresContext.find(
                      (genre) => genre.id === movie.genre_ids[0]
                    )?.name
                  }/${movie.id}`}
                >
                  <StyledMovieImage
                    src={
                      import.meta.env.VITE_API_ORIGINAL_IMAGE_ENDPOINT +
                      movie.poster_path
                    }
                    alt={movie.title + " " + "Poster Image"}
                    className="movie-image"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </StyledSwiper>
      </>
    )
  );
};

export default MoviesSwiper;

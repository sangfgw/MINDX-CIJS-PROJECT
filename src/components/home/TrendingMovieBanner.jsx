/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { red } from "@mui/material/colors";
import YoutubeEmbed from "../video/YoutubeEmbed";
import TrendingMovieWrapper from "../trending-movie/TrendingMovieWrapper";
import MovieContent from "../trending-movie/MovieContent";
import VideoWrapper from "../trending-movie/VideoWrapper";
import { useEffect } from "react";
import {
  getGenres,
  getMovieById,
  getMovieVideoById,
} from "../../utils/API/movie-api";
import { useReducer } from "react";
import { initializeMovieState, movieReducer } from "../../utils/movie-reducer";
import { generateRandomTrailerVideoId } from "../../utils/generate/randomVideoId";
import { Link } from "react-router-dom";

// const TrendingMovieWrapper = styled(Box)(() => ({
//   marginBottom: "1rem" /* 16px */,
//   marginTop: "-1.5rem",
//   marginInline: "-1.5rem" /* 24px */,
//   position: "relative",
//   backgroundImage: `url('${stranger_things_image}')`,
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover",
//   userSelect: "none",
//   display: "flex",
//   flexWrap: "wrap",
// }));

// const StyledMovieContent = styled(Box)(() => ({
//   background:
//     "radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.25) 90.2%)",

//   padding: "2rem",
//   flex: 1,
//   height: "600px",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
// }));

const StyledTitleTrending = styled(Typography)(() => ({
  fontSize: "4rem" /* 64px */,
  fontWeight: "bold",
  color: "white",
  filter: "drop-shadow(0 0 0.75rem black)",
  textAlign: "center",
  fontFamily: "serif",
  lineHeight: 1.2,
}));

const StyledDescTrending = styled(Typography)(() => ({
  fontSize: "1rem",
  color: "white",
  filter: "drop-shadow(0 0 0.75rem black)",
  marginBottom: "2rem",
}));

const StyledWatchButton = styled(Button)(() => ({
  display: "block",
  marginInline: "auto",
  color: "white",
  backgroundColor: red[500],
  "&:hover": {
    backgroundColor: red[700],
    color: "white",
  },
}));

// const StyledVideoWrapper = styled(Box)(() => ({
//   // background:
//   //   "radial-gradient(circle at 10% 20%, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.25) 90.2%)",
//   flex: 3,
//   height: "600px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",

//   "& .embed-wrapper": {
//     transform: "translateY(-5%)",
//   },
// }));

const TrendingMovieBanner = ({ movie }) => {
  const [state, dispatch] = useReducer(movieReducer, initializeMovieState);

  useEffect(() => {
    // console.log(movie);

    if (movie && Object.keys(movie).length > 0) {
      // const genrePromise = findGenreById(movie.genre_ids[0]);
      if (state.genres && !state.genres.length > 0) {
        const genresPromise = getGenres();

        genresPromise.then((genresData) =>
          dispatch({ type: "genres", payload: genresData.genres })
        );
        return;
      }

      const movieDetailsPromise = getMovieById(movie.id);
      const movieVideosPromise = getMovieVideoById(movie.id);

      // genrePromise.then((genre) => {
      //   // console.log(genre);
      //   dispatch({ type: "activate-genre", payload: genre });
      // });

      movieDetailsPromise.then((movieDetails) => {
        // console.log(movieDetails);
        dispatch({
          type: "movie-details",
          payload: movieDetails,
        });
      });

      movieVideosPromise.then((movieVideos) => {
        // console.log(movieVideos);
        dispatch({ type: "movie-videos", payload: movieVideos.results });
      });
    }
  }, [movie, state.genres]);

  // useEffect(() => {
  //   generateRandomTrailerVideoId(state.movieVideos);
  // }, [state.movieVideos]);

  // Func: Find Genre By Id
  // const findGenreById = (genreId) => {
  //   const _genres = [];
  //   _genres.push(...state.genres);
  //   return _genres.find((genre) => genre.id === genreId);
  // };

  // // Func: generate random video trailer
  // const generateRandomTrailerVideoId = () => {
  //   const randomIndex = Math.floor(
  //     Math.random() * (state.movieVideos.length - 1)
  //   );
  //   // console.log(randomIndex);
  //   return state.movieVideos[randomIndex]?.key;
  // };

  return (
    <>
      <TrendingMovieWrapper
        imagesource={
          import.meta.env.VITE_API_ORIGINAL_IMAGE_ENDPOINT +
          movie?.backdrop_path
        }
      >
        <MovieContent>
          <StyledTitleTrending>{movie.title}</StyledTitleTrending>
          <StyledDescTrending>{movie.overview}</StyledDescTrending>

          <StyledWatchButton variant="contained" size="large">
            <Link
              to={`/${
                state.genres.find((genre) => genre.id === movie.genre_ids[0])
                  ?.name
              }/${movie.id}`}
            >
              Watch Now!
            </Link>
          </StyledWatchButton>
        </MovieContent>
        <VideoWrapper>
          <YoutubeEmbed
            embedId={generateRandomTrailerVideoId(state.movieVideos)}
          />
        </VideoWrapper>
      </TrendingMovieWrapper>
    </>
  );
};

export default TrendingMovieBanner;

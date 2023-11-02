/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react";
import MoviesSwiper from "./MoviesSwiper";
import { movieReducer } from "../../utils/movie-reducer";
import { getMoviesByType } from "../../utils/API/movie-api";
import { styled } from "@mui/system";
import { Alert, Box, Typography } from "@mui/material";

const StyledMovieListTitle = styled(Typography)(() => ({
  fontSize: "2rem" /* 32px */,
  color: "white",
  fontWeight: "bold",
  fontFamily: "serif",
  marginBottom: "0.5rem" /* 8px */,
}));

const StyledMovieListContainer = styled(Box)(() => ({
  "& ~ &": {
    marginTop: "4rem" /* 64px */,
  },
}));

const MoviesList = ({ type }) => {
  const [state, dispatch] = useReducer(movieReducer);

  // generate movies title handler
  const generateMoviesTitleHandler = () => {
    switch (type) {
      case "now-playing":
        return "Now Playing";
      case "popular":
        return "Popular";
      case "top-rated":
        return "Top Rated";
      case "upcomming":
        return "Upcoming";
      default:
        return "No Title...";
    }
  };

  useEffect(() => {
    const dispatchMoviesByType = () => {
      // const nowPlayingMoviesPromise = getMoviesByType("now-playing");
      // const popularMoviesPromise = getMoviesByType("popular");
      // const topRatedMoviesPromise = getMoviesByType("top-rated");
      // const upCommingMoviesPromise = getMoviesByType("upcomming");

      switch (type) {
        case "now-playing":
          return getMoviesByType("now-playing").then((moviesData) => {
            if (moviesData)
              dispatch({ type: "now-playing", payload: moviesData.results });
          });
        case "popular":
          return getMoviesByType("popular").then((moviesData) => {
            if (moviesData)
              dispatch({ type: "popular", payload: moviesData.results });
          });
        case "top-rated":
          return getMoviesByType("top-rated").then((moviesData) => {
            if (moviesData)
              dispatch({ type: "top-rated", payload: moviesData.results });
          });
        case "upcomming":
          return getMoviesByType("upcomming").then((moviesData) => {
            if (moviesData)
              dispatch({ type: "upcomming", payload: moviesData.results });
          });
        default:
          return;
      }
    };

    dispatchMoviesByType();
  }, []);

  const generateMoviesByType = () => {
    if (!state) return;
    switch (type) {
      case "now-playing":
        return state.nowPlaying;
      case "popular":
        return state.popular;
      case "top-rated":
        return state.topRated;
      case "upcomming":
        return state.upComming;
      default:
        return;
    }
  };

  const isEmptyMovies = () => {
    if (!state) return;
    switch (type) {
      case "now-playing":
        return !state.nowPlaying.length > 0;
      case "popular":
        return !state.popular.length > 0;
      case "top-rated":
        return !state.topRated.length > 0;
      case "upcomming":
        return !state.upComming.length > 0;
      default:
        return;
    }
  };

  return (
    <StyledMovieListContainer className="movies-list">
      <StyledMovieListTitle>
        {generateMoviesTitleHandler()}
      </StyledMovieListTitle>
      <MoviesSwiper movies={generateMoviesByType()} />
      {isEmptyMovies() && (
        <Alert severity="info">
          No {generateMoviesTitleHandler()} Movies Found...
        </Alert>
      )}
    </StyledMovieListContainer>
  );
};

export default MoviesList;

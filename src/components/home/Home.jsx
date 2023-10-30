import { Toolbar } from "@mui/material";
import SliderMovies from "./SliderMovies";
import TrendingMovieBanner from "./TrendingMovieBanner";
import MoviesList from "../movies-list/MoviesList";
import { useState } from "react";
// import { useEffect } from "react";

const Home = () => {
  const [movie, setMovie] = useState();

  // useEffect(() => {
  //   console.log(movieId);
  // }, [movieId]);

  // Func: update movie handler
  const updateMovieHandler = (_movie) => {
    setMovie(_movie);
  };

  return (
    <>
      {/* // ------ sticky */}
      <Toolbar />
      {movie && <TrendingMovieBanner movie={movie} />}
      <SliderMovies updateMovie={updateMovieHandler} />
      {/* <MoviesList type="now-playing" /> */}
      <MoviesList type="popular" />
      <MoviesList type="top-rated" />
      <MoviesList type="upcomming" />
    </>
  );
};

export default Home;

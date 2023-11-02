import { Toolbar } from "@mui/material";
import SliderMovies from "./SliderMovies";
import TrendingMovieBanner from "./TrendingMovieBanner";
import MoviesList from "../movies-list/MoviesList";
import { useState } from "react";
// import { useEffect } from "react";

const Home = () => {
  const [_movie, setMovie] = useState();

  // useEffect(() => {
  //   console.log(movieId);
  // }, [movieId]);

  // Func: update movie handler
  const updateMovieHandler = (movie) => {
    setMovie(movie);
  };

  return (
    <>
      {/* // ------ sticky */}
      <Toolbar />
      {_movie && <TrendingMovieBanner movie={_movie} />}
      <SliderMovies updateMovie={updateMovieHandler} />
      <MoviesList type="popular" />
      <MoviesList type="top-rated" />
      <MoviesList type="upcomming" />
    </>
  );
};

export default Home;

import { Toolbar } from "@mui/material";
import SliderMovies from "./SliderMovies";
import TrendingMovieBanner from "./TrendingMovieBanner";
import MoviesList from "../movies-list/MoviesList";

const Home = () => {
  return (
    <>
      {/* // ------ sticky */}
      <Toolbar />
      <TrendingMovieBanner />
      <SliderMovies />
      <MoviesList />
    </>
  );
};

export default Home;

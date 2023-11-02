import { createContext } from "react";
import { initializeMovieState } from "../utils/movie-reducer";

const GenresContext = createContext(initializeMovieState.genres);

export default GenresContext;

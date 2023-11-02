/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";
import { useContext, useEffect, useReducer } from "react";
import { initializeMovieState, movieReducer } from "../../utils/movie-reducer";
import { getGenres } from "../../utils/API/movie-api";
import GenresContext from "../../contexts/GenresContext";
const Layout = ({ children }) => {
  // Genres
  const [state, dispatch] = useReducer(movieReducer, initializeMovieState);
  const genresContext = useContext(GenresContext);

  useEffect(() => {
    // console.log(title, movies);
    // console.log(genresContext);
    if (!genresContext || !genresContext.length > 0) {
      const genresPromise = getGenres();

      genresPromise.then((genresData) =>
        dispatch({ type: "genres", payload: genresData.genres })
      );
    }
  }, []);

  return (
    <GenresContext.Provider value={state.genres}>
      <MainHeader />
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
      <MainFooter />
    </GenresContext.Provider>
  );
};

export default Layout;

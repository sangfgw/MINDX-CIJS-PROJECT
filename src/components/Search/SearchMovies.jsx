import {
  Backdrop,
  CircularProgress,
  Grid,
  Pagination,
  PaginationItem,
  Toolbar,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import { Link, useSearchParams } from "react-router-dom";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initializeMovieState, movieReducer } from "../../utils/movie-reducer";
import { findMoviesBySearchParams, getGenres } from "../../utils/API/movie-api";
import GenresContext from "../../contexts/GenresContext";

// Styled Component
const StyledCategoryTitle = styled(Typography)(() => ({
  color: "rgba(255, 255, 255, 0.87)",
}));

const StyledMovieImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
}));

// Main Component
const SearchMovies = () => {
  const [searchParams] = useSearchParams();
  const [state, dispatch] = useReducer(movieReducer, initializeMovieState);
  const genresContext = useContext(GenresContext);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    // console.log(searchParams.get("query"));
    // Open Backdrop
    handleOpen();

    // Fetch And Dispatch Genres
    if (!genresContext || !genresContext.length > 0) {
      const genresPromise = getGenres();
      genresPromise.then((genresData) => {
        // console.log(genresData);
        dispatch({ type: "genres", payload: genresData.genres });

        // Close Backdrop
        handleClose();
      });
    }

    // Fetch And Dispatch Movies By Genre
    if (!state.moviesBySearch.length > 0) {
      findMoviesBySearchParams(
        searchParams.get("query") ?? "",
        searchParams.get("page") ?? "1"
      ).then((moviesData) => {
        // console.log(moviesData);
        dispatch({ type: "movies-by-search", payload: moviesData });

        // Close Backdrop
        handleClose();
      });
    }
  }, [searchParams, genresContext]);

  // Loading Movies Handler
  const loadingMoviesHandler = useCallback(() => {
    // console.log(moviesGenres);
    return state.moviesBySearch.results?.map((movie) => {
      // console.log(movie);
      return (
        genresContext.find((genre) => genre.id === movie.genre_ids[0])?.name &&
        movie.poster_path && (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={movie.id}>
            <Link
              to={`/${
                genresContext.find((genre) => genre.id === movie.genre_ids[0])
                  ?.name
              }/${movie.id}`}
            >
              <StyledMovieImage
                src={
                  import.meta.env.VITE_API_ORIGINAL_IMAGE_ENDPOINT +
                  movie.poster_path
                }
                alt={movie.title + " " + "Poster Image"}
              />
            </Link>
          </Grid>
        )
      );
    });
  }, [state.moviesBySearch]);

  return (
    <>
      <Toolbar />
      <StyledCategoryTitle
        variant="h4"
        sx={{ marginBottom: "1rem" /* 16px */ }}
      >
        Searching {searchParams.get("query")}
      </StyledCategoryTitle>
      <Grid container spacing={4}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {loadingMoviesHandler()}
      </Grid>
      <Pagination
        count={state.moviesBySearch.total_pages}
        shape="rounded"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/search?query=${searchParams.get("query")}&page=${item.page}`}
            // onClick={handleOpen}
            {...item}
          />
        )}
        sx={{
          marginY: "2rem" /* 32px */,
          "& ul": {
            justifyContent: "center",
          },

          "& button, a, li > div": {
            color: "white",

            "&.Mui-selected": {
              background: red[500],

              "&.Mui-focusVisible": {
                background: red[700],
              },

              ":hover": {
                background: red[700],
              },
            },
          },
        }}
      />
    </>
  );
};

export default SearchMovies;

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
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initializeMovieState, movieReducer } from "../../utils/movie-reducer";
import { findMoviesByGenreId } from "../../utils/API/movie-api";
import GenresContext from "../../contexts/GenresContext";

// Styled Component
const StyledCategoryTitle = styled(Typography)(() => ({
  color: "rgba(255, 255, 255, 0.87)",
}));

const StyledMovieImage = styled("img")(() => ({
  width: "100%",
}));

// Main Component
const Category = () => {
  const { moviesGenres } = useParams();
  let [searchParams] = useSearchParams();
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
    // Open Backdrop
    handleOpen();

    // Fetch And Dispatch Genres
    // if (!genresContext || !genresContext.length > 0) {
    //   const genresPromise = getGenres();
    //   genresPromise.then((genresData) => {
    //     // console.log(genresData);
    //     dispatch({ type: "genres", payload: genresData.genres });

    //     // Close Backdrop
    //     handleClose();
    //   });
    //   return;
    // }

    // Fetch And Dispatch Movies By Genre
    if (genresContext.length > 0) {
      // console.log(state.genres.find((genre) => genre.name === moviesGenres));
      findMoviesByGenreId(
        genresContext.find((genre) => genre.name === moviesGenres).id,
        searchParams.get("page")
      ).then((moviesData) => {
        // console.log(moviesData);
        dispatch({ type: "movies-by-genre", payload: moviesData });

        // Close Backdrop
        handleClose();
      });
    }
  }, [moviesGenres, genresContext, searchParams]);

  // Loading Movies Handler
  const loadingMoviesHandler = useCallback(() => {
    // console.log(moviesGenres);
    return state.moviesByGenre.results?.map((movie) => (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={movie.id}>
        <Link to={`/${moviesGenres}/${movie.id}`}>
          <StyledMovieImage
            src={
              import.meta.env.VITE_API_ORIGINAL_IMAGE_ENDPOINT +
              movie.poster_path
            }
            alt={movie.title + " " + "Poster Image"}
          />
        </Link>
      </Grid>
    ));
  }, [state.moviesByGenre, moviesGenres]);

  const loadingPagination = () =>
    state.moviesByGenre.total_pages && (
      <Pagination
        count={state.moviesByGenre.total_pages}
        shape="rounded"
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/category/${moviesGenres}?page=${item.page}`}
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
    );

  return (
    <>
      <Toolbar />
      <StyledCategoryTitle
        variant="h4"
        sx={{ marginBottom: "1rem" /* 16px */ }}
      >
        {moviesGenres}
      </StyledCategoryTitle>
      <Grid container spacing={4}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {loadingMoviesHandler()}
      </Grid>
      {loadingPagination()}
    </>
  );
};

export default Category;

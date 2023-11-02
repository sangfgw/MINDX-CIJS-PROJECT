// MUI Import
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Grid,
  Snackbar,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { styled } from "@mui/system";
import { orange, red } from "@mui/material/colors";
import TodayIcon from "@mui/icons-material/Today";
import TimelapseIcon from "@mui/icons-material/Timelapse";
// Components Import
import TrendingMovieWrapper from "../trending-movie/TrendingMovieWrapper";
import MovieContent from "../trending-movie/MovieContent";
import VideoWrapper from "../trending-movie/VideoWrapper";
import YoutubeEmbed from "../video/YoutubeEmbed";

// Images Import
import { KeyboardArrowRight, WarningAmberOutlined } from "@mui/icons-material";
import { useEffect, useReducer, useState } from "react";
import {
  getMovieById,
  getMovieKeyWords,
  getMovieReleaseDates,
  getMovieVideoById,
} from "../../utils/API/movie-api";
import { initializeMovieState, movieReducer } from "../../utils/movie-reducer";
import { generateRandomTrailerVideoId } from "../../utils/generate/randomVideoId";

// Styled Components
const StyledTitleTrending = styled(Typography)(() => ({
  fontSize: "4rem" /* 64px */,
  fontWeight: "bold",
  color: "white",
  filter: "drop-shadow(0 0 0.75rem black)",
  textAlign: "center",
  fontFamily: "serif",
  lineHeight: 1.2,
}));

const StyledMovieDescWrapper = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: "0.5rem" /* 8px */,
  marginBottom: "1.5rem" /* 24px */,
}));

const StyledMovieTextDesc = styled(Typography)(() => ({
  fontSize: "0.875rem" /* 14px */,
}));

const StyledChip = styled(Chip)(() => ({
  color: "whitesmoke",

  "& > p, svg": {
    padding: "0.125rem 0.25rem" /* 4px */,
    border: "1px solid #616161",
    color: "whitesmoke !important",
    width: "24px",
    height: "24px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const StyledRatingIcon = styled(Typography)(() => ({
  fontSize: "0.75rem" /* 12px */,
}));

const StyledDescTrending = styled(Typography)(() => ({
  fontSize: "1rem",
  color: "white",
  filter: "drop-shadow(0 0 0.75rem black)",
  marginBottom: "2rem",
}));

const StyledWatchButton = styled(Button)(() => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  marginInline: "auto",
  color: "white",
  backgroundColor: orange[500],
  "&:hover": {
    backgroundColor: orange[700],
    color: "white",
  },
}));

const StyledMovieDetailsWrapper = styled(Box)(() => ({
  padding: "2rem",
  // background: "linear-gradient(45deg, #EEEEEE, #FAF8F9, #FFFFFF)",
  background: "rgba(58,58,58, 0.5)",
  borderRadius: "8px",
}));

const StyledMovieDetailsTitle = styled(Typography)(() => ({
  fontSize: "1.5rem" /* 24px */,
  color: "whitesmoke",
  fontWeight: "bold",
}));

const StyledCompanyImage = styled("img")(() => ({
  backgroundColor: "rgba(255,255,255, 1)",
  padding: "1rem" /* 16px */,
  width: "100%",
  height: "50px",
  objectFit: "contain",
  userSelect: "none",
}));

const StyledMovieDetailsTable = styled("table")(() => ({
  borderCollapse: "collapse",
  textAlign: "left",
  "& th, td": {
    // border: "1px solid white",
    color: "#7c7979",
  },

  "& th": {
    width: "12%",
  },

  "& td": {
    width: "88%",
    padding: "8px",
  },
}));

const StyledBreadCrumbs = styled(Breadcrumbs)(({ theme }) => ({
  color: "#7c7979",
  marginBottom: "1rem",

  // Breakpoints
  [theme.breakpoints.up("lg")]: {
    marginRight: "-10rem" /* 160px */,
  },

  [theme.breakpoints.down("xs")]: {
    marginRight: "-2rem" /* 32px */,
  },
}));

const StyledBreadCrumbsLink = styled(Link)(() => ({
  color: "whitesmoke",

  ":hover": {
    color: red[700],
  },
}));

// Func: DateTime Formatter
const dateTimeFormatter = (datetimeRaw = "", type = "date") => {
  if (
    !datetimeRaw ||
    datetimeRaw === null ||
    datetimeRaw === "" ||
    !datetimeRaw.length > 0
  )
    return;

  // Initialize Date Instance
  const dateTime = new Date(datetimeRaw);

  // Conditional Return DateTime Format
  switch (type) {
    case "date":
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(dateTime);
    case "movie-duration":
      if (Number(dateTime)) {
        const hours = Number.parseInt(Math.round(Number(datetimeRaw) / 60));
        const minutes = Number.parseInt(Math.round(Number(datetimeRaw) % 60));
        return `${hours}h ${minutes}m`;
      }
      return;
  }
};

// Main Component
const MovieDetails = () => {
  const [state, dispatch] = useReducer(movieReducer, initializeMovieState);
  const { moviesGenres, movieId } = useParams();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!movieId && state.movieDetails?.length > 0) return;

    const movieDetailsPromise = getMovieById(movieId);
    const movieReleaseDatesPromise = getMovieReleaseDates(movieId);
    const movieVideosPromise = getMovieVideoById(movieId);
    const movieKeyWordsPromise = getMovieKeyWords(movieId);

    movieDetailsPromise.then((movieDetails) => {
      // console.log(movieDetails);
      dispatch({
        type: "movie-details",
        payload: movieDetails,
      });
    });

    movieReleaseDatesPromise.then((movieReleaseDatesData) => {
      // console.log(movieReleaseDatesData);
      dispatch({
        type: "movie-details-release-dates",
        payload: movieReleaseDatesData,
      });
    });

    movieVideosPromise.then((movieVideos) => {
      // console.log(movieVideos);
      dispatch({ type: "movie-videos", payload: movieVideos.results });
    });

    movieKeyWordsPromise.then((movieKeyWords) => {
      // console.log(movieKeyWords);
      dispatch({ type: "movie-details-keywords", payload: movieKeyWords });
    });
  }, [movieId]);

  // useEffect(() => {
  //   console.log(
  //     state.movieDetailsReleaseDates.results?.find(
  //       (releaseDate) => releaseDate.iso_3166_1 === "VN"
  //     ).release_dates[0].release_date,
  //     state.movieDetails.runtime
  //   );
  // }, [state.movieDetailsReleaseDates]);

  const BREADCRUMBSITEMS = [
    {
      id: 1,
      children: <StyledBreadCrumbsLink to={"/"}>Home</StyledBreadCrumbsLink>,
    },
    {
      id: 2,
      children: (
        <StyledBreadCrumbsLink to={`/category/${moviesGenres}`}>
          {moviesGenres}
        </StyledBreadCrumbsLink>
      ),
    },
    {
      id: 2,
      children: <Typography>{state.movieDetails.title ?? movieId}</Typography>,
    },
  ];

  // details
  const DETAILS = [
    {
      id: 1,
      title: "Genres",
      content: state.movieDetails.genres?.map((genre, index) => {
        let formatGenre = genre.name;
        if (index !== state.movieDetails.genres.length - 1) formatGenre += ", ";
        return formatGenre;
      }),
    },
    { id: 2, title: "Language", content: state.movieDetails.original_language },
    {
      id: 3,
      title: "Original Title",
      content: state.movieDetails.original_title,
    },
    { id: 4, title: "Popularity", content: state.movieDetails.popularity },
    {
      id: 5,
      title: "Produced",
      content: state.movieDetails.production_countries?.map(
        (country, index) => {
          let formatCountry = country.iso_3166_1;
          if (index !== state.movieDetails.production_countries.length - 1)
            formatCountry += ", ";
          return formatCountry;
        }
      ),
    },
    {
      id: 6,
      title: "Production Company",
      content: (
        <Grid container spacing={6} sx={{ placeItems: "center" }}>
          {state.movieDetails.production_companies?.map((production_company) =>
            production_company.logo_path ? (
              <Grid
                item
                xs={8}
                sm={5}
                md={3}
                lg={2}
                key={production_company.id}
              >
                <StyledCompanyImage
                  src={
                    import.meta.env.VITE_API_ORIGINAL_IMAGE_ENDPOINT +
                    production_company.logo_path
                  }
                  alt={`${production_company.name} Logo Image`}
                  width="100%"
                />
              </Grid>
            ) : (
              <Grid
                item
                xs={8}
                sm={5}
                md={3}
                lg={2}
                key={production_company.id}
              >
                <Typography key={production_company.id}>
                  {production_company.name}
                </Typography>
              </Grid>
            )
          )}
        </Grid>
      ),
    },
    {
      id: 7,
      title: "Status",
      content: state.movieDetails.status,
    },
    {
      id: 8,
      title: "Rating Count",
      content: state.movieDetails.vote_count,
    },

    {
      id: 9,
      title: "Keywords",
      content: (
        <Stack direction="row" flexWrap="wrap" gap="1rem">
          {state.movieDetailsKeyWords.keywords?.map((keyword) => (
            <Link to={`/search?query=${keyword.name}`} key={keyword.id}>
              <Chip
                clickable
                sx={{
                  color: "#2b2a2a",
                  background: "whitesmoke",
                  borderRadius: "4px",
                  ":hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" },
                }}
                variant="filled"
                label={<Typography>{keyword.name}</Typography>}
              />
            </Link>
          ))}
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Toolbar />
      <TrendingMovieWrapper
        imagesource={
          state.movieDetails.backdrop_path
            ? import.meta.env.VITE_API_ORIGINAL_IMAGE_ENDPOINT +
              state.movieDetails.backdrop_path
            : ""
        }
      >
        <MovieContent>
          <StyledBreadCrumbs size="md" separator={<KeyboardArrowRight />}>
            {BREADCRUMBSITEMS.map((item) => (
              <Box key={item.id}>{item.children}</Box>
            ))}
          </StyledBreadCrumbs>
          <StyledTitleTrending>{state.movieDetails.title}</StyledTitleTrending>
          <StyledMovieDescWrapper>
            <StyledChip
              icon={<StyledRatingIcon>R</StyledRatingIcon>}
              label={
                <StyledMovieTextDesc>
                  {state.movieDetails?.vote_average ?? "..."}
                </StyledMovieTextDesc>
              }
            />
            <StyledChip
              icon={<TodayIcon sx={{ width: "24px", height: "24px" }} />}
              label={
                <StyledMovieTextDesc>
                  {state.movieDetailsReleaseDates.results?.find(
                    (releaseDate) => releaseDate?.iso_3166_1 === "VN"
                  )?.release_dates[0]?.release_date
                    ? dateTimeFormatter(
                        state.movieDetailsReleaseDates.results?.find(
                          (releaseDate) => releaseDate?.iso_3166_1 === "VN"
                        )?.release_dates[0]?.release_date ?? "",
                        "date"
                      )
                    : "..."}
                </StyledMovieTextDesc>
              }
            />
            <StyledChip
              icon={<TimelapseIcon sx={{ width: "24px", height: "24px" }} />}
              label={
                <StyledMovieTextDesc>
                  {state.movieDetails.runtime?.toString()
                    ? dateTimeFormatter(
                        state.movieDetails.runtime?.toString() ?? "0",
                        "movie-duration"
                      )
                    : "..."}
                </StyledMovieTextDesc>
              }
            />
          </StyledMovieDescWrapper>
          <StyledDescTrending>{state.movieDetails.overview}</StyledDescTrending>
          <StyledWatchButton
            variant="contained"
            size="large"
            startIcon={<WarningAmberOutlined />}
            onClick={handleClick}
          >
            Not Available
          </StyledWatchButton>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="The Movie Is Not Available Now!"
            // action={SnackBarAction}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%" }}
            >
              The Movie <strong>{state.movieDetails.title}</strong> Is Not
              Available Right Now!
            </Alert>
          </Snackbar>
        </MovieContent>
        <VideoWrapper>
          <YoutubeEmbed
            embedId={generateRandomTrailerVideoId(state.movieVideos)}
          />
        </VideoWrapper>
      </TrendingMovieWrapper>

      <StyledMovieDetailsWrapper>
        <StyledMovieDetailsTitle>Details</StyledMovieDetailsTitle>
        <StyledMovieDetailsTable>
          <tbody>
            {DETAILS.map((detail) => (
              <tr key={detail.id}>
                <th>{detail.title}:</th>
                <td>{detail.content}</td>
              </tr>
            ))}
          </tbody>
        </StyledMovieDetailsTable>
      </StyledMovieDetailsWrapper>
    </>
  );
};

export default MovieDetails;

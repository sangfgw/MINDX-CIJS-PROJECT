const sendHttpRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    headers: data
      ? {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        }
      : {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
        },
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const getMoviesByType = async (type = "") => {
  if (!type || type === null || type.length === 0) return;

  let MOVIE_LIST_PATH = "/movie";
  let QUERY = "?language=en-US&page=1&region=vn";
  const QUERY_WITHOUT_REGION = QUERY.substring(0, QUERY.indexOf("&region"));
  // console.log(QUERY.substring(0, QUERY.indexOf("&region")));

  const typePaths = [
    {
      _type: "now-playing",
      path: "/now_playing",
      optionalQuery: QUERY_WITHOUT_REGION,
    },
    { _type: "popular", path: "/popular", optionalQuery: QUERY },
    { _type: "top-rated", path: "/top_rated", optionalQuery: QUERY },
    {
      _type: "upcomming",
      path: "/upcoming",
      optionalQuery: QUERY_WITHOUT_REGION,
    },
  ];

  if (!typePaths.find((typePath) => typePath._type.includes(type))) return;

  MOVIE_LIST_PATH += typePaths.find((typePath) =>
    typePath._type.includes(type)
  ).path;

  if (typePaths.find((typePath) => typePath._type.includes(type)).optionalQuery)
    MOVIE_LIST_PATH += typePaths.find((typePath) =>
      typePath._type.includes(type)
    ).optionalQuery;

  const APIUrl = import.meta.env.VITE_API_ENDPOINT + MOVIE_LIST_PATH;

  return sendHttpRequest("GET", APIUrl).then((responseData) => responseData);
};

export const getMovieById = async (movieId = 0) => {
  const MOVIE_DETAILS_PATH = `/movie/${movieId}`;
  const LANGUAGE = "language=en-US";

  const movieDetailsAPIUrl =
    import.meta.env.VITE_API_ENDPOINT + MOVIE_DETAILS_PATH + "?" + LANGUAGE;

  return sendHttpRequest("GET", movieDetailsAPIUrl).then(
    (responseData) => responseData
  );
};

export const getMovieReleaseDates = async (movieId = 0) => {
  const MOVIE_RELEASE_DATES_PATH = `/movie/${movieId}/release_dates`;

  const APIUrl = import.meta.env.VITE_API_ENDPOINT + MOVIE_RELEASE_DATES_PATH;

  return sendHttpRequest("GET", APIUrl).then((responseData) => responseData);
};

export const getMovieKeyWords = async (movieId = 0) => {
  const MOVIE_KEYWORDS_PATH = `/movie/${movieId}/keywords`;

  const APIUrl = import.meta.env.VITE_API_ENDPOINT + MOVIE_KEYWORDS_PATH;

  return sendHttpRequest("GET", APIUrl).then((responseData) => responseData);
};

export const getMovieVideoById = async (movieId = 0) => {
  const MOVIE_VIDEO_PATH = `/movie/${movieId}/videos`;
  const LANGUAGE = "language=en-US";

  const movieDetailsAPIUrl =
    import.meta.env.VITE_API_ENDPOINT + MOVIE_VIDEO_PATH + "?" + LANGUAGE;

  return sendHttpRequest("GET", movieDetailsAPIUrl).then(
    (responseData) => responseData
  );
};

export const getGenres = async () => {
  const GENRE_PATH = "/genre/movie/list";
  const LANGUAGE = "language=en";

  const genresAPIUrl =
    import.meta.env.VITE_API_ENDPOINT + GENRE_PATH + "?" + LANGUAGE;

  return sendHttpRequest("GET", genresAPIUrl).then(
    (responseData) => responseData
  );
};

// export const findGenreById = (genreId) => {
//   // console.log(initializeMovieState);
//   return initializeMovieState.genres.find((genre) => genre.id === genreId);
// };

// export const findGenreByName = (genreName) => {
//   return initializeMovieState.genres.find((genre) => genre.name === genreName);
// };

export const findMoviesByGenreId = (genreId = 0, page = "1") => {
  if (!genreId && genreId === null && !genreId.length > 0) return;
  // console.log("Find" + " " + genreId);
  // console.log(findGenreByName(genreId)?.id);
  const DISCOVER_PATH = "/discover/movie";
  let QUERY = "?";
  const AND = "&";
  const INCLUDE_ADULT = "include_adult=false";
  const INCLUDE_VIDEO = "include_video=false";
  const LANGUAGE = "language=en-US";
  const PAGE = `page=${page}`;
  const SORT_BY = "sort_by=popularity.desc";
  const WITH_GENRES = `with_genres=` + genreId;

  QUERY +=
    INCLUDE_ADULT +
    AND +
    INCLUDE_VIDEO +
    AND +
    LANGUAGE +
    AND +
    PAGE +
    AND +
    SORT_BY +
    AND +
    WITH_GENRES;

  const APIUrl = import.meta.env.VITE_API_ENDPOINT + DISCOVER_PATH + QUERY;

  return sendHttpRequest("GET", APIUrl).then((responseData) => responseData);
};

export const findMoviesBySearchParams = (searchParams = "", page = "1") => {
  if (!searchParams && searchParams === null && !searchParams.length > 0)
    return;
  // console.log("Find" + " " + searchParams);
  // console.log(findGenreByName(searchParams)?.id);
  const SEARCH_PATH = "/search/movie";
  let QUERY = "?";
  const AND = "&";
  const SEARCH_QUERY = `query=${searchParams}`;
  const INCLUDE_ADULT = "include_adult=false";
  const LANGUAGE = "language=en-US";
  const PAGE = `page=${page}`;
  const REGION = "region=vn";

  QUERY +=
    SEARCH_QUERY +
    AND +
    INCLUDE_ADULT +
    AND +
    LANGUAGE +
    AND +
    PAGE +
    AND +
    REGION;

  const APIUrl = import.meta.env.VITE_API_ENDPOINT + SEARCH_PATH + QUERY;

  return sendHttpRequest("GET", APIUrl).then((responseData) => responseData);
};

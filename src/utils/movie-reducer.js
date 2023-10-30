export let initializeMovieState = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upComming: [],
  moviesByGenre: [],
  moviesBySearch: {},
  movieDetails: [],
  movieDetailsKeyWords: {},
  movieDetailsReleaseDates: {},
  movieVideos: [],
  genres: [],
};

export const movieReducer = (state = initializeMovieState, action) => {
  initializeMovieState = { ...state };
  switch (action.type) {
    case "now-playing":
      // Return State Update
      return {
        ...state,
        nowPlaying: action.payload,
      };
    case "popular":
      // Return Fetch Movies Data
      return {
        ...state,
        popular: action.payload,
      };
    case "top-rated":
      // Return Fetch Movies Data
      return {
        ...state,
        topRated: action.payload,
      };
    case "upcomming":
      // Return Fetch Movies Data
      return {
        ...state,
        upComming: action.payload,
      };
    case "movies-by-genre":
      // Return Fetch Movies Data
      return { ...state, moviesByGenre: action.payload };
    case "movie-details":
      // Return Fetch Movies Data
      return { ...state, movieDetails: action.payload };
    case "movie-details-keywords":
      // Return Fetch Movie Keywords Data
      return { ...state, movieDetailsKeyWords: action.payload };
    case "movie-details-release-dates":
      // Return Fetch Movies Data
      return { ...state, movieDetailsReleaseDates: action.payload };
    case "movie-videos":
      // console.log(action.payload);
      // Return Fetch Movies Videos Data
      return { ...state, movieVideos: action.payload };
    case "genres":
      // Return Fetch Movie Genres
      return { ...state, genres: action.payload };
    case "movies-by-search":
      // Return Fetch Search Movies
      return { ...state, moviesBySearch: action.payload };
  }

  throw Error("Invalid Action Type");
};

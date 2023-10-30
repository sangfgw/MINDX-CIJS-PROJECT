import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "../components/layout/Root";
import Home from "../components/home/Home";
import Category from "../components/category/Category";
import MovieDetails from "../components/movie/MovieDetails";
import SearchMovies from "../components/Search/SearchMovies";
import NotFound from "../components/site-status/NotFound";
import Error from "../components/site-status/Error";

const AppRoutes = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
          { element: <Home />, index: true },
          { path: "category/:moviesGenres", element: <Category /> },
          { path: ":moviesGenres/:movieId", element: <MovieDetails /> },
          { path: "search", element: <SearchMovies /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
    { basename: import.meta.env.DEV ? "/" : "/MINDX-CIJS-PROJECT" }
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;

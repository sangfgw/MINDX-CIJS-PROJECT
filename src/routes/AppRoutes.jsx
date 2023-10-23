import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "../components/layout/Root";
import Home from "../components/home/Home";
import Category from "../components/category/Category";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { element: <Home />, index: true },
        { path: "category", element: <Category /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;

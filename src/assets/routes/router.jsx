import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Person from "../pages/Person";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  }, {
    path: "/:id",
    element: <Person />,
    errorElement: <ErrorPage />
  },
  {
    path: "/:id/:planet",
    element: <Person />,
    errorElement: <ErrorPage />
  }
]);
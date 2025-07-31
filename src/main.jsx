import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./routes/App.jsx";
import Bag from "./routes/Bag.jsx";
import CancelPage from "./routes/CancelPage.jsx";
import Home from "./routes/Home.jsx";
import SuccessPage from "./routes/SuccessPage.jsx";
import myntraStore from "./store/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/bag",
        element: <Bag />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      { path: "/cancel", element: <CancelPage /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

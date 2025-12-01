import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/Global.css";

import App from "./App.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import Messages from "./admin/Messages.jsx";
import ProjectsAdmin from "./admin/ProjectsAdmin.jsx"; // rename confusion avoid
import ProtectedRoute from "./admin/ProtectedRoute.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> }, // public portfolio

  { path: "/admin/login", element: <AdminLogin /> },

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "messages", element: <Messages /> },
      { path: "projects", element: <ProjectsAdmin /> }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

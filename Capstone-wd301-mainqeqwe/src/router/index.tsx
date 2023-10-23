import React, { Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

const Signin = React.lazy(() => import("../views/signin"));
const Signup = React.lazy(() => import("../views/signup"));
import Logout from "../views/logout";
const ResetPassword = React.lazy(() => import("../views/reset"));
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../views/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/signin",
    element: (
      <Suspense fallback={<div className="suspense-loading">Loading</div>}>
        <Signin />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div className="suspense-loading">Loading</div>}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "reset",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div className="suspense-loading">Loading</div>}>
          <ResetPassword />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
export default router;

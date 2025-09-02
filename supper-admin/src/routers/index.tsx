import { createBrowserRouter } from "react-router-dom";
import AuthTemplate from "../layout/auth-template";
import LoginPage from "../pages/auth/login";
import AdminTemplate from "../layout/admin-template";
import HomePage from "../pages/home";
import OrganizationPage from "../pages/organization";
import AuthGuard from "./guard/authGuard";
import LoginGuard from "./guard/loginGuard";

export const PATH = {
  LOGIN: "/auth/login",

  HOME: "/",

  ORGANIZATION: "/organization",
};

export const RootRouter = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <LoginGuard>
        <AuthTemplate />
      </LoginGuard>
    ),
    children: [
      {
        path: PATH.LOGIN,
        element: <LoginPage></LoginPage>,
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <AdminTemplate />
      </AuthGuard>
    ),
    children: [
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
      {
        path: PATH.ORGANIZATION,
        element: <OrganizationPage />,
      },
    ],
  },
]);

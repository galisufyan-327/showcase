// Public Routes
import Signin from "../pages/authentication/signin/index";
import Signup from "../pages/authentication/signup/index";
import Welcome from "../pages/home/welcome/index";
import Main from "../pages/home/main/index";
// // Private Routes


export const routesConstant = {
  // Public Routes
  LOGIN: "/signin",
  REGISTER: "/signup",
  NOT_FOUND: "*",

  // Private Routes
  WELCOME: "/",
  HOME: "/dashboard",
};

export const PublicRoutes = [
  { path: routesConstant.LOGIN, component: <Signin /> },
  { path: routesConstant.REGISTER, component: <Signup /> },
];

export const PrivateRoutes = [
  { path: routesConstant.WELCOME, component: <Welcome /> },
  { path: routesConstant.HOME, component: <Main /> },
];

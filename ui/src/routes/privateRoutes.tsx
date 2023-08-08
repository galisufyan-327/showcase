import { ReactNode, useContext } from "react";
import { GlobalContext } from "../context/auth-context/auth";
import Signin from "../pages/authentication/signin/index";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(GlobalContext);
  if (!isAuthenticated) {
    return <Signin />;
  }
  return children;
};
export default ProtectedRoute;

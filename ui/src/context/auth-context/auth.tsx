import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { routesConstant } from "../../routes/routes";

export const GlobalContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (prev: boolean) => !prev,
  toggleAuth: Function,
  onLogout: Function,
});

const MainContext = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsAuthenticated((prev: boolean) => !prev);
  };

  const onLogout = useCallback(() => {
    localStorage.clear();
    toggleAuth();
  }, []);

  const values = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, toggleAuth, onLogout }),
    [isAuthenticated, onLogout]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate(routesConstant.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};

export default MainContext;

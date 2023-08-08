import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoutes, PublicRoutes } from "./routes/routes";
import PrivateRoute from "./routes/privateRoutes";

const App: FC = () => {
  return (
    <Routes>
      {PublicRoutes.map((item, key) => (
        <Route path={item.path} element={item.component} key={key} />
      ))}
      {PrivateRoutes.map((item,key) => {
        return (
          <Route
            path={item.path}
            key={key}
            element={<PrivateRoute>{item.component}</PrivateRoute>}
          ></Route>
        );
      })}
    </Routes>
  );
};

export default App;

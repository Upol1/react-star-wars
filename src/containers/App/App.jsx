import { Routes, Route } from "react-router-dom";
import routesConfig from "@routes/routesConfig";
import Header from "@components/Header";

import styles from "./App.module.css";

const App = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Routes>
          {routesConfig.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default App;

// cn(ClassName)
// ? {}  - можно писать  несколько функций
// exact - нужен чтобы переходил при таком /1 url

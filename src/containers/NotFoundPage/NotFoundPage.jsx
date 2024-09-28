import { useLocation } from "react-router-dom";
import img from "./img/not-found.png";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  let location = useLocation(); // ? Хук useLocation -  возвращает объект location , представляющий текущий URL.

  return (
    <>
      <img className={styles.img} src={img} alt="Not Found" />
      <p className={styles.text}>
        No match for <u>{location.pathname}</u>
      </p>
    </>
  );
};

export default NotFoundPage;

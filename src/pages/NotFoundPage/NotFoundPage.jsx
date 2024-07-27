import { Link } from "react-router-dom";

import styles from "./NotFoundPage.module.scss";

function NotFoundPage() {
  return (
    <div className={styles.main_container}>
      <span>Такой страницы не существует...</span>
      <Link className={styles.link} to="/">
        Вернуться назад
      </Link>
    </div>
  );
}

export default NotFoundPage;

import styles from "./MainPage.module.scss";

import SearchInput from "../../components/SearchInput/SearchInput";
import Table from "../../components/Table/Table";

function MainPage() {
  return (
    <div className={styles.main_container}>
      <SearchInput />
      <Table />
    </div>
  );
}

export default MainPage;

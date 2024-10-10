import React from "react";
import styles from "./page.module.css";
import SearchIcon from "@mui/icons-material/Search";

function Page() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.search}>
          <input
            className={styles.input}
            type="text"
            placeholder="検索"
          ></input>
          <div>
            <SearchIcon className={styles.SearchIcon} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

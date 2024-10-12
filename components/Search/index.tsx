import React from "react";
import styles from "./style.module.css";
import { FaSearch } from "react-icons/fa";

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
            <FaSearch className={styles.SearchIcon} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;

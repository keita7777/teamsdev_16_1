import React from "react";
import styles from "./style.module.css";
import { FaSearch } from "react-icons/fa";

function Search() {
  return (
        <div className={styles.search}>
          <input
            className={styles.input}
            type="text"
            placeholder="検索"
          />
          <div>
            <FaSearch className={styles.SearchIcon} />
          </div>
        </div>
  );
}

export default Search;

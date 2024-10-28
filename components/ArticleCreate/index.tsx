import React from "react";
import styles from "./styles.module.css";
import { HiArrowUp } from "react-icons/hi";

const ArticleCreate = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <input className={styles.titleInput} placeholder="Title" />
      </div>
      <div className={styles.fileWrapper}>
        <input className={styles.fileInput} type="file" />
        <div className={styles.uploadContainer}>
          <span className={styles.uploadIcon}>
            <HiArrowUp />
          </span>
          <span className={styles.uploadText}>Upload Image</span>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <textarea className={styles.contentInput} placeholder="Text"></textarea>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.createButton}>Create</button>
      </div>
    </div>
  );
};

export default ArticleCreate;

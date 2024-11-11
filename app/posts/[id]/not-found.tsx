import Header from "@/components/Header";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2>お探しのページは見つかりません。</h2>
        <Link href="/" className={styles.homeBtn}>
          Homeへ戻る
        </Link>
      </div>
    </>
  );
};

export default NotFound;

import ArticleDetails from "@/components/ArticleDetails";
import Comments from "@/components/Comments";
import Header from "@/components/Header";
import MorePosts from "@/components/MorePosts";
import { TestData } from "@/DummyData/ArticleData";
import React from "react";
import styles from "./styles.module.css";

export default function Posts() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <ArticleDetails />
        <MorePosts posts={TestData} />
        <Comments />
      </div>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard";
import styles from "./styles.module.css";

// フロント構築時のテストデータ
// バックエンド構築後はcomponents\ArticleList\TestDataごと削除する
// import { TestData } from "@/DummyData/ArticleData";
import { getAllData } from "@/DummyData/ArticleData";

const ArticleList = () => {
  const [ArticleData, setArticleData] = useState<any>([]);

  useEffect(() => {
    const AllData = async () => {
      const ArticleData = await getAllData();
      setArticleData(ArticleData);
      // eslint-disable-next-line no-console
      console.log(ArticleData);
    };
    AllData();
  }, []);

  return (
    <div className={styles.articleListContainer}>
      <ul className={styles.articleList}>
        {/* {TestData.map((data) => ( */}
        {ArticleData.map((data: any) => (
          <ArticleCard key={data.id} data={data} />
        ))}
      </ul>
    </div>
  );
};
export default ArticleList;

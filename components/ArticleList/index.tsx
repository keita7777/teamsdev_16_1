"use client";
import { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard";
import styles from "./styles.module.css";

type Posts = {
  category_id: string;
  content: string;
  created_at: string;
  id: string;
  image_path: string;
  title: string;
  updated_at: string;
  user_id: string;
};

const ArticleList = () => {
  const [allDatas, setAllDatas] = useState<Posts[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("/api/getData");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (Array.isArray(data.posts)) {
        setAllDatas(data.posts);
      } else {
        Error("Received data is not an array:", data);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className={styles.articleListContainer}>
      <ul className={styles.articleList}>
        {allDatas.map((data: any) => (
          <ArticleCard key={data.id} data={data} />
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;

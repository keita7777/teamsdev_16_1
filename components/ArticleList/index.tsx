"use client";

import React, { useState, useEffect } from "react";
import ArticleCard from "../ArticleCard";
import Pagination from "../Pagination";
import styles from "./styles.module.css";

type Category = { id: string; name: string };
type User = { name: string };
type Post = {
  content: string;
  created_at: string;
  id: string;
  image_path: string;
  title: string;
  updated_at: string;
  categories: Category;
  users: User;
};

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`);
  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }
  const { posts }: { posts: Post[] } = await res.json();
  return posts.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    image_path: item.image_path,
    created_at: item.created_at,
    updated_at: item.updated_at,
    categories: item.categories,
    users: item.users,
  }));
};

const ArticleList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; 

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("エラーが発生しました");
        }
      }
    };

    getPosts();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className={styles.articleListContainer}>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <ul className={styles.articleList}>
        {currentPosts.map((post) => (
          <ArticleCard key={post.id} data={post} />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ArticleList;


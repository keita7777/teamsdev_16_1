"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const fetchPosts = async (currentPage: number): Promise<{ posts: Post[]; count: number }> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog?page=${currentPage}`);

  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }
  const { posts, count }: { posts: Post[]; count: number } = await res.json();

  return { posts, count };
};

const ArticleList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postCount, setPostCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(Number(searchParams?.get("page")) || 1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const perPage = 6;
  const totalPage = Math.ceil(postCount / perPage);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
    setCurrentPage(page);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts(currentPage);
        setPostCount(fetchedPosts.count);
        setPosts(fetchedPosts.posts);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("エラーが発生しました");
        }
      }
    };

    getPosts();
  }, [currentPage]);

  return (
    <div className={styles.articleListContainer}>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <ul className={styles.articleList}>
        {posts.map((post) => (
          <ArticleCard key={post.id} data={post} />
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default ArticleList;


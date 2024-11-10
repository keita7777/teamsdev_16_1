"use client";
import ArticleDetails from "@/components/ArticleDetails";
import Comments from "@/components/Comments";
import Header from "@/components/Header";
import MorePosts from "@/components/MorePosts";
import { TestData } from "@/DummyData/ArticleData";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Post } from "@/type/post";

export default function Posts({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const router = useRouter();
      try {
        const id = params.id;

        const response = await fetch(`/api/${id}`);
        if (!response.ok) {
          router.replace("/404");
        }
        const result = await response.json();
        if (!result.posts) {
          router.replace("/404");
        }
        setPost(result.posts);
      } catch (error) {
        throw error;
      }
    };
    fetchPost();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        {post ? <ArticleDetails articleData={post} /> : <p>Loading...</p>}
        <MorePosts posts={TestData} />
        <Comments />
      </div>
    </>
  );
}

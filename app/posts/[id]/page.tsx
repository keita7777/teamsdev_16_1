import ArticleDetails from "@/components/ArticleDetails";
import Comments from "@/components/Comments";
import Header from "@/components/Header";
import MorePosts from "@/components/MorePosts";
import { TestData } from "@/DummyData/ArticleData";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";

async function fetchPost(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }
  const result = await response.json();
  return result.posts;
}

export default async function Posts({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  if (!post) {
    notFound();
  }

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

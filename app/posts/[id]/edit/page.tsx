import ArticleCreate from "@/components/ArticleCreate";
import Header from "@/components/Header";
import { fetchPost } from "../page";

export default async function EditPost({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);
  return (
    <>
      <Header />
      <ArticleCreate editPost={post} />
    </>
  );
}

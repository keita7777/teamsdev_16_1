import ArticleCard from "../ArticleCard";
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

const ArticleList = async () => {
  let posts: Post[] = [];
  let errorMessage: string | null = null;

  try {
    posts = await fetchPosts();
  } catch (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "エラーが発生しました";
    }
  }

  return (
    <div className={styles.articleListContainer}>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <ul className={styles.articleList}>
        {posts.map((post) => (
          <ArticleCard key={post.id} data={post} />
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;

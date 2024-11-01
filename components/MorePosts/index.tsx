import styles from "./styles.module.css";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import ArticleImage from "@/DummyData/article-image.png";

type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  image_path: string | StaticImageData;
  author: string;
  created_at: string;
};

type MorePostsProps = {
  posts: Post[];
};

const MorePosts = ({ posts }: MorePostsProps) => {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>More Posts</h3>
      <div className={styles.morePostsContainer}>
        {posts.slice(0, 3).map((post) => (
          <div key={post.id} className={styles.postCard}>
            <Link href={`/posts/${post.id}`}>
              <Image src={ArticleImage} alt={post.title} className={styles.postImage} width={300} height={200} />
              <h4 className={styles.postTitle}>{post.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MorePosts;

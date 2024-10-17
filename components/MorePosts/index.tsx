import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { TestData } from "../ArticleList/TestData/TestData";
import ArticleImage from "../ArticleList/TestData/article-image.png";

type Post = {
  id: string;
  title: string;
  imageUrl: string;
};

type MorePostsProps = {
  posts: Post[];
};

const MorePosts = ({ posts }: MorePostsProps) => {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>More Posts</h3>
      <div className={styles.morePostsContainer}>
        {TestData.slice(2, 5).map((post) => (
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

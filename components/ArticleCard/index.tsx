import Image from "next/image";
import Link from "next/link";
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

type ArticleCardProps = {
  data: Posts;
};

const ArticleCard = ({ data }: ArticleCardProps) => {
  return (
    <li className={styles.article}>
      <Link href={"/"}>
        <div className={styles.articleImageContainer}>
          <Image src={data.image_path} alt={data.title} fill sizes="33vw" className={styles.articleImage} />
        </div>
        <div className={styles.articleInfo}>
          <div className={styles.articleInfoTop}>
            <h2 className={styles.articleTitle}>{data.title}</h2>
            <p className={styles.articleCategory}>{data.category_id}</p>
          </div>
          <div className={styles.articleInfoMiddle}>
            <p className={styles.articleAuthor}>{data.user_id}</p>
            <p className={styles.articleDate}>{data.created_at}</p>
          </div>
          <div>
            <p className={styles.articleContent}>{data.content}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};
export default ArticleCard;

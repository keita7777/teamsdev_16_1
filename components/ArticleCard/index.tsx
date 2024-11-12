import Image from "next/image";
import Link from "next/link";
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

type ArticleCardProps = {
  data: Post;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
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
            <p className={styles.articleCategory}>{data.categories.name}</p>
          </div>
          <div className={styles.articleInfoMiddle}>
            <p className={styles.articleAuthor}>{data.users.name}</p>
            <p className={styles.articleDate}>{formatDate(data.created_at)}</p>
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

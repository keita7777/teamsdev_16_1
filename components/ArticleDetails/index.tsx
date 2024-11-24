import Image from "next/image";
import styles from "./style.module.css";
import articleDetailsImage from "@/DummyData/articleDetails-image.png";
import { Post } from "@/type/post";

type ArticleDetailsProps = {
  articleData: Post;
};

const ArticleDetails = ({ articleData }: ArticleDetailsProps) => {
  return (
    <div className={styles.articleDetails}>
      <div className={styles.blogTitle}>
        <h1>{articleData.title}</h1>
        <Image
          className={styles.profoleImage}
          src={articleData.users.profileImg || articleDetailsImage}
          alt="profoleImage"
          height={60}
          width={60}
        />
      </div>
      <div>
        <Image
          className={styles.blogImage}
          src={articleData.image_path}
          alt={articleData.title}
          height={500}
          width={840}
        />
      </div>
      <p>{articleData.content}</p>
    </div>
  );
};

export default ArticleDetails;

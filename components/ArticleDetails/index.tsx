import Image from "next/image";
import styles from "./style.module.css";
import articleDetailsImage from "@/DummyData/articleDetails-image.png";
import { TestData } from "@/DummyData/ArticleData";

const ArticleDetails = () => {
  const articleData = TestData[2];

  return (
    <div className={styles.articleDetails}>
      <div className={styles.blogTitle}>
        <h1>Blog Title</h1>
        <Image className={styles.profoleImage} src={articleDetailsImage} alt="profoleImage" height={50} width={50} />
      </div>
      <div>
        <Image
          className={styles.blogImage}
          src={articleData.image_path}
          alt={articleData.title}
          height={500}
          width={740}
        />
      </div>
      <h2 className={styles.articleTitle}>{articleData.title}</h2>
      <p>{articleData.content}</p>
    </div>
  );
};

export default ArticleDetails;

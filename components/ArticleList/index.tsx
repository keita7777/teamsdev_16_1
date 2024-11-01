import ArticleCard from "../ArticleCard";
import styles from "./styles.module.css";

// フロント構築時のテストデータ
// バックエンド構築後はcomponents\ArticleList\TestDataごと削除する
import { TestData } from "@/DummyData/ArticleData";

const ArticleList = () => {
  return (
    <div className={styles.articleListContainer}>
      <ul className={styles.articleList}>
        {TestData.map((data) => (
          <ArticleCard key={data.id} data={data} />
        ))}
      </ul>
    </div>
  );
};
export default ArticleList;

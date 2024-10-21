import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import styles from "./styles.module.css";

// テストデータ
import { CommentData } from "@/DummyData/CommentData";

const Comments = () => {
  return (
    <div className={styles.commentsContainer}>
      <h2>Comments</h2>
      <CommentForm />
      {CommentData.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
export default Comments;

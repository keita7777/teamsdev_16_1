import styles from "./styles.module.css";

const CommentForm = () => {
  return (
    <form className={styles.commentForm}>
      <input className={styles.commentInput} type="text" name="comment" placeholder="Your comment..." />
      <button className={styles.commentBtn}>Comment</button>
    </form>
  );
};
export default CommentForm;

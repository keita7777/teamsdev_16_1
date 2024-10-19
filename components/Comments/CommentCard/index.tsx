import Image from "next/image";
import styles from "./styles.module.css";
import { FaUserCircle } from "react-icons/fa";

const CommentCard = ({ comment }: any) => {
  return (
    <div className={styles.commentCardContainer}>
      <div className={styles.commentCardLeft}>
        {comment.profileImg ? (
          <Image className={styles.userIcon} src={comment.profileImg} alt="プロフィール画面" width={64} height={64} />
        ) : (
          <FaUserCircle className={styles.defaultUserIcon} />
        )}

        <span className={styles.userName}>{comment.username}</span>
      </div>
      <div className={styles.commentCardRight}>
        <p>{comment.comment}</p>
        <p className={styles.commentDate}>{comment.created_at}</p>
      </div>
    </div>
  );
};
export default CommentCard;

"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { FaUserCircle } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { useParams } from "next/navigation";

type CommentCardProps = {
  comment: {
    post_id: string;
    comment: string;
    created_at: string;
  };
  users: {
    name: string;
    profileImg: string;
  };
};

const CommentCard = ({ comment, users }: CommentCardProps) => {
  const params = useParams();
  const id = params?.id;
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), {
    addSuffix: true,
    locale: ja,
  });

  if (comment.post_id !== id) {
    return null;
  }

  return (
    <div className={styles.commentCardContainer}>
      <div className={styles.commentCardLeft}>
        {users.profileImg ? (
          <Image className={styles.userIcon} src={users.profileImg} alt="プロフィール画面" width={64} height={64} />
        ) : (
          <FaUserCircle className={styles.defaultUserIcon} />
        )}

        <span className={styles.userName}>{users.name}</span>
      </div>
      <div className={styles.commentCardRight}>
        <p>{comment.comment}</p>
        <p className={styles.commentDate}>{timeAgo}</p>
      </div>
    </div>
  );
};
export default CommentCard;

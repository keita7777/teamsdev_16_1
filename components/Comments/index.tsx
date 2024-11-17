import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import styles from "./styles.module.css";

type UserComment = {
  id: string;
  post_id: string;
  comment: string;
  created_at: string;
  users: {
    name: string;
    email: string;
    profileImg: string;
  };
};

const fetchComments = async (): Promise<UserComment[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }

  const { comments }: { comments: UserComment[] } = await res.json();
  return comments;
};

const Comments = async () => {
  let comments: UserComment[] = [];
  let errorMessage: string | null = null;

  try {
    comments = await fetchComments();
  } catch (error) {
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = "エラーが発生しました";
    }
  }

  return (
    <div className={styles.commentsContainer}>
      <h2>Comments</h2>
      <CommentForm />
      {errorMessage ? (
        <div className={styles.errorMessage}>{errorMessage}</div>
      ) : (
        comments.map((data) => <CommentCard key={data.id} comment={data} users={data.users} />)
      )}
    </div>
  );
};

export default Comments;

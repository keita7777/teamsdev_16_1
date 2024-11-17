"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter, useParams } from "next/navigation";

const CommentForm = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const insertData = {
      comment: inputValue,
      // ユーザー情報が取得できるようになり次第、動的になるよう変更
      user_id: "1",
      post_id: postId,
      created_at: new Date().toISOString(),
    };

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insertData),
    });

    const result = await response.json();

    if (response.ok) {
      setInputValue("");
      alert(result.message);
      router.refresh();
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <form className={styles.commentForm} onSubmit={handleSubmit}>
      <input
        className={styles.commentInput}
        type="text"
        name="comment"
        value={inputValue}
        placeholder="Your comment..."
        onChange={handleInputChange}
      />
      <button className={styles.commentBtn}>Comment</button>
    </form>
  );
};
export default CommentForm;

import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

type Props = {
  isSignUp: boolean;
};

const AuthForm = ({ isSignUp }: Props) => {
  return (
    <div className={styles.wrapper}>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form className={styles.formContainer}>
        {/* サインアップ時のみ名前入力を表示 */}
        {isSignUp && (
          <>
            <p className={styles.inputTitle}>Name</p>
            <input type="text" name="name" placeholder="Enter your name" />
          </>
        )}
        <p className={styles.inputTitle}>Email</p>
        <input type="email" name="email" placeholder="Enter your email" />
        <p className={styles.inputTitle}>Password</p>
        <input type="password" name="password" placeholder="Enter your password" />
      </form>
      <button type="submit" className={styles.submitButton}>
        {isSignUp ? "Sign Up" : "Sign In"}
      </button>

      {isSignUp ? (
        <p className={styles.comment}>
          {/* サインアップ時のコメント */}
          Already have an account?
          <Link href="/signin">
            <span>Sign In</span>
          </Link>
        </p>
      ) : (
        <p className={styles.comment}>
          {/* サインイン時のコメント */}
          Don&apos;t have an account?
          <Link href="/signup">
            <span>Sign Up</span>
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthForm;

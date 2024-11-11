"use client";

import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { signupFormType } from "@/type/authFormType";
import { signUpWithEmail } from "@/utils/firebase/auth";

type Props = {
  isSignUp: boolean;
};

const AuthForm = ({ isSignUp }: Props) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<signupFormType>();

  const onSubmit = async (data: signupFormType) => {
    const { name, email, password } = data;
    try {
      const response = await signUpWithEmail(email, password);
      console.log(response.user.uid);
    } catch (error: any) {
      if (
        error.message === "このメールアドレスは既に使用されています" ||
        error.message === "無効なメールアドレスです"
      ) {
        setError("email", { message: error.message });
      } else if (error.message === "パスワードは6文字以上にしてください") {
        setError("password", { message: error.message });
      } else {
        setError("root", { message: error.message });
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        {errors.root && <p className={styles.errorMessage}>{errors.root.message?.toString()}</p>}
        {/* サインアップ時のみ名前入力を表示 */}
        {isSignUp && (
          <>
            <p className={styles.inputTitle}>Name</p>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "名前を入力してください" })}
            />
            {errors.name && <p className={styles.errorMessage}>{errors.name.message?.toString()}</p>}
          </>
        )}
        <p className={styles.inputTitle}>Email</p>
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "メールアドレスを入力してください",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "無効なメールアドレスです",
            },
          })}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message?.toString()}</p>}
        <p className={styles.inputTitle}>Password</p>
        <input
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "パスワードを入力してください",
            minLength: { value: 6, message: "パスワードは6文字以上にしてください" },
          })}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message?.toString()}</p>}
        <button type="submit" className={styles.submitButton}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

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

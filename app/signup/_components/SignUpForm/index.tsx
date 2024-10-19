import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

const SignUpForm = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Sign Up</h2>
      <form className={styles.formContainer}>
        <p className={styles.inputTitle}>Name</p>
        <input type="text" name="name" placeholder="Enter your name" />
        <p className={styles.inputTitle}>Email</p>
        <input type="email" name="email" placeholder="Enter your email" />
        <p className={styles.inputTitle}>Password</p>
        <input type="password" name="password" placeholder="Enter your password" />
      </form>
      <button type="submit" className={styles.submitButton}>
        Sign Up
      </button>
      <p className={styles.comment}>
        Already have an account?
        <Link href="/signin">
          <span>Sign in</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;

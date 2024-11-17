import React from "react";
import Header from "../../components/Header";
import SignUpForm from "../../components/AuthForm/SignUpForm";
import styles from "./styles.module.css";

const SignUpPage = () => {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;

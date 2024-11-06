import Header from "@/components/Header";
import AuthForm from "@/components/AuthForm";
// import styles from "./styles.module.css";

const SignIn = () => {
  return (
    <>
      <Header />
      <div>
        <AuthForm isSignUp={false} />
      </div>
    </>
  );
};

export default SignIn;

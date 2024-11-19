import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error: any) {
    let errorMessage = "サインアップに失敗しました";

    if (error.code) {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "このメールアドレスは既に使用されています";
          break;
        case "auth/invalid-email":
          errorMessage = "無効なメールアドレスです";
          break;
        case "auth/weak-password":
          errorMessage = "パスワードは6文字以上にしてください";
          break;
        default:
          errorMessage = "予期しないエラーが発生しました";
          break;
      }
    }

    throw new Error(errorMessage);
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error: any) {
    let errorMessage = "サインインに失敗しました";
    if (error.code) {
      switch (error.code) {
        case "auth/invalid-credential":
          errorMessage = "メールアドレスかパスワードが間違っています";
          break;
        default:
          errorMessage = "予期しないエラーが発生しました";
          break;
      }
      throw new Error(errorMessage);
    }
  }
};

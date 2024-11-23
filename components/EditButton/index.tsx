"use client";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase/config";
import { useEffect, useState } from "react";
import { Post } from "@/type/post";

type ArticleDetailsProps = {
  articleData: Post;
};

const EditButton = ({ articleData }: ArticleDetailsProps) => {
  const [loginUser, setLoginUser] = useState<string | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginUser(user.uid);
      } else {
        setLoginUser(null);
      }
    });
  }, []);

  if (articleData && loginUser === articleData.user_id) {
    return (
      <Link href={`${articleData.id}/edit`}>
        <button className={styles.editButton}>Edit</button>
      </Link>
    );
  }
  return null;
};

export default EditButton;

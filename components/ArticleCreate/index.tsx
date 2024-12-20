"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { HiArrowUp } from "react-icons/hi";
import { uploadImage } from "@/utils/supabase/uploadImage";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import InputImage from "./InputImage";
import { useGetImageUrl } from "./hooks/useGetImageUrl";
import { FormValues } from "@/type/articleCraeteFormType";
import { Post } from "@/type/post";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase/config";

type EditPostProps = {
  editPost?: Post;
};

const IMAGE_ID = "imageId";

const ArticleCreate = ({ editPost }: EditPostProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editImagePath, setEditImagePath] = useState<string | null>(editPost?.image_path || null);
  const {
    handleSubmit,
    register,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      title: editPost?.title || "",
      content: editPost?.content || "",
    },
  });
  const router = useRouter();
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile = e.currentTarget.files[0];
      setImageFile(targetFile);
    }
  };

  // state (imageFile)が更新されたら、画像URLを作成する。
  const { imageUrl } = useGetImageUrl({ file: imageFile });
  const handleClickCancelButton = () => {
    setImageFile(null);
    setEditImagePath(null);
    // useFormで管理しているfileをリセット
    resetField("file");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createBlog = async (title: string, content: string, imagePath: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          image_path: imagePath,

          // 開発用記述
          user_id: loginUser,
          category_id: "3f415bbf-5027-4600-938e-f30afc7a5367",
          // 開発用記述
        }),
      });
      if (!response.ok) {
        return { message: "エラーが発生しました" };
      }
    } catch (error) {
      return { message: "エラーが発生しました", error };
    }
  };

  const uploadBlog = async (title: string, content: string, imagePath: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${editPost?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          image_path: imagePath,
        }),
      });
      if (!response.ok) {
        return { message: "エラーが発生しました" };
      }
    } catch (error) {
      return { message: "エラーが発生しました", error };
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const { title, content, file } = data;
    const imagePath = file?.[0];

    if ((!imagePath && !editImagePath) || (imagePath && !imagePath.type.startsWith("image/"))) {
      return setError("file", {
        message: "画像ファイルを選択してください",
      });
    }

    try {
      const fullPath =
        imagePath && imagePath.type.startsWith("image/") ? await uploadImage(imagePath) : editImagePath || "";
      if (editPost) {
        await uploadBlog(title, content, fullPath);
        router.back();
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        await createBlog(title, content, fullPath);
        router.push("/");
        router.refresh();
      }
      return { message: "投稿完了" };
    } catch (error) {
      return { message: "投稿失敗", error };
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <div className={styles.titleWrapper}>
        <input
          className={styles.titleInput}
          placeholder="Title"
          id="title"
          disabled={isSubmitting}
          {...register("title", { required: "タイトルを入力してください" })}
        />
        {errors.title && <p className={styles.errorMessage}>{errors.title.message?.toString()}</p>}
      </div>
      <label htmlFor={IMAGE_ID} className={styles.fileWrapper}>
        {imageUrl && imageFile ? (
          <img src={imageUrl} alt="アップロード画像" className={styles.uploadImage} />
        ) : editImagePath ? (
          <img src={editImagePath} alt="編集画像" className={styles.uploadImage} />
        ) : (
          <div className={styles.uploadContainer}>
            <span className={styles.uploadIcon}>
              <HiArrowUp />
            </span>
            <span className={styles.uploadText}>Upload Image</span>
          </div>
        )}
        <InputImage
          ref={fileInputRef}
          id={IMAGE_ID}
          onChange={handleFileChange}
          isSubmitting={isSubmitting}
          register={register}
          editImagePath={editImagePath}
        />
      </label>
      {(imageUrl && imageFile) || editImagePath ? (
        <button onClick={handleClickCancelButton} className={styles.cancelText}>
          画像キャンセル
        </button>
      ) : null}

      {errors.file && <p className={styles.errorMessage}>{errors.file.message?.toString()}</p>}
      <div className={styles.contentWrapper}>
        <textarea
          {...register("content", { required: "記事内容を入力してください" })}
          className={styles.contentInput}
          placeholder="Text"
          id="content"
          disabled={isSubmitting}
        ></textarea>
      </div>
      {errors.content && <p className={styles.errorMessage}>{errors.content.message?.toString()}</p>}
      <div className={styles.buttonWrapper}>
        <button type="submit" className={styles.createButton} disabled={isSubmitting}>
          {editPost ? "Upload" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default ArticleCreate;

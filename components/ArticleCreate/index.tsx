"use client";

import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import { HiArrowUp } from "react-icons/hi";
import { uploadImage } from "@/utils/supabase/uploadImage";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import InputImage from "./InputImage";
import { useGetImageUrl } from "./hooks/useGetImageUrl";

const IMAGE_ID = "imageId";

const ArticleCreate = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {
    handleSubmit,
    register,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();
  const router = useRouter();

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
          user_id: "1",
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

  const onSubmit = async (data: FieldValues) => {
    const { title, content, file } = data;
    const imagePath = file?.[0];

    if (!imagePath.type.startsWith("image/")) {
      return setError("file", {
        message: "画像ファイルを選択してください",
      });
    }

    try {
      const fullPath = await uploadImage(imagePath);
      await createBlog(title, content, fullPath);
      router.push("/");
      router.refresh();
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
          disabled={isSubmitting}
          {...register("title", { required: "タイトルを入力してください" })}
        />
        {errors.title && <p className={styles.errorMessage}>{errors.title.message?.toString()}</p>}
      </div>
      <label htmlFor={IMAGE_ID} className={styles.fileWrapper}>
        {imageUrl && imageFile ? (
          <img src={imageUrl} alt="アップロード画像" className={styles.uploadImage} />
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
        />
      </label>
      {imageUrl && imageFile && (
        <button onClick={handleClickCancelButton} className={styles.cancelText}>
          画像キャンセル
        </button>
      )}

      {errors.file && <p className={styles.errorMessage}>{errors.file.message?.toString()}</p>}
      <div className={styles.contentWrapper}>
        <textarea
          {...register("content", { required: "記事内容を入力してください" })}
          className={styles.contentInput}
          placeholder="Text"
          disabled={isSubmitting}
        ></textarea>
      </div>
      {errors.content && <p className={styles.errorMessage}>{errors.content.message?.toString()}</p>}
      <div className={styles.buttonWrapper}>
        <button type="submit" className={styles.createButton} disabled={isSubmitting}>
          Create
        </button>
      </div>
    </form>
  );
};

export default ArticleCreate;

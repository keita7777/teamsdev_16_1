"use client";
import React, { useRef, useState } from "react";
import styles from "./styles.module.css";
import { HiArrowUp } from "react-icons/hi";
import InputImage from "./InputImage";
import { useGetImageUrl } from "./hooks/useGetImageUrl";

const IMAGE_ID = "imageId";

const ArticleCreate = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <input className={styles.titleInput} placeholder="Title" />
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
        <InputImage ref={fileInputRef} id={IMAGE_ID} onChange={handleFileChange} />
      </label>
      {imageUrl && imageFile && (
        <button onClick={handleClickCancelButton} className={styles.cancelText}>
          画像キャンセル
        </button>
      )}
      <div className={styles.contentWrapper}>
        <textarea className={styles.contentInput} placeholder="Text"></textarea>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.createButton}>Create</button>
      </div>
    </div>
  );
};

export default ArticleCreate;

import { FormValues } from "@/type/articleCraeteFormType";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: InputHTMLAttributes<HTMLInputElement>["id"];
  isSubmitting: boolean;
  register: UseFormRegister<FormValues>;
};

const InputImage = forwardRef<HTMLInputElement, Props>(({ id, onChange, isSubmitting, register }) => {
  const {
    onChange: registerOnChange,
    ref: registerRef,
    ...registerExceptOnchangeAndRef
  } = register("file", {
    required: "画像を選択してください",
  });

  return (
    <input
      ref={registerRef}
      id={id}
      type="file"
      accept="image/*"
      onChange={(event) => {
        registerOnChange(event);
        onChange(event);
      }}
      hidden
      disabled={isSubmitting}
      {...registerExceptOnchangeAndRef}
    />
  );
});

InputImage.displayName = "InputImage";
export default InputImage;

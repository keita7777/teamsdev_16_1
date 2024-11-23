import { FormValues } from "@/type/articleCraeteFormType";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: InputHTMLAttributes<HTMLInputElement>["id"];
  isSubmitting: boolean;
  register: UseFormRegister<FormValues>;
  editImagePath?: string | null;
};

const InputImage = forwardRef<HTMLInputElement, Props>(
  ({ id, onChange, isSubmitting, register, editImagePath }, ref) => {
    const {
      onChange: registerOnChange,
      ref: registerRef,
      ...registerExceptOnchangeAndRef
    } = register("file", {
      required: !editImagePath && "画像を選択してください",
    });

    const inputRef = (element: HTMLInputElement | null) => {
      registerRef(element); // React Hook Formのregisterのref
      if (typeof ref === "function") {
        ref(element); // forwardRefのref
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
    };

    return (
      <input
        ref={inputRef}
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
  },
);

InputImage.displayName = "InputImage";
export default InputImage;

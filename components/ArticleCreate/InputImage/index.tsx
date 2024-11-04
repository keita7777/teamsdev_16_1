import React, { forwardRef, InputHTMLAttributes } from "react";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: InputHTMLAttributes<HTMLInputElement>["id"];
  isSubmitting: boolean;
  register: any;
};

const InputImage = forwardRef<HTMLInputElement, Props>(({ id, onChange, isSubmitting, register }, ref) => {
  const { onChange: registerOnChange, ...registerExceptOnchange } = register("file", {
    required: "画像を選択してください",
  });

  return (
    <input
      ref={ref}
      id={id}
      type="file"
      accept="image/*"
      onChange={(event) => {
        registerOnChange(event);
        onChange(event);
      }}
      hidden
      disabled={isSubmitting}
      {...registerExceptOnchange}
    />
  );
});

export default InputImage;

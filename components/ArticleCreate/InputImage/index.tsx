import React, { forwardRef, InputHTMLAttributes } from "react";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id: InputHTMLAttributes<HTMLInputElement>["id"];
};

const InputImage = forwardRef<HTMLInputElement, Props>(({ id, onChange }, ref) => {
  return <input ref={ref} id={id} type="file" accept="image/*" onChange={onChange} hidden />;
});

export default InputImage;

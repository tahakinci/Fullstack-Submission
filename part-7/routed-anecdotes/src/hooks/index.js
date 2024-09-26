import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const clear = () => {
    setValue("");
  };

  return {
    name,
    value,
    onChange,
    clear,
  };
};

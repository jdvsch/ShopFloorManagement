import React from "react";

export default function useTextareaCounter(data) {
  const [counter, setCounter] = React.useState(data);

  const total = (data) => {
    setCounter(data.target.textLength);
  };
  return { counter, total };
}

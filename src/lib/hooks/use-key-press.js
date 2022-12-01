import { useState, useEffect } from "react";

function useKeyPress(targetKey: string, ref) {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }: { key: string }) {
    if (key === targetKey) {
      console.log("this happened");
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    const el = window;

    el?.addEventListener("keydown", downHandler);
    el?.addEventListener("keyup", upHandler);

    return () => {
      el?.removeEventListener("keydown", downHandler);
      el?.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
}

export default useKeyPress;

import { useState, useEffect } from "react";

const useCheckWidth = () => {
  const [gridState, setGridState] = useState<Boolean>(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      return setGridState(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [gridState]);

  return gridState;
};

export default useCheckWidth;

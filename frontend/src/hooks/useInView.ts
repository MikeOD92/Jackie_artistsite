import { useState, useEffect } from "react";

const useInView = (ref: any) => {
  const [visable, setVisable] = useState<Boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref) return;
      const { top } = ref.current.getBoundingClientRect();
      return setVisable(top > window.innerHeight - 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, visable]);

  return visable;
};

export default useInView;

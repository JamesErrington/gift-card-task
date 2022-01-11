import { useState, useEffect } from "react";

// https://usehooks.com/useWindowSize/
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined as any,
    height: undefined as any,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth as any,
        height: window.innerHeight as any,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize as Record<string, number>;
}

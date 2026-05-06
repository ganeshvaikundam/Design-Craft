import { useRef } from "react";

export function useWindowHandle() {
  const windowRefs = useRef<Record<string, Window | null>>({});
  
  const openInNewWindow = (name: string, url: string, features?: string) => {
    if (windowRefs.current[name] && !windowRefs.current[name]!.closed) {
      windowRefs.current[name]!.focus();
    } else {
      windowRefs.current[name] = window.open(url, name, features || "width=1200,height=800");
    }
  };
  
  const closeWindow = (name: string) => {
    if (windowRefs.current[name]) {
      windowRefs.current[name]!.close();
    }
  };
  
  return { openInNewWindow, closeWindow };
}
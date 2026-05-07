import { useRef, useCallback } from "react";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Build a fully-qualified absolute URL so window.open works from any context
 *  (iframe, proxied preview, production domain, etc.)
 */
export function siteUrl(path: string): string {
  return `${window.location.origin}${base}${path}`;
}

export function useWindowHandle() {
  const windowRefs = useRef<Record<string, Window | null>>({});

  const openInNewWindow = useCallback(
    (name: string, path: string, features?: string) => {
      const url = siteUrl(path);
      const existing = windowRefs.current[name];
      if (existing && !existing.closed) {
        // Window already open — navigate it to the new path and bring it forward
        existing.location.href = url;
        existing.focus();
      } else {
        windowRefs.current[name] = window.open(
          url,
          name,
          features || "width=1200,height=800,scrollbars=yes,resizable=yes"
        );
        windowRefs.current[name]?.focus();
      }
    },
    []
  );

  const closeWindow = useCallback((name: string) => {
    if (windowRefs.current[name] && !windowRefs.current[name]!.closed) {
      windowRefs.current[name]!.close();
      windowRefs.current[name] = null;
    }
  }, []);

  const isOpen = useCallback((name: string): boolean => {
    return !!(windowRefs.current[name] && !windowRefs.current[name]!.closed);
  }, []);

  return { openInNewWindow, closeWindow, isOpen };
}

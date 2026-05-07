import { useCallback } from "react";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Build a fully-qualified absolute URL from a root-relative path.
 * Works correctly in Replit preview (proxied iframe), Render, and any other host.
 */
export function siteUrl(path: string): string {
  return `${window.location.origin}${base}${path}`;
}

export function useWindowHandle() {
  /**
   * Opens the given path in a new browser tab (_blank).
   * Simple, reliable, works in all browsers and deployment environments.
   */
  const openInNewTab = useCallback((path: string) => {
    window.open(siteUrl(path), "_blank", "noopener,noreferrer");
  }, []);

  return { openInNewTab };
}

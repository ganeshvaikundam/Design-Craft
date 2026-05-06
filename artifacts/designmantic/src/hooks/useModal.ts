import { useState, useCallback, useEffect } from "react";

const modalState: Record<string, boolean> = {};
const listeners: Record<string, Set<(v: boolean) => void>> = {};

export function useModal(name: string) {
  const [isOpen, setIsOpen] = useState(modalState[name] ?? false);
  
  const open = useCallback(() => {
    modalState[name] = true;
    listeners[name]?.forEach(fn => fn(true));
  }, [name]);
  
  const close = useCallback(() => {
    modalState[name] = false;
    listeners[name]?.forEach(fn => fn(false));
  }, [name]);
  
  const toggle = useCallback(() => {
    const next = !modalState[name];
    modalState[name] = next;
    listeners[name]?.forEach(fn => fn(next));
  }, [name]);
  
  useEffect(() => {
    if (!listeners[name]) listeners[name] = new Set();
    listeners[name].add(setIsOpen);
    return () => {
      listeners[name]?.delete(setIsOpen);
    };
  }, [name]);
  
  return { isOpen, open, close, toggle };
}
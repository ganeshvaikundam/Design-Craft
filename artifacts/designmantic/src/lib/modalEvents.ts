export type ModalName = 'login' | 'signup' | 'video' | 'logoEditor' | 'checkout' | 'success' | 'templatePreview';

const listeners = new Map<ModalName, Set<(open: boolean, data?: any) => void>>();

export const modalEvents = {
  open(name: ModalName, data?: any) {
    listeners.get(name)?.forEach(fn => fn(true, data));
  },
  close(name: ModalName) {
    listeners.get(name)?.forEach(fn => fn(false));
  },
  on(name: ModalName, fn: (open: boolean, data?: any) => void) {
    if (!listeners.has(name)) listeners.set(name, new Set());
    listeners.get(name)!.add(fn);
    return () => listeners.get(name)!.delete(fn);
  }
};
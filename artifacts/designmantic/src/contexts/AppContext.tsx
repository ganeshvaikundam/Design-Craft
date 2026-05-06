import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  modalStates: Record<string, boolean>;
  openModal: (name: string) => void;
  closeModal: (name: string) => void;
  cartItems: any[];
  addToCart: (item: any) => void;
  isLoggedIn: boolean;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [modalStates, setModalStates] = useState<Record<string, boolean>>({});
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const openModal = (name: string) => setModalStates(prev => ({ ...prev, [name]: true }));
  const closeModal = (name: string) => setModalStates(prev => ({ ...prev, [name]: false }));
  
  const addToCart = (item: any) => setCartItems(prev => [...prev, item]);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <AppContext.Provider value={{
      modalStates, openModal, closeModal, cartItems, addToCart, isLoggedIn, favorites, toggleFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
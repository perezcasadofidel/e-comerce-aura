import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import { ALL_PRODUCTS, type Product } from "./data/products";

export type CartItem = {
  key: string;
  productId: number;
  name: string;
  material: string;
  size: string;
  price: number;
  qty: number;
  img: string;
};

type StoreType = {
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  updateQty: (key: string, delta: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  favorites: number[];
  favoriteProducts: Product[];
  toggleFavorite: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  favoritesOpen: boolean;
  setFavoritesOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  shakeCart: boolean;
  triggerShake: () => void;
};

const StoreContext = createContext<StoreType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shakeCart, setShakeCart] = useState(false);
  const shakeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addToCart = useCallback((product: Product, size?: string) => {
    const chosen = size ?? product.sizes[0] ?? "M";
    const key = `${product.id}-${chosen}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { key, productId: product.id, name: product.name, material: product.material, size: chosen, price: product.priceNum, qty: 1, img: product.img }];
    });
    triggerShake();
  }, []);

  const triggerShake = useCallback(() => {
    setShakeCart(false);
    if (shakeTimer.current) clearTimeout(shakeTimer.current);
    requestAnimationFrame(() => setShakeCart(true));
    shakeTimer.current = setTimeout(() => setShakeCart(false), 600);
  }, []);

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0));
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const favoriteProducts = ALL_PRODUCTS.filter((p) => favorites.includes(p.id));

  const value: StoreType = {
    cart,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
    favorites,
    toggleFavorite,
    cartOpen,
    setCartOpen,
    favoritesOpen,
    setFavoritesOpen,
    searchOpen,
    setSearchOpen,
    shakeCart,
    triggerShake,
    favoriteProducts,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreType {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
}
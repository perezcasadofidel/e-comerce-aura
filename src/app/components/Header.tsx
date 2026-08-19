import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Search, Heart, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "../store";

function NavLink({ label, to, active, hero }: { label: string; to: string; active?: boolean; hero?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const light = hero && !active;
  return (
    <button
      onClick={() => navigate(to)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-sm tracking-wide pb-0.5 cursor-pointer"
      style={{
        fontFamily: "Inter, sans-serif",
        color: active ? (hero ? "#FFFFFF" : "#2C2A28") : light ? "rgba(255,255,255,0.92)" : hovered ? "#2C2A28" : "#7A736E",
        textShadow: hero ? "0 1px 6px rgba(0,0,0,0.45)" : "none",
        transition: "color 0.25s ease",
      }}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: hero ? "#FFFFFF" : "#4A5D4E", transformOrigin: "center" }}
        animate={{ scaleX: hovered || active ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </button>
  );
}

export default function Header({ scrolled }: { scrolled: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHero = location.pathname === "/";
  const onHero = isHero && !scrolled;
  const { cartCount, favorites, setCartOpen, setFavoritesOpen, setSearchOpen, shakeCart } = useStore();
  const iconColor = onHero ? "#FFFFFF" : "#2C2A28";

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      animate={{
        background: onHero
          ? "linear-gradient(to bottom, rgba(44,42,40,0.35) 0%, rgba(44,42,40,0) 100%)"
          : scrolled || !isHero
            ? "rgba(247,244,240,0.97)"
            : "rgba(247,244,240,0)",
        boxShadow: scrolled || !isHero ? "0 1px 0 #E5DFD9" : "none",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ backdropFilter: scrolled ? "blur(12px)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-10 h-16 flex items-center justify-between">
        <motion.button
          onClick={() => navigate("/")}
          className="text-2xl tracking-widest cursor-pointer"
          style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}
          whileHover={{ opacity: 0.7 }}
        >
          Aura
        </motion.button>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink label="Nueva" to="/nueva" active={location.pathname === "/nueva"} hero={onHero} />
          <NavLink label="Mujer" to="/mujer" active={location.pathname === "/mujer"} hero={onHero} />
          <NavLink label="Hombre" to="/hombre" active={location.pathname === "/hombre"} hero={onHero} />
          <NavLink label="Sostenibilidad" to="/sostenibilidad" active={location.pathname === "/sostenibilidad"} hero={onHero} />
        </nav>
        <div className="flex items-center gap-5">
          <motion.button
            onClick={() => setSearchOpen(true)}
            whileHover={{ opacity: 0.6 }}
            className="cursor-pointer"
            aria-label="Buscar"
            style={{ textShadow: onHero ? "0 1px 6px rgba(0,0,0,0.45)" : "none" }}
          >
            <Search size={18} strokeWidth={1.5} style={{ color: iconColor }} />
          </motion.button>
          <div className="relative">
            <motion.button
              onClick={() => setFavoritesOpen(true)}
              whileHover={{ opacity: 0.6 }}
              className="cursor-pointer"
              aria-label="Favoritos"
              style={{ textShadow: onHero ? "0 1px 6px rgba(0,0,0,0.45)" : "none" }}
            >
              <Heart size={18} strokeWidth={1.5} style={{ color: iconColor }} />
            </motion.button>
            <AnimatePresence>
              {favorites.length > 0 && (
                <motion.span
                  key={favorites.length}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                  style={{ background: "#C67C4E", fontSize: "9px", fontFamily: "Inter, sans-serif" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {favorites.length}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="relative">
            <motion.button
              onClick={() => setCartOpen(true)}
              whileHover={{ opacity: 0.6 }}
              className="cursor-pointer"
              aria-label="Bolsa"
              animate={shakeCart ? { x: [0, 5, -5, 5, -4, 3, -2, 0] } : { x: 0 }}
              transition={shakeCart ? { duration: 0.5 } : { duration: 0.2 }}
              style={{ textShadow: onHero ? "0 1px 6px rgba(0,0,0,0.45)" : "none" }}
            >
              <ShoppingBag size={18} strokeWidth={1.5} style={{ color: iconColor }} />
            </motion.button>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                  style={{ background: "#C67C4E", fontSize: "9px", fontFamily: "Inter, sans-serif" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
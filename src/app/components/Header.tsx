import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useStore } from "../store";

const NAV_ITEMS = [
  { label: "Nueva", to: "/nueva" },
  { label: "Mujer", to: "/mujer" },
  { label: "Hombre", to: "/hombre" },
  { label: "Sostenibilidad", to: "/sostenibilidad" },
];

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
  const [menuOpen, setMenuOpen] = useState(false);
  const isHero = location.pathname === "/";
  const onHero = isHero && !scrolled;
  const { cartCount, favorites, setCartOpen, setFavoritesOpen, setSearchOpen, shakeCart } = useStore();
  const iconColor = onHero ? "#FFFFFF" : "#2C2A28";

  const go = (to: string) => {
    setMenuOpen(false);
    navigate(to);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40"
      animate={{
        background: menuOpen
          ? "rgba(247,244,240,0.97)"
          : onHero
            ? "linear-gradient(to bottom, rgba(44,42,40,0.35) 0%, rgba(44,42,40,0) 100%)"
            : scrolled || !isHero
              ? "rgba(247,244,240,0.97)"
              : "rgba(247,244,240,0)",
        boxShadow: scrolled || !isHero || menuOpen ? "0 1px 0 #E5DFD9" : "none",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ backdropFilter: scrolled ? "blur(12px)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 h-16 flex items-center justify-between gap-4">
        <motion.button
          onClick={() => navigate("/")}
          className="text-2xl tracking-widest cursor-pointer"
          style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}
          whileHover={{ opacity: 0.7 }}
        >
          Aura
        </motion.button>
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} label={item.label} to={item.to} active={location.pathname === item.to} hero={onHero} />
          ))}
        </nav>
        <div className="flex items-center gap-4 md:gap-5">
          <motion.button
            onClick={() => setMenuOpen((v) => !v)}
            whileHover={{ opacity: 0.6 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden cursor-pointer"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            style={{ textShadow: onHero && !menuOpen ? "0 1px 6px rgba(0,0,0,0.45)" : "none" }}
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} style={{ color: iconColor }} /> : <Menu size={20} strokeWidth={1.5} style={{ color: iconColor }} />}
          </motion.button>
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
              <Heart size={18} strokeWidth={1.5} style={{ color: iconColor, translateY: 2 }} />
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

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="absolute top-16 left-0 right-0 md:hidden"
            style={{ background: "#F7F4F0", borderBottom: "1px solid #E5DFD9", boxShadow: "0 12px 24px rgba(44,42,40,0.08)" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            aria-label="Menú móvil"
          >
            <div className="px-5 py-4 flex flex-col">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.to}
                  onClick={() => go(item.to)}
                  className="text-left py-4 text-base cursor-pointer"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    color: location.pathname === item.to ? "#4A5D4E" : "#2C2A28",
                    borderBottom: "1px solid #E5DFD9",
                    fontWeight: location.pathname === item.to ? 600 : 400,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
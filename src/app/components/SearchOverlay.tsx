import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight } from "lucide-react";
import { ALL_PRODUCTS } from "../data/products";
import { useStore } from "../store";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_PRODUCTS.filter((p) =>
      (p.name + " " + p.material + " " + p.category + " " + p.gender).toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const go = (slug: string) => {
    setSearchOpen(false);
    navigate(`/producto/${slug}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(247,244,240,0.98)", backdropFilter: "blur(8px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-3xl mx-auto w-full px-10 pt-24 pb-6">
            <div className="flex items-center gap-4 pb-4" style={{ borderBottom: "1px solid #E5DFD9" }}>
              <Search size={20} strokeWidth={1.5} style={{ color: "#7A736E" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca prendas, materiales o categorías…"
                className="flex-1 bg-transparent outline-none text-lg"
                style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}
              />
              <motion.button
                onClick={() => setSearchOpen(false)}
                whileHover={{ rotate: 90, opacity: 0.6 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
                aria-label="Cerrar búsqueda"
              >
                <X size={20} strokeWidth={1.5} style={{ color: "#2C2A28" }} />
              </motion.button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto w-full px-10 pb-24">
              {query.trim() === "" ? (
                <p className="text-sm py-10" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>
                  Escribe para buscar entre nuestros {ALL_PRODUCTS.length} productos.
                </p>
              ) : results.length === 0 ? (
                <p className="text-sm py-10" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>
                  No se encontraron resultados para «{query}».
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10">
                  {results.map((p, i) => (
                    <motion.div
                      key={p.id}
                      className="cursor-pointer"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
                      onClick={() => go(p.slug)}
                    >
                      <div className="rounded-sm overflow-hidden mb-2" style={{ aspectRatio: "3/4", background: `linear-gradient(145deg, ${p.color} 0%, ${p.accent} 100%)` }}>
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.97) saturate(0.92)" }} />
                      </div>
                      <p className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{p.name}</p>
                      <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{p.price}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {results.length > 0 && (
            <div className="border-t px-10 py-4 text-center" style={{ borderColor: "#E5DFD9", background: "#F7F4F0" }}>
              <span className="text-xs inline-flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>
                {results.length} resultado{results.length !== 1 && "s"} <ArrowRight size={12} strokeWidth={1.5} />
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
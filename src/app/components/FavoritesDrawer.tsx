import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag } from "lucide-react";
import { useStore } from "../store";
import HeartButton from "./HeartButton";

export default function FavoritesDrawer() {
  const { favoritesOpen, setFavoritesOpen, favoriteProducts, addToCart } = useStore();
  const navigate = useNavigate();

  const close = () => setFavoritesOpen(false);

  return (
    <>
      <AnimatePresence>
        {favoritesOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(44,42,40,0.6)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {favoritesOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full z-50 flex flex-col"
            style={{ width: "420px", maxWidth: "100vw", background: "#F7F4F0", boxShadow: "-4px 0 40px rgba(44,42,40,0.12)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: "1px solid #E5DFD9" }}>
              <h2 className="text-lg" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>Tus favoritos</h2>
              <motion.button onClick={close} whileHover={{ rotate: 90, opacity: 0.6 }} transition={{ duration: 0.2 }} className="cursor-pointer" aria-label="Cerrar favoritos">
                <X size={20} strokeWidth={1.5} style={{ color: "#2C2A28" }} />
              </motion.button>
            </div>

            {favoriteProducts.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <p className="text-base mb-2" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>Aún no tienes favoritos</p>
                <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Toca el corazón en cualquier prenda para guardarla aquí.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                <AnimatePresence>
                  {favoriteProducts.map((p) => (
                    <motion.div
                      key={p.id}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="w-20 h-24 rounded-sm flex-shrink-0 overflow-hidden cursor-pointer"
                        style={{ background: `linear-gradient(145deg, ${p.color} 0%, ${p.accent} 100%)` }}
                        onClick={() => { navigate(`/producto/${p.slug}`); close(); }}
                      >
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm cursor-pointer" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }} onClick={() => { navigate(`/producto/${p.slug}`); close(); }}>
                          {p.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{p.material}</p>
                        <p className="text-sm mt-1" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{p.price}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            className="flex-1 py-2 text-xs font-medium text-white rounded-sm cursor-pointer"
                            style={{ background: "#4A5D4E", fontFamily: "Inter, sans-serif" }}
                            onClick={() => addToCart(p)}
                          >
                            <span className="inline-flex items-center gap-1.5"><ShoppingBag size={12} strokeWidth={1.5} />Añadir a la bolsa</span>
                          </button>
                          <HeartButton productId={p.id} small />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
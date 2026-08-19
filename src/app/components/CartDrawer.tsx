import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Lock, Check } from "lucide-react";
import { useStore } from "../store";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, clearCart, cartSubtotal } = useStore();
  const [ordered, setOrdered] = useState(false);
  const shipping = cartSubtotal >= 50 || cartSubtotal === 0 ? 0 : 4.95;
  const total = cartSubtotal + shipping;

  const close = () => { setCartOpen(false); setTimeout(() => setOrdered(false), 400); };

  const checkout = () => {
    setOrdered(true);
    clearCart();
    setTimeout(close, 1800);
  };

  return (
    <>
      <AnimatePresence>
        {cartOpen && (
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
        {cartOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full z-50 flex flex-col"
            style={{ width: "420px", maxWidth: "100vw", background: "#F7F4F0", boxShadow: "-4px 0 40px rgba(44,42,40,0.12)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: "1px solid #E5DFD9" }}>
              <h2 className="text-lg" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>Tu bolsa</h2>
              <motion.button onClick={close} whileHover={{ rotate: 90, opacity: 0.6 }} transition={{ duration: 0.2 }} className="cursor-pointer" aria-label="Cerrar bolsa">
                <X size={20} strokeWidth={1.5} style={{ color: "#2C2A28" }} />
              </motion.button>
            </div>

            {cart.length === 0 && !ordered && (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <p className="text-base mb-2" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>Tu bolsa está vacía</p>
                <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Añade prendas desde la colección para comenzar.</p>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.key}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-20 h-24 rounded-sm flex-shrink-0 overflow-hidden" style={{ background: "linear-gradient(145deg, #D4C5B0 0%, #B8A898 100%)" }}>
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{item.name}</p>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="cursor-pointer"
                          aria-label={`Quitar ${item.name}`}
                          style={{ color: "#7A736E", background: "none", border: "none", padding: 2 }}
                        >
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{item.material} · Talla {item.size}</p>
                      <p className="text-sm mt-1" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{item.price.toFixed(2).replace(".", ",")} €</p>
                      <div className="flex items-center gap-3 mt-3">
                        <motion.button
                          className="w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer"
                          style={{ borderColor: "#E5DFD9" }}
                          whileHover={{ borderColor: "#4A5D4E" }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQty(item.key, -1)}
                          aria-label="Restar cantidad"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </motion.button>
                        <span className="text-sm w-4 text-center" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{item.qty}</span>
                        <motion.button
                          className="w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer"
                          style={{ borderColor: "#E5DFD9" }}
                          whileHover={{ borderColor: "#4A5D4E" }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQty(item.key, 1)}
                          aria-label="Añadir cantidad"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="px-8 py-6" style={{ borderTop: "1px solid #E5DFD9" }}>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Subtotal</span>
                  <span className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{cartSubtotal.toFixed(2).replace(".", ",")} €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Envío</span>
                  <span className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: shipping === 0 ? "#4A5D4E" : "#2C2A28" }}>
                    {shipping === 0 ? (cart.length === 0 ? "—" : "Gratis") : `${shipping.toFixed(2).replace(".", ",")} €`}
                  </span>
                </div>
                <div className="flex justify-between pt-3" style={{ borderTop: "1px solid #E5DFD9" }}>
                  <span className="font-semibold text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>Total</span>
                  <span className="font-bold text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{total.toFixed(2).replace(".", ",")} €</span>
                </div>
              </div>
              <motion.button
                className="w-full py-4 rounded-sm text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
                style={{ background: ordered ? "#3A4D3E" : "#4A5D4E", fontFamily: "Inter, sans-serif" }}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
                onClick={checkout}
                disabled={cart.length === 0 && !ordered}
              >
                {ordered ? (
                  <AnimatePresence mode="wait">
                    <motion.span key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="inline-flex items-center gap-2">
                      <Check size={14} strokeWidth={2} />¡Pedido realizado!
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="inline-flex items-center gap-2">
                      <Lock size={14} strokeWidth={1.5} />Finalizar pedido
                    </motion.span>
                  </AnimatePresence>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
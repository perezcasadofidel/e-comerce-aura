import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { useStore } from "../store";

export default function HeartButton({ productId, small = false }: { productId: number; small?: boolean }) {
  const { favorites, toggleFavorite } = useStore();
  const [ripple, setRipple] = useState(false);
  const liked = favorites.includes(productId);
  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) { setRipple(true); setTimeout(() => setRipple(false), 500); }
    toggleFavorite(productId);
  };
  const sz = small ? 13 : 18;
  const cls = small ? "w-8 h-8" : "w-10 h-10";
  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence>
        {ripple && (
          <motion.span
            className="absolute rounded-full pointer-events-none"
            style={{ borderWidth: 1.5, borderStyle: "solid", borderColor: "#C67C4E" }}
            initial={{ width: small ? 24 : 32, height: small ? 24 : 32, opacity: 0.7 }}
            animate={{ width: small ? 52 : 64, height: small ? 52 : 64, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggle}
        aria-label={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
        className={`${cls} rounded-full border flex items-center justify-center relative z-10 cursor-pointer`}
        style={{ borderColor: liked ? "#C67C4E" : "#E5DFD9", background: liked ? "#C67C4E" : "rgba(0,0,0,0)" }}
        whileTap={{ scale: [1, 1.5, 1] as any }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <Heart size={sz} strokeWidth={1.5} style={{ color: liked ? "white" : "#C67C4E" }} fill={liked ? "white" : "none"} />
      </motion.button>
    </div>
  );
}
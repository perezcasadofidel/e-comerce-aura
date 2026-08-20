import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import type { Product } from "../data/products";
import { useStore } from "../store";
import HeartButton from "./HeartButton";

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useStore();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article
      className="bg-card rounded-sm overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 2px 12px rgba(44,42,40,0.07)" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3 }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <Link to={`/producto/${product.slug}`} className="block absolute inset-0" aria-label={product.name}>
          <motion.div
            className="w-full h-full"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={product.img}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.97) saturate(0.92)" }}
            />
          </motion.div>
        </Link>
        <span
          className="absolute top-3 left-3 text-white text-xs font-medium px-2.5 py-1 rounded-sm"
          style={{ background: "#C67C4E", fontFamily: "Inter, sans-serif", fontSize: "11px" }}
        >
          {product.tag}
        </span>
        <motion.div
          className="absolute inset-x-0 bottom-0 flex justify-center pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button
            className="w-4/5 py-2.5 text-sm font-medium text-white rounded-sm cursor-pointer"
            style={{ background: added ? "#3A4D3E" : "#4A5D4E", fontFamily: "Inter, sans-serif" }}
            onClick={handleAdd}
          >
            {added ? "Añadido ✓" : "Añadir al carrito"}
          </button>
        </motion.div>
      </div>
      <div className="p-4 flex items-start justify-between gap-2">
        <div>
          <Link to={`/producto/${product.slug}`} className="block">
            <p className="font-medium text-sm" style={{ color: "#2C2A28", fontFamily: "Inter, sans-serif" }}>{product.name}</p>
          </Link>
          <p className="text-xs mt-0.5" style={{ color: "#7A736E", fontFamily: "Inter, sans-serif" }}>{product.material}</p>
          <p className="mt-2 text-sm" style={{ color: "#2C2A28", fontFamily: "Inter, sans-serif" }}>{product.price}</p>
        </div>
        <HeartButton productId={product.id} small />
      </div>
    </motion.article>
  );
}
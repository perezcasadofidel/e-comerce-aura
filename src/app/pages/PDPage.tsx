import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Star, ZoomIn } from "lucide-react";
import { getProductBySlug, WOMEN_PRODUCTS, MEN_PRODUCTS } from "../data/products";
import { Breadcrumbs, SizeButton } from "../components/common";
import HeartButton from "../components/HeartButton";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { useStore } from "../store";

export default function PDPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const product = getProductBySlug(slug ?? "") ?? WOMEN_PRODUCTS[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "S");
  const [added, setAdded] = useState(false);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.img,
    description: `Tejido con ${product.material.toLowerCase()} y tintes naturales. ${product.recycled}% de material reciclado u orgánico, huella de carbono ${product.carbon.toLowerCase()}.`,
    brand: { "@type": "Brand", name: "Aura" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.priceNum,
      availability: "https://schema.org/InStock",
      url: "https://aura-sustainable.com" + window.location.pathname,
    },
  };

  const collection = product.gender === "mujer" ? WOMEN_PRODUCTS : MEN_PRODUCTS;
  const galleryImgs = [
    product.img,
    ...collection.filter((p) => p.id !== product.id).slice(0, 2).map((p) => p.img),
  ];

  const [activeImg, setActiveImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const switchImg = (idx: number) => {
    if (idx === activeImg) return;
    setPrevImg(activeImg); setActiveImg(idx);
    setTimeout(() => setPrevImg(null), 450);
  };

  const handleAdd = () => {
    if (added) return;
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col" style={{ background: "#F7F4F0" }}>
      <SEO
        title={`${product.name} — ${product.price} | Aura`}
        description={`${product.name}: ${product.material.toLowerCase()} con tintes naturales, ${product.recycled}% reciclado u orgánico. Huella de carbono ${product.carbon.toLowerCase()}. Compra sostenible en Aura.`}
        image={product.img}
        jsonLd={productJsonLd}
      />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 py-12 flex-1 w-full">
        <Breadcrumbs items={[
          { label: "Inicio", to: "/" },
          { label: product.gender === "mujer" ? "Mujer" : "Hombre", to: product.gender === "mujer" ? "/mujer" : "/hombre" },
          { label: product.category },
          { label: product.name },
        ]} />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="lg:basis-[60%] lg:shrink-0">
            <div className="flex gap-3">
              <div className="flex flex-col gap-3">
                {galleryImgs.map((src, i) => (
                  <motion.button
                    key={i}
                    onClick={() => switchImg(i)}
                    className="w-16 h-20 rounded-sm overflow-hidden flex-shrink-0 cursor-pointer"
                    style={{ outline: activeImg === i ? `2px solid #4A5D4E` : "2px solid transparent", outlineOffset: "2px" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </motion.button>
                ))}
              </div>
              <div className="relative flex-1 rounded-sm overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <AnimatePresence>
                  {prevImg !== null && (
                    <motion.img key={`prev-${prevImg}`} src={galleryImgs[prevImg]} alt="" className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeOut" }} />
                  )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.img key={`img-${activeImg}`} src={galleryImgs[activeImg]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ filter: "brightness(0.97) saturate(0.9)" }} />
                </AnimatePresence>
                <motion.button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer" style={{ boxShadow: "0 2px 12px rgba(44,42,40,0.15)" }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} aria-label="Ampliar imagen">
                  <ZoomIn size={16} strokeWidth={1.5} style={{ color: "#2C2A28" }} />
                </motion.button>
              </div>
            </div>
          </div>

          <motion.div className="flex-1 py-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}>
            <h1 className="text-3xl mb-1" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>{product.name}</h1>
            <p className="text-base mb-4" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{product.material}</p>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <Star key={s} size={14} strokeWidth={0} fill="#C67C4E" />)}</div>
              <span className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>45 opiniones</span>
            </div>
            <p className="text-4xl font-bold mb-8" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{product.price}</p>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>Talla: {selectedSize}</p>
                <button className="text-xs underline cursor-pointer" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Guía de tallas</button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((s) => <SizeButton key={s} size={s} selected={selectedSize === s} onClick={() => setSelectedSize(s)} />)}
              </div>
            </div>
            <div className="rounded-sm p-5 mb-8" style={{ background: "rgba(74,93,78,0.07)", borderLeft: "3px solid #4A5D4E" }}>
              <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#4A5D4E" }}>Compromiso sostenible</p>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>
                Tejido con {product.material.toLowerCase()} y tintes naturales. {product.recycled}% de material reciclado u orgánico, huella de carbono {product.carbon.toLowerCase()}.
              </p>
              <div className="flex gap-3 mt-3">
                {["GOTS","Fair Trade","Carbon −"].map((b) => <span key={b} className="text-xs px-2.5 py-1 rounded-sm" style={{ fontFamily: "Inter, sans-serif", background: "rgba(74,93,78,0.12)", color: "#4A5D4E" }}>{b}</span>)}
              </div>
            </div>
            <div className="flex gap-3 mb-10">
              <motion.button className="flex-1 py-4 text-white text-sm font-medium rounded-sm cursor-pointer" style={{ background: added ? "#3A4D3E" : "#4A5D4E", fontFamily: "Inter, sans-serif" }} whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.98 }} onClick={handleAdd}>
                <AnimatePresence mode="wait">
                  <motion.span key={added ? "added" : "idle"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} style={{ display: "inline-block" }}>
                    {added ? "¡Añadido!" : "Añadir al carrito"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
              <HeartButton productId={product.id} />
            </div>
            <div>
              <p className="text-sm font-medium mb-5" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>Te puede interesar</p>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {collection.filter((p) => p.id !== product.id).slice(0, 3).map((p, i) => (
                  <motion.div key={p.id} className="flex-shrink-0 cursor-pointer" style={{ width: "130px" }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 + i * 0.1 }} whileHover={{ y: -4 }} onClick={() => navigate(`/producto/${p.slug}`)}>
                    <div className="rounded-sm mb-2 overflow-hidden" style={{ height: "160px", background: `linear-gradient(145deg, ${p.color} 0%, ${p.accent} 100%)` }}>
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs font-medium" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{p.name}</p>
                    <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{p.price}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
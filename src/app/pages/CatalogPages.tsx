import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import type { Product } from "../data/products";
import { NEW_PRODUCTS, WOMEN_PRODUCTS, MEN_PRODUCTS } from "../data/products";
import { fadeUp, useSectionInView, SizeButton, Breadcrumbs } from "../components/common";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function ProductListingPage({ title, subtitle, products, breadcrumbs }: {
  title: string; subtitle: string; products: Product[]; breadcrumbs: { label: string; to?: string }[];
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [carbon, setCarbon] = useState("Todos");
  const [recycled, setRecycled] = useState(0);

  const toggleCat = (c: string) => setCategories((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  const toggleSize = (s: string) => setSizes((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  const reset = () => { setCategories([]); setSizes([]); setCarbon("Todos"); setRecycled(0); };

  const hasFilters = categories.length > 0 || sizes.length > 0 || carbon !== "Todos" || recycled > 0;

  const filtered = products.filter((p) => {
    if (categories.length && !categories.includes(p.category)) return false;
    if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
    if (carbon !== "Todos" && p.carbon !== carbon) return false;
    if (p.recycled < recycled) return false;
    return true;
  });

  const availCats = [...new Set(products.map((p) => p.category))];
  const { ref: headerRef, inView: headerInView } = useSectionInView();

  return (
    <div className="pt-16 min-h-screen flex flex-col" style={{ background: "#F7F4F0" }}>
      {/* Page header */}
      <div
        ref={headerRef}
        className="py-16 px-10"
        style={{ borderBottom: "1px solid #E5DFD9", background: "linear-gradient(160deg, #F7F4F0 0%, #EDE5DC 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />
          <motion.h1
            className="text-5xl mb-3"
            style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}
            variants={fadeUp} custom={0} initial="hidden" animate={headerInView ? "visible" : "hidden"}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-base"
            style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}
            variants={fadeUp} custom={0.1} initial="hidden" animate={headerInView ? "visible" : "hidden"}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-10 flex-1 w-full">
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="w-56 flex-shrink-0 space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} strokeWidth={1.5} style={{ color: "#2C2A28" }} />
                <span className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>Filtros</span>
              </div>
              {hasFilters && (
                <motion.button
                  onClick={reset}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-1 text-xs cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif", color: "#C67C4E", background: "none", border: "none" }}
                >
                  <RotateCcw size={11} strokeWidth={1.5} /> Limpiar
                </motion.button>
              )}
            </div>

            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Categorías</p>
              <div className="space-y-3">
                {availCats.map((c) => (
                  <label key={c} className="flex items-center gap-3 cursor-pointer">
                    <motion.span
                      className="w-4 h-4 rounded-sm border flex items-center justify-center"
                      animate={{ borderColor: categories.includes(c) ? "#4A5D4E" : "#E5DFD9", background: categories.includes(c) ? "#4A5D4E" : "rgba(0,0,0,0)" }}
                      transition={{ duration: 0.2 }}
                      onClick={() => toggleCat(c)}
                    >
                      {categories.includes(c) && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </motion.span>
                    <span className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{c}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Tallas</p>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <SizeButton key={s} size={s} selected={sizes.includes(s)} onClick={() => toggleSize(s)} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Huella de carbono</p>
              <div className="space-y-1">
                {["Todos", "Bajo", "Medio", "Alto"].map((opt) => (
                  <motion.button key={opt} onClick={() => setCarbon(opt)} className="w-full text-left px-3 py-2 rounded-sm text-sm cursor-pointer" animate={{ background: carbon === opt ? "#4A5D4E" : "rgba(0,0,0,0)", color: carbon === opt ? "#ffffff" : "#2C2A28" }} transition={{ duration: 0.2 }} style={{ fontFamily: "Inter, sans-serif" }} whileHover={{ x: 2 }}>
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Material reciclado mín.</p>
              <div className="space-y-1">
                {[0, 50, 70, 100].map((pct) => (
                  <motion.button key={pct} onClick={() => setRecycled(pct)} className="w-full text-left px-3 py-2 rounded-sm text-sm cursor-pointer" animate={{ background: recycled === pct ? "#C67C4E" : "rgba(0,0,0,0)", color: recycled === pct ? "#ffffff" : "#2C2A28" }} transition={{ duration: 0.2 }} style={{ fontFamily: "Inter, sans-serif" }} whileHover={{ x: 2 }}>
                    {pct === 0 ? "Todos" : `≥ ${pct}%`}
                  </motion.button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{filtered.length} productos</p>
            </div>
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(i * 0.04, 0.3) }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            {filtered.length === 0 && (
              <motion.p className="text-center py-20 text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                No se encontraron productos con estos filtros.
              </motion.p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export function NuevaPage() {
  return (
    <ProductListingPage
      title="Nueva Colección"
      subtitle="Las últimas incorporaciones — materiales vivos, formas atemporales."
      products={NEW_PRODUCTS}
      breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Nueva" }]}
    />
  );
}

export function MujerPage() {
  return (
    <ProductListingPage
      title="Mujer"
      subtitle="Prendas que respetan tu cuerpo y el planeta. Lino, bambú y algodón orgánico."
      products={WOMEN_PRODUCTS}
      breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Mujer" }]}
    />
  );
}

export function HombrePage() {
  return (
    <ProductListingPage
      title="Hombre"
      subtitle="Cortes limpios, materiales honestos. Slow fashion sin concesiones."
      products={MEN_PRODUCTS}
      breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Hombre" }]}
    />
  );
}
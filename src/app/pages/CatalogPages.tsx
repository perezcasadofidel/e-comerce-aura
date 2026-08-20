import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SlidersHorizontal, RotateCcw, X } from "lucide-react";
import type { Product } from "../data/products";
import { NEW_PRODUCTS, WOMEN_PRODUCTS, MEN_PRODUCTS } from "../data/products";
import { fadeUp, useSectionInView, SizeButton, Breadcrumbs } from "../components/common";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

function ProductListingPage({ title, subtitle, products, breadcrumbs }: {
  title: string; subtitle: string; products: Product[]; breadcrumbs: { label: string; to?: string }[];
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [carbon, setCarbon] = useState("Todos");
  const [recycled, setRecycled] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCat = (c: string) => setCategories((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  const toggleSize = (s: string) => setSizes((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  const reset = () => { setCategories([]); setSizes([]); setCarbon("Todos"); setRecycled(0); };

  const hasFilters = categories.length > 0 || sizes.length > 0 || carbon !== "Todos" || recycled > 0;
  const activeFilterCount =
    categories.length + sizes.length + (carbon !== "Todos" ? 1 : 0) + (recycled > 0 ? 1 : 0);

  const filtered = products.filter((p) => {
    if (categories.length && !categories.includes(p.category)) return false;
    if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
    if (carbon !== "Todos" && p.carbon !== carbon) return false;
    if (p.recycled < recycled) return false;
    return true;
  });

  const availCats = [...new Set(products.map((p) => p.category))];
  const { ref: headerRef, inView: headerInView } = useSectionInView();

  const sidebarContent = (
    <aside className="space-y-10">
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
  );

  return (
    <div className="pt-16 min-h-screen flex flex-col" style={{ background: "#F7F4F0" }}>
      <SEO title={`${title} — Aura | Moda sostenible`} description={subtitle} />
      {/* Page header */}
      <div
        ref={headerRef}
        className="py-16 px-5 sm:px-8 md:px-10"
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

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 py-10 flex-1 w-full">
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar (desktop only) */}
          <div className="hidden md:block w-56 flex-shrink-0">{sidebarContent}</div>

          {/* Grid */}
          <div className="flex-1">
            {/* Mobile filter bar */}
            <div className="md:hidden flex items-center justify-between mb-6">
              <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{filtered.length} productos</p>
              <motion.button
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium cursor-pointer"
                style={{ background: "#4A5D4E", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
                whileTap={{ scale: 0.97 }}
              >
                <SlidersHorizontal size={14} strokeWidth={1.5} /> Filtros
                {activeFilterCount > 0 && (
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "#C67C4E", fontSize: "10px", fontFamily: "Inter, sans-serif" }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </motion.button>
            </div>

            <div className="hidden md:flex items-center justify-between mb-8">
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

      {/* Mobile filters bottom sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 md:hidden"
              style={{ background: "rgba(44,42,40,0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setFiltersOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 md:hidden flex flex-col"
              style={{ maxHeight: "80vh", background: "#F7F4F0", borderTopLeftRadius: 12, borderTopRightRadius: 12, boxShadow: "0 -8px 40px rgba(44,42,40,0.15)" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              role="dialog"
              aria-label="Filtros"
            >
              <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderBottom: "1px solid #E5DFD9" }}>
                <span className="text-base font-medium" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>Filtros</span>
                <motion.button
                  onClick={() => setFiltersOpen(false)}
                  whileHover={{ rotate: 90, opacity: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                  aria-label="Cerrar filtros"
                >
                  <X size={18} strokeWidth={1.5} style={{ color: "#2C2A28" }} />
                </motion.button>
              </div>
              <div className="overflow-y-auto px-5 py-6 flex-1">{sidebarContent}</div>
              <div className="p-4 flex-shrink-0" style={{ borderTop: "1px solid #E5DFD9" }}>
                <motion.button
                  className="w-full py-3.5 rounded-sm text-white text-sm font-medium cursor-pointer"
                  style={{ background: "#4A5D4E", fontFamily: "Inter, sans-serif" }}
                  whileHover={{ opacity: 0.9 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFiltersOpen(false)}
                >
                  Ver {filtered.length} productos
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

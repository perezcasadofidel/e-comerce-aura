import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ALL_PRODUCTS } from "../data/products";
import { fadeUp, useSectionInView, ImpactCounter } from "../components/common";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function Homepage() {
  const navigate = useNavigate();
  const [parallaxY, setParallaxY] = useState(0);
  useEffect(() => {
    const el = document.querySelector(".scroll-container");
    if (!el) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const h = () => {
      if (!mq.matches) {
        setParallaxY(0);
        return;
      }
      setParallaxY((el as HTMLElement).scrollTop * 0.3);
    };
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
  }, []);

  const { ref: sellersRef, inView: sellersInView } = useSectionInView();
  const { ref: editRef, inView: editInView } = useSectionInView();

  const heroVars = {
    hidden: { opacity: 0, y: 30 },
    visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: d } }),
  };

  return (
    <div>
      <SEO
        title="Aura | Moda sostenible y ética — Slow fashion"
        image={`https://images.unsplash.com/flagged/photo-1570733117311-d990c3816c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1400`}
      />
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden" style={{ background: "#F7F4F0" }}>
        {/* Left — text */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 md:px-16 xl:px-24 pt-28 md:pt-0 pb-8 md:pb-0 md:flex-[0_0_52%]" style={{}}>
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")` }} />
          <div className="relative">
            <motion.p className="text-xs tracking-[0.28em] uppercase mb-8" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }} custom={0} variants={heroVars} initial="hidden" animate="visible">
              Colección Primavera — 2026
            </motion.p>
            <motion.h1 className="text-4xl sm:text-5xl xl:text-6xl italic mb-8 leading-[1.1]" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }} custom={0.1} variants={heroVars} initial="hidden" animate="visible">
              Viste con<br />propósito.<br />Elige lo que<br />perdura.
            </motion.h1>
            <motion.p className="text-sm leading-relaxed mb-12 max-w-sm" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }} custom={0.2} variants={heroVars} initial="hidden" animate="visible">
              Moda consciente fabricada con materiales reciclados y orgánicos. Porque cada pieza cuenta una historia.
            </motion.p>
            <motion.div custom={0.3} variants={heroVars} initial="hidden" animate="visible">
              <motion.button
                className="inline-flex items-center gap-3 px-10 py-4 text-white text-sm font-medium tracking-wide rounded-sm cursor-pointer"
                style={{ background: "#4A5D4E", fontFamily: "Inter, sans-serif" }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                whileHover={{ opacity: 0.9, scale: 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/nueva")}
              >
                Descubrir colección <ArrowRight size={16} strokeWidth={1.5} />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Right — editorial image */}
        <div className="relative h-[45vh] md:h-auto md:flex-1 overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/flagged/photo-1570733117311-d990c3816c47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1400"
            alt="Aura — moda sostenible"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ y: parallaxY, filter: "brightness(0.96) saturate(0.88)" }}
          />
          {/* Soft left fade so it blends with the text panel */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ background: "linear-gradient(to right, #F7F4F0 0%, rgba(247,244,240,0.15) 18%, transparent 40%)" }} />
          {/* Soft top fade on mobile so it blends with the text panel */}
          <div className="absolute inset-0 pointer-events-none md:hidden" style={{ background: "linear-gradient(to bottom, #F7F4F0 0%, rgba(247,244,240,0.15) 18%, transparent 40%)" }} />
        </div>
      </section>

      {/* Best Sellers */}
      <section ref={sellersRef} className="py-24 px-5 sm:px-8 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#C67C4E" }}>Más amados</p>
              <motion.h2 className="text-3xl" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }} variants={fadeUp} custom={0} initial="hidden" animate={sellersInView ? "visible" : "hidden"}>Los más amados</motion.h2>
            </div>
            <motion.button className="text-sm flex items-center gap-1.5 cursor-pointer" style={{ fontFamily: "Inter, sans-serif", color: "#4A5D4E" }} whileHover={{ x: 4 }} onClick={() => navigate("/nueva")}>
              Ver todo <ChevronRight size={14} strokeWidth={1.5} />
            </motion.button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ALL_PRODUCTS.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} variants={fadeUp} custom={i * 0.1} initial="hidden" animate={sellersInView ? "visible" : "hidden"}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gender nav bands */}
      <section className="py-0 px-5 sm:px-8 md:px-10 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Mujer", sub: "Lino, bambú y algodón orgánico", to: "/mujer", img: `https://images.unsplash.com/photo-1599384779814-79bbaef08d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900` },
            { label: "Hombre", sub: "Cortes limpios, materiales honestos", to: "/hombre", img: `https://images.unsplash.com/photo-1627686011747-74adda3d2343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900` },
          ].map((band, i) => (
            <motion.button
              key={band.label}
              className="relative overflow-hidden rounded-sm text-left cursor-pointer"
              style={{ minHeight: "360px" }}
              onClick={() => navigate(band.to)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
            >
              {/* Photo */}
              <img src={band.img} alt={band.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.75) saturate(0.85)" }} />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,42,40,0.72) 0%, rgba(44,42,40,0.1) 60%, transparent 100%)" }} />
              {/* Text */}
              <div className="relative z-10 flex flex-col justify-end h-full p-10" style={{ minHeight: "360px" }}>
                <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.65)" }}>{band.sub}</p>
                <h2 className="text-4xl mb-5" style={{ fontFamily: "Playfair Display, serif", color: "#FFFFFF" }}>{band.label}</h2>
                <span className="inline-flex items-center gap-2 text-sm font-medium" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.85)" }}>
                  Ver colección <ArrowRight size={14} strokeWidth={1.5} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 px-5 sm:px-8 md:px-10" style={{ background: "linear-gradient(135deg, #4A5D4E 0%, #3A4D3E 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-center mb-16" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)" }}>Nuestro impacto</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <ImpactCounter num={1500} prefix="+" suffix=" kg" label="de plástico reciclado" sub="en nuestras colecciones" />
            <ImpactCounter num={98} suffix="%" label="de agua ahorrada" sub="frente al algodón convencional" />
            <ImpactCounter num={100} suffix="%" label="comercio justo" sub="certificado y verificado" />
          </div>
          <motion.div className="mt-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <button
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-sm border cursor-pointer"
              style={{ borderColor: "rgba(255,255,255,0.35)", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
              onClick={() => navigate("/sostenibilidad")}
            >
              Conoce nuestro compromiso <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Editorial — Nuestra filosofía */}
      <section ref={editRef} className="py-24 px-5 sm:px-8 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-sm overflow-hidden px-6 py-16 md:p-16 flex flex-col items-center text-center"
            style={{ background: "linear-gradient(135deg, #E8E0D8 0%, #F0EBE5 100%)" }}
          >
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ fontFamily: "Inter, sans-serif", color: "#C67C4E" }}>Nuestra filosofía</p>
              <h2 className="text-3xl italic mb-6 leading-snug" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>Slow fashion no es una tendencia. Es una decisión.</h2>
              <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Cada prenda de Aura nace de la honestidad: materiales trazables, artesanos bien pagados y un proceso que respeta la tierra.</p>
              <motion.button className="mt-6 inline-flex items-center gap-2 text-sm font-medium cursor-pointer" style={{ fontFamily: "Inter, sans-serif", color: "#4A5D4E" }} whileHover={{ x: 4 }} onClick={() => navigate("/sostenibilidad")}>
                Leer más sobre sostenibilidad <ChevronRight size={14} strokeWidth={1.5} />
              </motion.button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {[{ label: "Materiales", value: "100% orgánicos o reciclados" }, { label: "Artesanos", value: "Certificación GOTS" }, { label: "Huella", value: "Carbono negativo 2025" }].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="bg-white rounded-sm p-6 w-36 text-center"
                  style={{ boxShadow: "0 2px 12px rgba(44,42,40,0.06)" }}
                  variants={fadeUp}
                  custom={0.2 + i * 0.1}
                  initial="hidden"
                  animate={editInView ? "visible" : "hidden"}
                  whileHover={{ y: -4 }}
                >
                  <p className="text-xs mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{item.label}</p>
                  <p className="text-sm font-medium leading-snug" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
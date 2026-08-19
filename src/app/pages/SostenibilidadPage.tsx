import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Leaf, Droplets, Recycle, Award, Sun, Wind, ArrowRight } from "lucide-react";
import { fadeUp, useSectionInView, ImpactCounter, Breadcrumbs } from "../components/common";
import Footer from "../components/Footer";

export default function SostenibilidadPage() {
  const navigate = useNavigate();
  const { ref: heroRef, inView: heroInView } = useSectionInView();
  const { ref: pillarsRef, inView: pillarsInView } = useSectionInView();
  const { ref: processRef, inView: processInView } = useSectionInView();
  const { ref: certRef, inView: certInView } = useSectionInView();
  const { ref: ctaRef, inView: ctaInView } = useSectionInView();

  const pillars = [
    { icon: Leaf, title: "Materiales vivos", text: "Usamos exclusivamente lino orgánico, algodón GOTS, bambú, hemp y lana reciclada. Cada fibra es trazable desde el campo hasta tu armario.", color: "#4A5D4E" },
    { icon: Droplets, title: "Agua como valor", text: "Nuestros procesos de tinte natural ahorran hasta un 98% de agua frente a la moda convencional. El agua no es un recurso, es un derecho.", color: "#5A7A8E" },
    { icon: Recycle, title: "Circularidad total", text: "Programa de devolución Aura Renace: tus prendas viejas se convierten en nuevas fibras. Cero desperdicio textil en 2026.", color: "#7A6A52" },
    { icon: Award, title: "Comercio justo", text: "100% de nuestros talleres tienen certificación Fair Trade. Pagamos salarios justos y condiciones dignas en cada etapa de producción.", color: "#C67C4E" },
    { icon: Sun, title: "Energía limpia", text: "Nuestras instalaciones operan al 100% con energía renovable. Compensamos las emisiones de transporte con reforestación certificada.", color: "#8E7A4E" },
    { icon: Wind, title: "Envases sin plástico", text: "Todo el packaging es compostable o reciclable. Las bolsas son de papel kraft sin blanqueantes. Cada caja puede plantarse: lleva semillas.", color: "#6A8A6C" },
  ];

  const process = [
    { num: "01", title: "Origen certificado", text: "Seleccionamos materias primas con certificación GOTS, OEKO-TEX o equivalente. Visitamos personalmente cada proveedor." },
    { num: "02", title: "Tinte natural", text: "Pigmentos extraídos de plantas locales y minerales. Sin metales pesados. El agua residual es depurada antes de su retorno." },
    { num: "03", title: "Confección artesanal", text: "Talleres de tamaño humano en España y Portugal. Máximo 50 trabajadores por taller. Horas de trabajo reguladas y auditadas." },
    { num: "04", title: "Distribución responsable", text: "Agrupamos pedidos para minimizar viajes. Última milla en bicicleta en ciudades. Compensación de carbono para el resto." },
  ];

  const certs = [
    { name: "GOTS", full: "Global Organic Textile Standard", desc: "Estándar global para textiles orgánicos" },
    { name: "Fair Trade", full: "Comercio Justo", desc: "Condiciones laborales justas y dignas" },
    { name: "OEKO-TEX", full: "Standard 100", desc: "Sin sustancias perjudiciales para la salud" },
    { name: "B Corp", full: "Certified B Corporation", desc: "Empresa con propósito social y ambiental" },
  ];

  return (
    <div className="pt-16 flex flex-col min-h-screen" style={{ background: "#F7F4F0" }}>

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative py-32 px-10 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #3A4D3E 0%, #4A5D4E 50%, #5A6D5E 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")` }}
        />
        <div className="max-w-7xl mx-auto relative">
          <Breadcrumbs items={[{ label: "Inicio", to: "/" }, { label: "Sostenibilidad" }]} light />
          <motion.p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.5)" }} variants={fadeUp} custom={0} initial="hidden" animate={heroInView ? "visible" : "hidden"}>
            Nuestra filosofía
          </motion.p>
          <motion.h1 className="text-5xl md:text-7xl italic mb-8 leading-tight max-w-3xl" style={{ fontFamily: "Playfair Display, serif", color: "#FFFFFF" }} variants={fadeUp} custom={0.1} initial="hidden" animate={heroInView ? "visible" : "hidden"}>
            La moda puede ser<br />parte de la solución.
          </motion.h1>
          <motion.p className="text-base leading-relaxed max-w-xl" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.7)" }} variants={fadeUp} custom={0.2} initial="hidden" animate={heroInView ? "visible" : "hidden"}>
            En Aura creemos que cada decisión de compra es un voto por el tipo de mundo en el que queremos vivir. Por eso construimos cada prenda con honestidad radical: materiales trazables, personas bien tratadas, y un impacto medible en el planeta.
          </motion.p>
        </div>
      </section>

      {/* Impact counters */}
      <section className="py-20 px-10" style={{ background: "linear-gradient(135deg, #4A5D4E 0%, #3A4D3E 100%)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <ImpactCounter num={1500} prefix="+" suffix=" kg" label="de plástico reciclado" sub="en nuestras colecciones 2025–26" />
          <ImpactCounter num={98} suffix="%" label="de agua ahorrada" sub="frente al algodón convencional" />
          <ImpactCounter num={100} suffix="%" label="comercio justo" sub="certificado en cada taller" />
        </div>
      </section>

      {/* 6 pillars */}
      <section ref={pillarsRef} className="py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-16" variants={fadeUp} custom={0} initial="hidden" animate={pillarsInView ? "visible" : "hidden"}>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "Inter, sans-serif", color: "#C67C4E" }}>Nuestros pilares</p>
            <h2 className="text-4xl" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>Seis compromisos,<br />no negociables.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                className="bg-card rounded-sm p-8"
                style={{ boxShadow: "0 2px 16px rgba(44,42,40,0.07)" }}
                variants={fadeUp} custom={i * 0.08} initial="hidden" animate={pillarsInView ? "visible" : "hidden"}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5" style={{ background: `${p.color}18` }}>
                  <p.icon size={18} strokeWidth={1.5} style={{ color: p.color }} />
                </div>
                <h3 className="text-lg mb-3" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section ref={processRef} className="py-24 px-10" style={{ background: "linear-gradient(135deg, #E8E0D8 0%, #F0EBE5 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-16" variants={fadeUp} custom={0} initial="hidden" animate={processInView ? "visible" : "hidden"}>
            <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "Inter, sans-serif", color: "#C67C4E" }}>Cómo lo hacemos</p>
            <h2 className="text-4xl" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>De la fibra<br />a tu armario.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} custom={i * 0.1} initial="hidden" animate={processInView ? "visible" : "hidden"}>
                <div className="text-4xl mb-4" style={{ fontFamily: "Playfair Display, serif", color: "#4A5D4E", opacity: 0.4 }}>{step.num}</div>
                {/* Connector line */}
                <div className="w-10 h-px mb-5" style={{ background: "#4A5D4E" }} />
                <h3 className="text-base font-medium mb-3" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section ref={certRef} className="py-24 px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-14 flex items-end justify-between" variants={fadeUp} custom={0} initial="hidden" animate={certInView ? "visible" : "hidden"}>
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ fontFamily: "Inter, sans-serif", color: "#C67C4E" }}>Certificaciones</p>
              <h2 className="text-4xl" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>La transparencia<br />tiene nombre.</h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certs.map((c, i) => (
              <motion.div
                key={c.name}
                className="bg-card rounded-sm p-8 text-center"
                style={{ boxShadow: "0 2px 16px rgba(44,42,40,0.07)" }}
                variants={fadeUp} custom={i * 0.1} initial="hidden" animate={certInView ? "visible" : "hidden"}
                whileHover={{ y: -4, boxShadow: "0 8px 28px rgba(44,42,40,0.12)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #4A5D4E18 0%, #C67C4E18 100%)", border: "1.5px solid #E5DFD9" }}
                >
                  <span className="text-xs font-bold tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: "#4A5D4E" }}>{c.name.split(" ")[0]}</span>
                </div>
                <p className="font-medium text-sm mb-1" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{c.full}</p>
                <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-24 px-10" style={{ background: "linear-gradient(135deg, #4A5D4E 0%, #3A4D3E 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 className="text-4xl italic mb-6" style={{ fontFamily: "Playfair Display, serif", color: "#FFFFFF" }} variants={fadeUp} custom={0} initial="hidden" animate={ctaInView ? "visible" : "hidden"}>
            Cada prenda que eliges<br />es un acto de cuidado.
          </motion.h2>
          <motion.p className="text-sm leading-relaxed mb-10" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.65)" }} variants={fadeUp} custom={0.1} initial="hidden" animate={ctaInView ? "visible" : "hidden"}>
            Descubre nuestra colección y sé parte del cambio.
          </motion.p>
          <motion.div className="flex gap-4 justify-center flex-wrap" variants={fadeUp} custom={0.2} initial="hidden" animate={ctaInView ? "visible" : "hidden"}>
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wide rounded-sm cursor-pointer"
              style={{ background: "#FFFFFF", color: "#4A5D4E", fontFamily: "Inter, sans-serif" }}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/mujer")}
            >
              Comprar Mujer <ArrowRight size={15} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wide rounded-sm border cursor-pointer"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}
              whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.8)" }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/hombre")}
            >
              Comprar Hombre <ArrowRight size={15} strokeWidth={1.5} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
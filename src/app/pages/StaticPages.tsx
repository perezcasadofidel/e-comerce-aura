import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { Breadcrumbs } from "../components/common";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

function StaticPageShell({ kicker, title, intro, breadcrumbs, seoTitle, seoDescription, children }: {
  kicker: string; title: string; intro: string; breadcrumbs: { label: string; to?: string }[];
  seoTitle?: string; seoDescription?: string; children: ReactNode;
}) {
  return (
    <div className="pt-16 min-h-screen flex flex-col" style={{ background: "#F7F4F0" }}>
      <SEO title={seoTitle ?? `${title} — Aura`} description={seoDescription ?? intro} />
      <div
        className="py-16 px-5 sm:px-8 md:px-10"
        style={{ borderBottom: "1px solid #E5DFD9", background: "linear-gradient(160deg, #F7F4F0 0%, #EDE5DC 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ fontFamily: "Inter, sans-serif", color: "#C67C4E" }}>{kicker}</p>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>{title}</h1>
          <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{intro}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-10 py-14 flex-1 w-full">{children}</div>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl mb-3" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>{title}</h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{children}</div>
    </section>
  );
}

export function PrivacidadPage() {
  return (
    <StaticPageShell
      kicker="Tu información"
      title="Política de Privacidad"
      intro="Última actualización: agosto de 2026. En Aura tratamos tus datos con la misma honestidad con la que fabricamos cada prenda: transparencia total y cero letra pequeña."
      breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Privacidad" }]}
      seoTitle="Política de Privacidad — Aura | Moda sostenible"
      seoDescription="Cómo trata Aura tus datos personales: transparencia total, cero venta de datos y cumplimiento del RGPD. Última actualización: agosto de 2026."
    >
      <Section title="1. Qué datos recogemos">
        <p>Recogemos únicamente los datos necesarios para tu compra: nombre, correo electrónico, dirección de envío y datos de pago procesados de forma segura. Si creas una cuenta, guardamos también tu historial de pedidos y favoritos.</p>
        <p>Nunca compramos ni vendemos datos personales. La publicidad que ves de Aura se basa en tu actividad en nuestra tienda, nunca en terceros.</p>
      </Section>
      <Section title="2. Cómo usamos tus datos">
        <p>Usamos tus datos para gestionar pedidos, envíos, devoluciones y atención al cliente. Si lo aceptas, te enviamos nuestro boletín con novedades de la colección — puedes darte de baja con un clic en cualquier momento.</p>
      </Section>
      <Section title="3. Cookies">
        <p>Utilizamos cookies esenciales para que la tienda funcione (carrito, sesión) y cookies analíticas anónimas para mejorar la experiencia. Puedes gestionar tus preferencias de cookies desde la configuración de tu navegador.</p>
      </Section>
      <Section title="4. Tus derechos">
        <p>Puedes acceder, rectificar o eliminar tus datos en cualquier momento escribiéndonos a hola@aura-sustainable.com. También tienes derecho a la portabilidad y a retirar tu consentimiento sin que ello afecte a la legalidad de tratamientos anteriores.</p>
      </Section>
      <Section title="5. Seguridad">
        <p>Toda la información se transmite con cifrado SSL/TLS y se almacena en servidores con controles de acceso estrictos. Realizamos auditorías de seguridad periódicas y cumplimos el RGPD europeo.</p>
      </Section>
    </StaticPageShell>
  );
}

export function TerminosPage() {
  return (
    <StaticPageShell
      kicker="Reglas claras"
      title="Términos y Condiciones"
      intro="Las condiciones que rigen tu compra en Aura. Nada oculto, nada abusivo: solo lo necesario para que todo funcione con claridad."
      breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Términos" }]}
      seoTitle="Términos y Condiciones — Aura | Moda sostenible"
      seoDescription="Condiciones de compra en Aura: pedidos, precios, devoluciones de 30 días, propiedad intelectual y ley aplicable."
    >
      <Section title="1. Pedidos y precios">
        <p>Todos los precios están en euros e incluyen el IVA aplicable. El envío es gratuito a partir de 50 €. Los pedidos se confirman por correo electrónico y pueden cancelarse gratuitamente antes del envío.</p>
      </Section>
      <Section title="2. Devoluciones y cambios">
        <p>Dispones de 30 días desde la recepción para devolver cualquier prenda sin preguntas. Gracias al programa Aura Renace, cada devolución se reutiliza o recicla: cero residuos.</p>
      </Section>
      <Section title="3. Propiedad intelectual">
        <p>Los diseños, fotografías y textos de esta tienda son propiedad de Aura Sustainable Fashion. No pueden reproducirse sin autorización escrita.</p>
      </Section>
      <Section title="4. Responsabilidad">
        <p>Hacemos todo lo posible por mostrar colores y materiales fieles a la realidad, pero las variaciones de pantalla pueden alterar la percepción. Ante cualquier duda, contacta con nosotros antes de comprar.</p>
      </Section>
      <Section title="5. Ley aplicable">
        <p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados de Barcelona, salvo que la ley disponga lo contrario para consumidores.</p>
      </Section>
    </StaticPageShell>
  );
}

export function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#FFFFFF",
    border: "1px solid #E5DFD9",
    borderRadius: "4px",
    padding: "12px 14px",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
    color: "#2C2A28",
    outline: "none",
  };

  return (
    <StaticPageShell
      kicker="Hablemos"
      title="Contacto"
      intro="¿Dudas sobre tallas, materiales, envíos o devoluciones? Escríbenos y te respondemos en menos de 24 horas laborables."
      breadcrumbs={[{ label: "Inicio", to: "/" }, { label: "Contacto" }]}
      seoTitle="Contacto — Aura | Moda sostenible"
      seoDescription="¿Dudas sobre tallas, materiales, envíos o devoluciones? Escríbenos a hola@aura-sustainable.com y te respondemos en menos de 24 horas laborables."
    >
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          {sent ? (
            <motion.div
              className="rounded-sm p-8 text-center"
              style={{ background: "rgba(74,93,78,0.07)", border: "1px solid rgba(74,93,78,0.25)" }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "#C67C4E" }}>
                <Check size={20} strokeWidth={2} style={{ color: "#FFFFFF" }} />
              </div>
              <h3 className="text-lg mb-2" style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}>¡Mensaje enviado! (demo)</h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>
                Gracias, {form.name || "amig@"}. Esto es una <strong style={{ color: "#C67C4E" }}>demo</strong>: el formulario no envía datos reales.
                Para contactar de verdad con Aura escribe a <strong style={{ color: "#2C2A28" }}>hola@aura-sustainable.com</strong>.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Nombre</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu@correo.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>Mensaje</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Cuéntanos en qué podemos ayudarte…"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-4 rounded-sm text-white font-medium text-sm cursor-pointer"
                style={{ background: "#4A5D4E", fontFamily: "Inter, sans-serif" }}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ scale: 0.98 }}
              >
                Enviar mensaje
              </motion.button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: "hola@aura-sustainable.com", sub: "Respondemos en menos de 24 h" },
            { icon: Phone, label: "Teléfono", value: "+34 900 123 456", sub: "Lun–Vie, 9:00–18:00" },
            { icon: MapPin, label: "Showroom", value: "Carrer dels Tallers 12, Barcelona", sub: "Visítanos y toca los tejidos" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(74,93,78,0.08)" }}>
                <c.icon size={17} strokeWidth={1.5} style={{ color: "#4A5D4E" }} />
              </div>
              <div>
                <p className="text-xs tracking-[0.15em] uppercase mb-1" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{c.label}</p>
                <p className="text-sm font-medium" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>{c.value}</p>
                <p className="text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>{c.sub}</p>
              </div>
            </div>
          ))}
          <div className="rounded-sm p-6" style={{ background: "rgba(74,93,78,0.07)", borderLeft: "3px solid #4A5D4E" }}>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: "#2C2A28" }}>
              Si necesitas ayuda con una devolución, consulta antes nuestra política: tienes 30 días y el proceso es gratuito.
            </p>
          </div>
        </div>
      </div>
    </StaticPageShell>
  );
}
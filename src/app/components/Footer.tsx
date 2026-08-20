import { Link } from "react-router";

export default function Footer() {
  const links = [
    { label: "Privacidad", to: "/privacidad" },
    { label: "Términos", to: "/terminos" },
    { label: "Contacto", to: "/contacto" },
  ];
  return (
    <footer className="py-16 px-5 sm:px-8 md:px-10" style={{ borderTop: "1px solid #E5DFD9" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          to="/"
          className="text-2xl tracking-widest cursor-pointer"
          style={{ fontFamily: "Playfair Display, serif", color: "#2C2A28" }}
        >
          Aura
        </Link>
        <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: "#7A736E" }}>
          © 2026 Aura Sustainable Fashion. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-xs cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif", color: "#7A736E", transition: "color 0.25s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2C2A28")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#7A736E")}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
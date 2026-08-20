import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { StoreProvider } from "./store";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import FavoritesDrawer from "./components/FavoritesDrawer";
import SearchOverlay from "./components/SearchOverlay";
import Homepage from "./pages/Homepage";
import { NuevaPage, MujerPage, HombrePage } from "./pages/CatalogPages";
import SostenibilidadPage from "./pages/SostenibilidadPage";
import PDPage from "./pages/PDPage";
import { PrivacidadPage, TerminosPage, ContactoPage } from "./pages/StaticPages";

function AppShell() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrolled(false);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 40);
  };

  return (
    <div className="size-full relative overflow-hidden" style={{ background: "#F7F4F0" }}>
      <Header scrolled={scrolled} />

      <motion.main
        key={location.pathname}
        ref={scrollRef as any}
        className="scroll-container size-full overflow-y-auto"
        onScroll={handleScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/nueva" element={<NuevaPage />} />
            <Route path="/mujer" element={<MujerPage />} />
            <Route path="/hombre" element={<HombrePage />} />
            <Route path="/sostenibilidad" element={<SostenibilidadPage />} />
            <Route path="/producto/:slug" element={<PDPage />} />
            <Route path="/privacidad" element={<PrivacidadPage />} />
            <Route path="/terminos" element={<TerminosPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </motion.main>

      <CartDrawer />
      <FavoritesDrawer />
      <SearchOverlay />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppShell />
      </StoreProvider>
    </BrowserRouter>
  );
}
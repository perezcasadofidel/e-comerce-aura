export type Product = {
  id: number;
  name: string;
  slug: string;
  material: string;
  price: string;
  priceNum: number;
  tag: string;
  recycled: number;
  carbon: string;
  category: string;
  color: string;
  accent: string;
  gender: "mujer" | "hombre";
  img: string;
  sizes: string[];
};

const W = "?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";

export const WOMEN_PRODUCTS: Product[] = [
  { id: 1, name: "Vestido Eolo", slug: "vestido-eolo", material: "Lino Orgánico", price: "85,00 €", priceNum: 85, tag: "Nuevo", recycled: 100, carbon: "Bajo", category: "Vestidos", color: "#D4C5B0", accent: "#B8A898", gender: "mujer", img: `https://images.unsplash.com/photo-1585131609775-8eecc878fdfc${W}`, sizes: ["XS", "S", "M", "L", "XL"] },
  { id: 2, name: "Pantalón Terra", slug: "pantalon-terra", material: "Algodón Reciclado", price: "72,00 €", priceNum: 72, tag: "Edición Limitada", recycled: 70, carbon: "Bajo", category: "Pantalones", color: "#C4B5A0", accent: "#A89880", gender: "mujer", img: `https://images.unsplash.com/photo-1694971112579-464e82f35a13${W}`, sizes: ["S", "M", "L", "XL"] },
  { id: 3, name: "Camisa Bruma", slug: "camisa-bruma", material: "Bambú Orgánico", price: "64,00 €", priceNum: 64, tag: "Nuevo", recycled: 50, carbon: "Medio", category: "Camisas", color: "#D8D0C4", accent: "#C0B8AC", gender: "mujer", img: `https://images.unsplash.com/photo-1564474881250-b40b4464cd0f${W}`, sizes: ["S", "M", "L", "XL"] },
  { id: 4, name: "Cárdigan Raíz", slug: "cardigan-raiz", material: "Lana Reciclada", price: "98,00 €", priceNum: 98, tag: "Edición Limitada", recycled: 70, carbon: "Bajo", category: "Vestidos", color: "#C8B8A4", accent: "#B0A090", gender: "mujer", img: `https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f${W}`, sizes: ["XS", "S", "M", "L"] },
  { id: 5, name: "Falda Selva", slug: "falda-selva", material: "Tencel Orgánico", price: "58,00 €", priceNum: 58, tag: "Nuevo", recycled: 100, carbon: "Bajo", category: "Vestidos", color: "#BEB0A0", accent: "#A89888", gender: "mujer", img: `https://images.unsplash.com/photo-1599384779814-79bbaef08d9e${W}`, sizes: ["XS", "S", "M", "L"] },
  { id: 6, name: "Blusa Niebla", slug: "blusa-niebla", material: "Lino & Cáñamo", price: "69,00 €", priceNum: 69, tag: "Edición Limitada", recycled: 50, carbon: "Medio", category: "Camisas", color: "#CCCAB8", accent: "#B4B2A0", gender: "mujer", img: `https://images.unsplash.com/photo-1572853566605-af9816b0a77a${W}`, sizes: ["XS", "S", "M", "L"] },
  { id: 7, name: "Vestido Marea", slug: "vestido-marea", material: "Algodón Orgánico", price: "92,00 €", priceNum: 92, tag: "Nuevo", recycled: 100, carbon: "Bajo", category: "Vestidos", color: "#C8C0B4", accent: "#B0A89C", gender: "mujer", img: `https://images.unsplash.com/photo-1592980187549-111cda6a1ec5${W}`, sizes: ["XS", "S", "M", "L", "XL"] },
  { id: 8, name: "Chaqueta Musgo", slug: "chaqueta-musgo", material: "Lana & Reciclado", price: "115,00 €", priceNum: 115, tag: "Edición Limitada", recycled: 70, carbon: "Bajo", category: "Accesorios", color: "#9AAA9C", accent: "#7A8A7C", gender: "mujer", img: `https://images.unsplash.com/photo-1589734004800-39305a70c03c${W}`, sizes: ["S", "M", "L", "XL"] },
  { id: 9, name: "Falda Arcilla", slug: "falda-arcilla", material: "Tencel & Bambú", price: "62,00 €", priceNum: 62, tag: "Nuevo", recycled: 100, carbon: "Bajo", category: "Vestidos", color: "#D0B8A4", accent: "#B8A090", gender: "mujer", img: `https://images.unsplash.com/photo-1504051898397-67f872da760b${W}`, sizes: ["XS", "S", "M", "L"] },
];

export const MEN_PRODUCTS: Product[] = [
  { id: 10, name: "Camisa Granito", slug: "camisa-granito", material: "Lino Orgánico", price: "78,00 €", priceNum: 78, tag: "Nuevo", recycled: 100, carbon: "Bajo", category: "Camisas", color: "#B8BAC0", accent: "#9A9CA4", gender: "hombre", img: `https://images.unsplash.com/photo-1627686011747-74adda3d2343${W}`, sizes: ["S", "M", "L", "XL"] },
  { id: 11, name: "Pantalón Roble", slug: "pantalon-roble", material: "Algodón Reciclado", price: "89,00 €", priceNum: 89, tag: "Edición Limitada", recycled: 70, carbon: "Bajo", category: "Pantalones", color: "#A8A090", accent: "#908878", gender: "hombre", img: `https://images.unsplash.com/photo-1591357037205-166318b51afd${W}`, sizes: ["S", "M", "L", "XL"] },
  { id: 12, name: "Jersey Niebla", slug: "jersey-niebla", material: "Lana Merino Reciclada", price: "105,00 €", priceNum: 105, tag: "Nuevo", recycled: 70, carbon: "Bajo", category: "Camisas", color: "#C0B4A8", accent: "#A89C90", gender: "hombre", img: `https://images.unsplash.com/photo-1620834767673-19f69709a716${W}`, sizes: ["S", "M", "L", "XL"] },
  { id: 13, name: "Chaqueta Corteza", slug: "chaqueta-corteza", material: "Algodón Orgánico", price: "135,00 €", priceNum: 135, tag: "Edición Limitada", recycled: 50, carbon: "Medio", category: "Accesorios", color: "#8A9088", accent: "#707870", gender: "hombre", img: `https://images.unsplash.com/photo-1739730976324-2205cb312e37${W}`, sizes: ["M", "L", "XL"] },
  { id: 14, name: "Pantalón Río", slug: "pantalon-rio", material: "Lino & Hemp", price: "82,00 €", priceNum: 82, tag: "Nuevo", recycled: 100, carbon: "Bajo", category: "Pantalones", color: "#C4BCA8", accent: "#ACA490", gender: "hombre", img: `https://images.unsplash.com/photo-1763293203909-47fc323a9ac9${W}`, sizes: ["S", "M", "L", "XL"] },
  { id: 15, name: "Camisa Cedro", slug: "camisa-cedro", material: "Bambú Orgánico", price: "68,00 €", priceNum: 68, tag: "Nuevo", recycled: 50, carbon: "Medio", category: "Camisas", color: "#D4C8B4", accent: "#BCB09C", gender: "hombre", img: `https://images.unsplash.com/photo-1591357037205-166318b51afd${W}`, sizes: ["S", "M", "L", "XL"] },
  { id: 16, name: "Sudadera Bosque", slug: "sudadera-bosque", material: "Algodón Reciclado", price: "94,00 €", priceNum: 94, tag: "Edición Limitada", recycled: 70, carbon: "Bajo", category: "Accesorios", color: "#7A8C7E", accent: "#607268", gender: "hombre", img: `https://images.unsplash.com/photo-1627686011747-74adda3d2343${W}`, sizes: ["S", "M", "L", "XL"] },
  { id: 17, name: "Camiseta Piedra", slug: "camiseta-piedra", material: "Algodón Orgánico", price: "45,00 €", priceNum: 45, tag: "Nuevo", recycled: 100, carbon: "Bajo", category: "Camisas", color: "#C8C4BC", accent: "#B0ACA4", gender: "hombre", img: `https://images.unsplash.com/photo-1620834767673-19f69709a716${W}`, sizes: ["S", "M", "L", "XL"] },
];

export const ALL_PRODUCTS: Product[] = [...WOMEN_PRODUCTS, ...MEN_PRODUCTS];
export const NEW_PRODUCTS: Product[] = ALL_PRODUCTS.filter((p) => p.tag === "Nuevo");

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(num: number): string {
  return num.toFixed(2).replace(".", ",") + " €";
}
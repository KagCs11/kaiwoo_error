import heart from "@/assets/product-heart.jpg";
import pet from "@/assets/product-pet.jpg";
import family from "@/assets/product-family.jpg";
import name from "@/assets/product-name.jpg";

export type Product = {
  id: string;
  name: string;
  tag: string;
  price: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  { id: "heart-couple", name: "Heart Couple Keychain", tag: "Bestseller", price: 189000, image: heart },
  { id: "pet-portrait", name: "Pet Portrait Keychain", tag: "New", price: 199000, image: pet },
  { id: "family-memory", name: "Family Memory Keychain", tag: "Popular", price: 219000, image: family },
  { id: "name-script", name: "Custom Name Script", tag: "Classic", price: 149000, image: name },
];

export const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(n);

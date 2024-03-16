export const PRODUCT_CATEGORIES = [
  {
    label: "Produkter",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Alle produkter",
        href: "/products",
        imageSrc: "/ui-kits/products.png",
        

      },
      {
        name: "Salg",
        href: "#",
        imageSrc: "/salg.jpeg",
      },
    ],
  },
  {
    label: "Kontakt",
    value: "icons" as const,
    featured: [
      {
        name: "Kontakt Oss",
        href: "/contact",
        imageSrc: "/icons/bestsellers.jpg",
      },
      
    ],
  },
];

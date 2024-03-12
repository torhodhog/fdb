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
        name: "Nye Drakter",
        href: "#",
        imageSrc: "/ui-kits/blue.jpg",
      },
      {
        name: "Salg",
        href: "#",
        imageSrc: "/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Kontakt",
    value: "icons" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: "#",
        imageSrc: "/icons/picks.jpg",
      },
      {
        name: "Nye Drakter",
        href: "#",
        imageSrc: "/icons/new.jpg",
      },
      {
        name: "Salg Icons",
        href: "#",
        imageSrc: "/icons/bestsellers.jpg",
      },
    ],
  },
];

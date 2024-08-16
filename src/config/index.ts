export const PRODUCT_CATEGORIES = [
  {
    label: "Produkter",
    value: "ui_kits",
    featured: [
      {
        name: "Alle produkter",
        href: "/products",
        imageSrc: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/produkter.jpg",
        Nasjon: "Alle",
      },
      {
        name: "Salg",
        href: "/Sale",
        imageSrc: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/salg.jpg",
        Nasjon: "Alle",
      },
      // Eksempel på et produkt filtrert etter nasjon
      {
        name: "Engelske drakter",
        href: "/products?Nasjon=England",
        imageSrc: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/norske-produkter.jpg",
        Nasjon: "England",
      },
    ],
  },
  {
    label: "Kontakt",
    value: "Kontakt",
    featured: [
      {
        name: "Kontakt Oss",
        href: "/contact",
        imageSrc: "https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/kontakt.jpg",
        Nasjon: "Alle",
      },
    ],
  },
]
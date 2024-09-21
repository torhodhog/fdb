import AddToCartButton from "@/components/AddToCartButton";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";
import { fetchProduct } from "@/lib/getProducts";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    productId: string;
  };
  searchParams: {
    [key: string]: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

const Page = async ({ params, searchParams }: PageProps) => {
  const { productId } = params;
  const page = searchParams.page || "1";

  const product = await fetchProduct(productId);

  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const validUrls = (product.images as { image: string | { url: string } }[])
    .map(({ image }) => (typeof image === "string" ? image : image?.url))
    .filter(Boolean) as string[];

  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    for (let i = 0; i < 10; i++) {
      stars.push(i < rating ? "⭐" : "☆");
    }
    return <p>{stars}</p>;
  };

  const price = product.salePrice || product.price;
  const isOnSale = Boolean(product.salePrice);
  const isExclusive = product.exclusive; // Anta at dette er en boolean som indikerer om produktet er eksklusivt

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name as string}
              </h1>
            </div>
            <section className="mt-4">
              <div className="flex items-center">
                <p className={`font-medium ${isOnSale ? 'text-red-500' : 'text-gray-900'}`}>
                  {formatPrice(price as number)}
                </p>
                <div className="ml-4 border-1 text-muted-foreground border-gray-300 pl-4">
                  {label}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description as string}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Sendes innen 24 timer etter kjøp
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 mt-4 rounded-md bg-gray-100">
                <div className="mt-4">
                  <h2 className="text-lg font-bold">Tilstand</h2>
                  <StarRating rating={parseInt(product.tilstand || "0")} />
                  <div className="mt-4">
                    <h2 className="text-lg font-bold">Størrelse: {product.size as string}</h2>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              {isExclusive ? (
                <Image
                  src="https://forsoker-ny-botte.s3.eu-north-1.amazonaws.com/KunNettEn.png"
                  alt="Exclusive product"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <ImageSlider urls={validUrls} />
              )}
            </div>
          </div>

          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <AddToCartButton product={product} />
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm text-medium">
                  <Shield
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                  />
                  <span className="text-muted-foreground hover:text-gray-700">
                    30 dagers åpent kjøp
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href="/products"
        query={{ liga_system: product.liga_system || undefined, limit: 4 }}
        title={`Lignende produkter`}
        subtitle={`Finn lignende kvalitetsdrakter som '${product.name}' `}
      />
    </MaxWidthWrapper>
  );
};

export default Page;
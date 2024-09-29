"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

const Page = () => {
  const { items, removeItem } = useCart();

  let userId;
  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId');
  }

  const router = useRouter();

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
    });

  const productIds = items.map(({ product }) => product.id);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + (product.salePrice || product.price),
    0
  );

  const deliveryFee = cartTotal >= 1500 ? 0 : 74; // Dynamisk beregning av leveringskostnader

  const handleCheckout = (deliveryMethod: string) => {
    const leveringsinfo = {
      navn: "Brukerens navn",
      adresse: "Brukerens adresse",
      postnummer: "Brukerens postnummer",
      by: "Brukerens by",
      telefonnummer: "Brukerens telefonnummer".substring(0, 20), // Truncate phone number
      land: "Brukerens land",
    };
  
    createCheckoutSession({
      productIds,
      leveringsinfo,
      deliveryMethod,
    });
  };
  
  const handlePickup = () => {
    handleCheckout("pickup");
  };
  
  const handleDelivery = () => {
    handleCheckout("delivery");
  };

  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'ads_conversion_Start_betalingsprosesse_1', {
              });
            `,
          }}
        />
      </Head>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            Shopping Cart
          </h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div
              className={cn("lg:col-span-7", {
                "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                  isMounted && items.length === 0,
              })}
            >
              <h2 className="sr-only">Items in your shopping cart</h2>

              {isMounted && items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-1">
                  <div
                    aria-hidden="true"
                    className="relative mb-4 h-40 w-40 text-muted-foreground"
                  >
                    <Image
                      src="/empty-cart.jpeg"
                      fill
                      loading="eager"
                      alt="empty shopping cart"
                    />
                  </div>
                  <h3 className="font-semibold text-2xl">
                    Din handlevogn er tom
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Whoops! Ingen produkter å vise.
                  </p>
                </div>
              ) : null}

              <ul
                className={cn({
                  "divide-y divide-gray-200 border-b border-t border-gray-200":
                    isMounted && items.length > 0,
                })}
              >
                {isMounted &&
                  items.map(({ product }) => {
                    const label = PRODUCT_CATEGORIES.find(
                      (c) => c.value === product.category
                    )?.label;

                    const { image } = product.images[0];

                    return (
                      <li key={product.id} className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0">
                          <div className="relative h-24 w-24">
                            {typeof image !== "string" && image.url ? (
                              <Image
                                fill
                                src={image.url}
                                alt="product image"
                                className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                              />
                            ) : null}
                          </div>
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <Link
                                    href={`/product/${product.id}`}
                                    className="font-medium text-gray-700 hover:text-gray-800"
                                  >
                                    {product.name}
                                  </Link>
                                </h3>
                              </div>

                              <div className="mt-1 flex text-sm">
                                <p className="text-muted-foreground">
                                  Category: {label}
                                </p>
                              </div>

                              <p className="mt-1 text-sm font-medium text-gray-900">
                                {formatPrice(product.salePrice || product.price)}
                              </p>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                              <div className="absolute right-0 top-0">
                                <Button
                                  aria-label="remove product"
                                  onClick={() => removeItem(product.id)}
                                  variant="ghost"
                                >
                                  <X className="h-5 w-5" aria-hidden="true" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                            <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

                            <span>Kvalifisert for øyeblikkelig levering</span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Sammendrag</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Kjøpstotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    {isMounted ? (
                      formatPrice(cartTotal)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Leveringskostnader</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {isMounted ? (
                      formatPrice(deliveryFee)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <div className="text-base font-medium text-gray-900">
                    Totalpris
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    {isMounted ? (
                      formatPrice(cartTotal + deliveryFee)
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <Button
                  disabled={items.length === 0 || isLoading}
                  onClick={(event) => handleCheckout("delivery")}
                  className="w-full bg-yellow-500"
                  size="lg"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  ) : null}
                  Kjøp
                </Button>
                <Button
                  disabled={items.length === 0 || isLoading}
                  onClick={handlePickup}
                  className="w-full bg-green-900"
                  size="lg"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  ) : null}
                  Kjøp og hent
                </Button>
              </div>
              <div className="mt-6">
                <p className="font-extralight">
                  * Ved å trykke{" "}
                  <span className="font-semibold">
                    &ldquo;Kjøp og hent&rdquo;
                  </span>
                  , legger vi av produktet for deg. Du henter det i butikken
                  når det passer deg.
                </p>
                <br></br>
                <p className="font-extralight">
                  **Les om butikken og hvor du finner oss{" "}
                  <span>
                    <a href="/FdbStore" className="text-blue-500 hover:underline">
                      her
                    </a>
                  </span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
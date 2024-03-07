import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import payload from "payload";

interface PageProps {
  searchParams: { [key: string]: string } | string[] | undefined;
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) return notFound();

  const orderUserId =
    typeof order.user == "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.jpg"
          className="h-full w-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-start-2">
          <p className="text-sm font-medium text-blue-600">
            Bestilling bekreftet
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Takk for din bestilling
          </h1>
          {order._isPaid ? (
            <p className="mt-2 text-base text-muted-foreground">
              Ordren din er bekreftet og betalt. Du vil motta en e-post med
              bekreftelse og kvittering til{" "}
              {typeof order.user !== "string" ? (
                <span className="font-medium text-gray-900">
                  {order.user.email}.
                </span>
              ) : null}
            </p>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;

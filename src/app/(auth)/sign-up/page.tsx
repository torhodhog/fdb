"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validators";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (err) => {
      console.error("Error details:", err);
      if (err.data?.code === "CONFLICT") {
        toast.error(
          "Denne mailen er allerede i bruk, vil du heller logge inn?"
        );

        return;
      }

      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);

        return;
      }

      toast.error("Noe gikk galt. Prøv igjen senere");
    },
    onSuccess: ({ sentToEmail }) => {
      toast.success(`Verification email sent to ${sentToEmail}.`);
      router.push("/verify-email?to=" + sentToEmail);
    },
  });

  const onSubmit = ({ email, password, phone, address, country, postalCode }: TAuthCredentialsValidator) => {
    console.log("Submitted phone number:", phone);
    mutate({ email, password, phone, address, country, postalCode });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Lag en konto
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5 text-yellow-400",
              })}
              href="/sign-in"
            >
              Har du allerede en konto? Logg inn
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="din@epost.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    {...register("phone")}
                    placeholder="Telefonnummer"
                  />
                  {errors?.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    {...register("address")}
                    placeholder="Adresse"
                  />
                  {errors?.address && (
                    <p className="text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

               

                <div className="grid gap-1 py-2">
                  <Label htmlFor="postalCode">Postnummer</Label>
                  <Input
                    {...register("postalCode")}
                    placeholder="Postnummer"
                  />
                  {errors?.postalCode && (
                    <p className="text-sm text-red-500">
                      {errors.postalCode.message}
                    </p>
                  )}
                </div>
                
                 <div className="grid gap-1 py-2">
                  <Label htmlFor="country">Land</Label>
                  <Input
                    {...register("country")}
                    placeholder="Land"
                  />
                  {errors?.country && (
                    <p className="text-sm text-yellow-500">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Passord</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Passord"
                  />
                  {errors?.password && (
                    <p className="text-sm text-yellow-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button className="bg-green-800" type="submit" disabled={isLoading}>
                  {isLoading ? "Laster..." : "Lag konto"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
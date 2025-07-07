import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { trpc } from "@/trpc/client";

export const useAuth = () => {
  const router = useRouter();
  const utils = trpc.useUtils();

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Logget ut uten feil");

      // Invalidate cache for user data to update navbar
      await utils.auth.getMe.invalidate();

      router.push("/sign-in");
      router.refresh();
    } catch (err) {
      toast.error("Kunne ikke logge ut, prøv igjen senere");
    }
  };

  return { signOut };
};

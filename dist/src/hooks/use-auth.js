"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const navigation_1 = require("next/navigation");
const sonner_1 = require("sonner");
const client_1 = require("@/trpc/client");
const useAuth = () => {
    const router = (0, navigation_1.useRouter)();
    const utils = client_1.trpc.useUtils();
    const signOut = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok)
                throw new Error();
            sonner_1.toast.success("Logget ut uten feil");
            // Invalidate cache for user data to update navbar
            await utils.auth.getMe.invalidate();
            router.push("/sign-in");
            router.refresh();
        }
        catch (err) {
            sonner_1.toast.error("Kunne ikke logge ut, prøv igjen senere");
        }
    };
    return { signOut };
};
exports.useAuth = useAuth;

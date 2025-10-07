"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const client_1 = require("@/trpc/client");
const navigation_1 = require("next/navigation");
const sonner_1 = require("sonner");
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
            // Force a hard refresh to update server components
            window.location.href = "/sign-in";
        }
        catch (err) {
            sonner_1.toast.error("Kunne ikke logge ut, prøv igjen senere");
        }
    };
    return { signOut };
};
exports.useAuth = useAuth;

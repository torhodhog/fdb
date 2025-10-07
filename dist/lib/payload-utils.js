"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideUser = void 0;
const getServerSideUser = async (cookies) => {
    const token = cookies.get('payload-token')?.value;
    const meRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
        headers: {
            Authorization: `JWT ${token}`,
        },
    });
    if (!meRes.ok) {
        // Prøv å hente feilmelding fra responsen, hvis mulig
        let errorText = await meRes.text();
        throw new Error(`Failed to fetch user: ${meRes.status} - ${errorText}`);
    }
    const { user } = (await meRes.json());
    return { user };
};
exports.getServerSideUser = getServerSideUser;

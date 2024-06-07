// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getHash } from "@/components/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{
        title: string;
        message: string;
        redirect?: string;
    }>,
) {
    // no cache
    res.setHeader('Cache-Control', 'no-cache')
    // check for auth cookie
    const authCookie = req.cookies.auth;
    const serverHash = getHash(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
    const clientHash = req.body.hash;
    if (authCookie && !clientHash) {
        const isAuth = serverHash === authCookie;
        if (isAuth) {
            res.status(200).json({
                redirect: '/admin',
                title: "Sikeres bejelentkezés",
                message: "Üdvözöljük az adminisztrációs felületen!"
            });
        } else {
            res.status(500).json({
                title: "Sikertelen bejelentkezés",
                message: "Helytelen felhasználónév vagy jelszó. Kérjük próbálja újra!"
            });
        }
    } else {
        const isAuth = serverHash === clientHash;
        if (isAuth) {
            // give auth cookie with hash, age 1 day
            res.setHeader('Set-Cookie', `auth=${serverHash}; Max-Age=${60 * 60 * 24}; Path=/`);
            res.status(200).json({
                redirect: '/admin',
                title: "Sikeres bejelentkezés",
                message: "Üdvözöljük az adminisztrációs felületen!"
            });
        } else {
            res.status(500).json({
                title: "Sikertelen bejelentkezés",
                message: "Helytelen felhasználónév vagy jelszó. Kérjük próbálja újra!"
            });
        }
    }
}

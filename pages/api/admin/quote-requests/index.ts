// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { QuoteRequest } from "@/components/types";
import { getHash } from "@/components/api";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{
        title: string;
        message: string;
    } | QuoteRequest[]>,
) {
    const serverHash = getHash(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
    const isAuth = serverHash === req.cookies.auth;
    if (!isAuth) {
        //unathorized
        res.status(401)
        return
    }

    const client = new MongoClient(process.env.MONGODB_URI as string);
    try {
        await client.connect();
        const database = client.db("asfapps");
        const collection = database.collection('quote-requests');
        const quoteRequests = await collection.find({}).toArray() as any;
        res.status(200).json(quoteRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ title: "Hiba történt az ajánlatkérések lekérdezése során", message: "Kérjük próbálja újra később!" });
    } finally {
        await client.close();
    }
    res.status(200)
}

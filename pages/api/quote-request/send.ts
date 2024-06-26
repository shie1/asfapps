// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { QuoteRequest } from "@/components/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{
        title: string;
        message: string;
    }>,
) {
    // verify hCaptcha token
    const token = req.body["hCaptcha"];
    const secret = process.env.HCAPTCHA_SECRET as string;
    const response = await fetch(`https://hcaptcha.com/siteverify?secret=${secret}&response=${token}`, {
        method: "POST",
    }).then(res => res.json());
    if (!response.success) {
        res.status(400).json({ title: "Hibás hCaptcha token", message: "Kérjük próbálja újra!" });
        return;
    }

    const qr = req.body as any;
    delete qr["hCaptcha"];

    const client = new MongoClient(process.env.MONGODB_URI as string);
    try {
        await client.connect();
        const database = client.db("asfapps");
        const collection = database.collection('quote-requests');
        await collection.insertOne(qr);
        res.status(200).json({ title: "Az ajánlatkérés sikeresen elküldve!", message: "A megadott email címre, vagy telefonszámon hamarosan felvesszük a kapcsolatot." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ title: "Hiba történt az ajánlatkérés során", message: "Kérjük vegye fel velünk a kapcsolatot telefonon vagy emailben!" });
    } finally {
        await client.close();
    }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type FeaturesResponse = {
    id: string;
    value: string;
    label: string;
    description: string;
    quantification?: {
        name: string;
        amount: number;
    },
    price: {
        increase: number;
    },
    disclaimer?: string;
}[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FeaturesResponse>,
) {
    const client = new MongoClient(process.env.MONGODB_URI as string);
    try {
        await client.connect();
        const database = client.db("asfapps");
        const collection = database.collection('features');
        res.status(200).json(await collection.find({}).toArray() as any as FeaturesResponse);

    } catch (error) {
        console.error(error);
        res.status(500);
    } finally {
        await client.close();
    }
}

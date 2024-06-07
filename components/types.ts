export type WebsiteFeature = {
    value: string;
    label: string;
    description: string;
    quantification?: {
        name: string; // "hó" | "űrlap" showing up as "Ft/hó" or "Ft/űrlap"
        amount?: number
    };
    price: {
        increase: number; // fixed price | [min, max] displayed as x-y Ft
    };
    disclaimer?: string;
}

export type FeatureReference = {
    value: string;
    quantity?: number;
}

export type QuoteRequest = {
    client: {
        name: string;
        email: string;
        phone: string;
    };
    project: {
        name: string;
        description: string;
        features: FeatureReference[];
    };
}
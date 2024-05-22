import dynamic from "next/dynamic";

function PriceRenderRoot({ value }: {
    value: number;
}) {
    const currency = new Intl.NumberFormat('hu-HU', {
        style: 'currency',
        currency: 'HUF',
        minimumFractionDigits: 0,
        useGrouping: true,
    });

    return <span>{currency.format(value)}</span>;
}

export const PriceRender = dynamic(() => Promise.resolve(PriceRenderRoot), { ssr: false });
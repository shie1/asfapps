import dynamic from "next/dynamic";

const CurrentYearRenderRoot = () => {
    return <span>{new Date().getFullYear()}</span>
}

export const CurrentYearRender = dynamic(() => Promise.resolve(CurrentYearRenderRoot), { ssr: false });
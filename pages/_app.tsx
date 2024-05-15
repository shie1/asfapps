import '@mantine/core/styles.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, MantineProvider } from '@mantine/core';
import { DoubleHeader } from "@/components/DoubleHeader";
import { Righteous, Montserrat, Comfortaa } from "next/font/google";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const titleFont = Righteous({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-title",
});
const bodyFont = Montserrat({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-body",
});

const theme = createTheme({
    colors: {
        paleRed: [
            "#ffeaf3",
            "#fdd4e1",
            "#f4a7bf",
            "#ec779c",
            "#e64f7e",
            "#e3356b",
            "#e22762",
            "#c91a52",
            "#b41149",
            "#9f003e"
        ],
        paleViolet: [
            "#f6eeff",
            "#e7daf7",
            "#cab1ea",
            "#ad86dd",
            "#9562d2",
            "#854bcb",
            "#7d3ec9",
            "#6b31b2",
            "#5f2aa0",
            "#52228d"
        ]
    },
    primaryColor: "paleRed",
});

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (<div className={`${titleFont.variable} ${bodyFont.variable}`}>
        <MantineProvider withCssVariables defaultColorScheme="dark" theme={theme}>
            <DoubleHeader />
            <AnimatePresence>
                <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={{
                    pageInitial: {
                        width: "100%",
                        transform: "translateY(100%)",
                        opacity: 0,
                    },
                    pageAnimate: {
                        width: "100%",
                        transform: "translateY(0%)",
                        opacity: 1,
                    },
                    pageExit: {
                        width: "100%",
                        transform: "translateY(-100%)",
                        opacity: 0,
                    },
                }}>
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </MantineProvider>
    </div>);
}
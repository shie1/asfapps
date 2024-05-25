import '@mantine/core/styles.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, MantineProvider, Title } from '@mantine/core';
import { DoubleHeader } from "@/components/DoubleHeader";
import { Righteous, Montserrat, Comfortaa } from "next/font/google";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

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
        ],
        mainMix: [
            "#ffedfd",
            "#f5dbf0",
            "#e6b6dc",
            "#d68dc6",
            "#c96cb4",
            "#c156a9",
            "#be4aa5",
            "#a83b91",
            "#963282",
            "#852871"
        ]
    },
    primaryColor: "paleRed",
});

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [loadAnimationEnded, setLoadAnimationEnded] = useState(false);
    return (<div className={`${titleFont.variable} ${bodyFont.variable}`}>
        <Head>
            <title>Sonkoly Bence</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <MantineProvider withCssVariables defaultColorScheme="dark" theme={theme}>
            <DoubleHeader />
            <AnimatePresence>
                {loadAnimationEnded && (<motion.div key={router.route} initial="pageInitial" animate="pageAnimate" exit="pageExit" style={{
                    width: "100%",
                }} variants={{
                    pageInitial: {
                        position: "absolute",
                        transform: "translateY(-100vh)",
                        opacity: 0,
                    },
                    pageAnimate: {
                        position: "unset",
                        transform: "translateY(0%)",
                        opacity: 1,
                    },
                    pageExit: {
                        position: "absolute",
                        transform: "translateY(100vh)",
                        opacity: 0,
                    },
                }} transition={{
                    duration: 0.4,
                    type: "just",
                }}>
                    <Component {...pageProps} />
                </motion.div>)}
            </AnimatePresence>
            <motion.div className="animatedOverlay"
                initial={{
                    transform: "translateX(0%)",
                }}
                animate={{
                    transform: "translateX(100%)",
                }}
                transition={{
                    duration: 0.4,
                    type: "just",
                    delay: 1.5,
                }}
                onAnimationStart={() => {
                    setTimeout(() => {
                        setLoadAnimationEnded(true);
                    }, 1150);
                }}
            >
                <Title order={1} style={{
                    fontFamily: "var(--font-title)",
                    fontWeight: 100,
                    fontSize: "24vmin",
                    textWrap: "wrap",
                    lineHeight: 1.2,
                    fontStyle: "italic",
                    color: "var(--mantine-color-paleRed-6)",
                }}>
                    <span>asf</span><span style={{
                        color: "var(--mantine-color-mainMix-6)",
                    }}>ap</span><span style={{
                        color: "var(--mantine-color-paleViolet-5)",
                    }}>ps</span>
                </Title>
                <Title order={2} style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10vmin",
                    fontWeight: 400,
                    lineHeight: 1,
                    fontStyle: "italic",
                    color: "var(--mantine-color-paleRed-6)",
                }}>
                    Online, <span style={{
                        color: "var(--mantine-color-paleViolet-6)",
                    }}>megfizethetően</span>
                </Title>
            </motion.div>
        </MantineProvider>
    </div>);
}
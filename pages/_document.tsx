import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';

export default function Document() {
    return (
        <Html lang="hu">
            <Head>
                <ColorSchemeScript defaultColorScheme="light" />
                <link rel="icon" href="/icon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Webfejleszás" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
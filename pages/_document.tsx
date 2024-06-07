import { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';

export default function Document() {
    return (
        <Html lang="hu" data-color-scheme="dark">
            <Head>
                <ColorSchemeScript defaultColorScheme="light" />
                <link rel="icon" href="/icon.png" />
                <meta name="description" content="Webfejleszás" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
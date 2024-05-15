import Head from "next/head";
import { HeroBullets } from "@/components/HeroBullets";
import { FeaturesAsymmetrical } from "@/components/FeaturesAsymmetrical";
import { Container, Divider, Title } from "@mantine/core";

export default function Home() {
  return (
    <>
      <Head>
        <title>Webfejlesztés | Sonkoly Bence</title>
        <meta name="description" content="Webfejleszás" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container size="md" px="xl" pb="xl">
          <HeroBullets />
          <Title style={{
            fontFamily: "var(--font-title)",
            fontWeight: 100,
          }} order={2} my={30}>Szolgáltatásaim</Title>
          <FeaturesAsymmetrical />
        </Container>
      </main>
    </>
  );
}

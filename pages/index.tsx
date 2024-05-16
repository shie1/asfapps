import Head from "next/head";
import { HeroBullets } from "@/components/HeroBullets";
import { FeaturesAsymmetrical } from "@/components/FeaturesAsymmetrical";
import { Container, Divider, Title } from "@mantine/core";
import { FaqWithImage } from "@/components/FaqWithImage";
import { ProjectCards } from "./projects";

export default function Home() {
  return (
    <>
      <main>
        <Container size="md" px="xl" pb="xl">
          <HeroBullets />
          <Title style={{
            fontFamily: "var(--font-title)",
            fontWeight: 100,
          }} order={2} my={30}>Szolgáltatásaim</Title>
          <FeaturesAsymmetrical />
          <FaqWithImage />
        </Container>
      </main>
    </>
  );
}

import { QuoteRequestForm } from "@/components/QuoteRequestForm";
import { Container, Text, Title } from "@mantine/core";

export default function QuoteRequestPage() {
    return (
        <main>
            <Container size="md" px="xl" pb="xl">
                <Title style={{
                    fontFamily: "var(--font-title)",
                    fontWeight: 200,
                }} order={1}>Ajánlat kérés</Title>
                <Text>
                    Kérj ajánlatot weboldalad elkészítésére! Ez egy ingyenes és kötelezettségmentes folyamat. Az űrlap kitöltése után hamarosan felvesszük veled a kapcsolatot.
                </Text>
                <Text style={{
                    marginBottom: "30px",
                    fontSize: "0.8rem",
                    color: "var(--mantine-color-yellow-3)",
                }}>
                    A feltűntetett árak tájékoztató jellegűek.
                </Text>
                <QuoteRequestForm />
            </Container>
        </main>
    );
}
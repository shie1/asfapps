import { ContactForm } from "@/components/ContactForm"
import { Container } from "@mantine/core"

export default function Contact() {
    return (
        <main>
            <Container size="md" px="xl" pb="xl">
                <ContactForm />
            </Container>
        </main>
    )
}
import { CardsContainer, ProjectCard } from "@/components/ProjectCard";
import { Container, Grid, Stack, Text, Title } from "@mantine/core";

export const ProjectCards = () => (<CardsContainer>
    <ProjectCard
        projectName="Ossia"
        projectDescription="Az Ossia egy zenelejátszó progresszív-webalkalmazás (PWA), amely lehetővé teszi a felhasználók számára, hogy zenét hallgassanak a böngészőjükben."
        projectImage="/ossia.png"
        projectUrl="https://ossia.shie1bi.hu"
        projectTags={["Webapp", "PWA", "Zenelejátszó"]}
    />
    <ProjectCard
        projectName="Bioritmus Helpdesk"
        projectDescription="A Bioritmus Helpdesk egy webalkalmazás, amely lehetővé teszi a Bioritmus Kertészet vásárlóinak, hogy megtalálják a termékeket az üzleten belül egy térkép segítségével."
        projectImage="/bioritmus_helpdesk.png"
        projectUrl="https://bioritmuskert.hu"
        projectTags={["Webapp", "Térkép", "Helpdesk"]}
    />
    <ProjectCard
        projectName="Menetrendek.INFO"
        projectDescription="Stílusos, modern webes útvonaltervező a MÁV, Volánbusz és BKK menetrendjeivel."
        projectImage="/menetrendek.png"
        projectTags={["Webapp", "PWA", "Navigáció", "Menetrend"]}
    />
</CardsContainer>)

export default function Projects() {
    return (<>
        <main>
            <Container size="md" px="xl" pb="xl">
                <Stack mb="md" gap={2}>
                    <Title style={{
                        lineHeight: 1,
                        fontFamily: "var(--font-title)",
                        fontWeight: 100,
                    }}>Referenciák</Title>
                    <Text style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 100,
                    }}>
                        Kiemelt projektek, melyek tükrözik csapatunk képességeit.
                    </Text>
                </Stack>
                <ProjectCards />
            </Container >
        </main>
    </>)
}
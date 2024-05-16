import { Card, Image, Text, Group, Badge, Button, ActionIcon, Stack, Box, Divider } from '@mantine/core';
import classes from '@/styles/ProjectCard.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function CardsContainer({ children }: { children: React.ReactNode }) {
    return (
        <Stack className={classes.container}>
            {children}
        </Stack>
    );
}

export function ProjectCard({
    projectName,
    projectDescription,
    projectImage,
    projectUrl,
    projectTags,
}: {
    projectName: string,
    projectDescription: string,
    projectImage: string,
    projectUrl?: string,
    projectTags: string[],
}) {
    const tags = projectTags.map((tag) => (
        <Badge color='paleViolet' variant="light" key={tag}>
            {tag}
        </Badge>
    ));

    return (
        <Box p="md" className={classes.card} data-interactable={projectUrl ? "true" : "false"}>
            <Box className={classes.imageBox} onClick={() => {
                if (projectUrl) window.open(projectUrl, "_blank");
            }}>
                <Image className={classes.image} src={projectImage} alt={projectName} height={180} />
            </Box>


            <Box className={classes.section} mt="md">
                <Stack>
                    <Stack className={classes.labels} gap={4}>
                        <Group justify="apart" align='center'>
                            <Text className={classes.title} fz="lg" fw={500}>
                                {projectName}
                            </Text>
                        </Group>
                        <Group gap={8}>
                            {tags}
                        </Group>
                    </Stack>
                    <Divider />
                    <Text fz="sm">
                        {projectDescription}
                    </Text>
                </Stack>
            </Box>
        </Box>
    );
}
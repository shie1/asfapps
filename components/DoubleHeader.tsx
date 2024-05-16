import { useState } from 'react';
import { Container, Anchor, Group, Burger, Box, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/styles/DoubleHeader.module.css';
import Link from "next/link";
import { useRouter } from "next/router";

const userLinks = [
    { link: "https://github.com/shie1/", label: 'GitHub' },
    { link: "https://www.linkedin.com/in/bence-sonkoly-219606280/", label: 'LinkedIn' },
];

const mainLinks = [
    { link: '/', label: 'Főoldal' },
    { link: '/projects', label: 'Projektek' },
    { link: '/contact', label: 'Kapcsolat' },
];

export function DoubleHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const router = useRouter()

    const mainItems = mainLinks.map((item, index) => (
        <Link
            href={item.link}
            key={item.label}
            className={classes.mainLink}
            data-active={router.pathname === item.link || undefined}
        >
            {item.label}
        </Link>
    ));

    const secondaryItems = userLinks.map((item) => (
        <a
            href={item.link}
            key={item.label}
            target={"_blank"}
            rel={"external noreferrer noopener"}
            className={classes.secondaryLink}
        >
            {item.label}
        </a>
    ));

    return (
        <header className={classes.header}>
            <Container className={classes.inner}>
                <Title style={{
                    color: "var(--mantine-color-paleRed-5)",
                    lineHeight: 1.2,
                    height: "1lh",
                    fontSize: "2.4rem",
                    fontFamily: "var(--font-title)",
                    lineClamp: 1,
                    overflow: "hidden",
                }}>Sonkoly Bence</Title>
                <Box className={classes.links} visibleFrom="sm">
                    <Group justify="flex-end">{secondaryItems}</Group>
                    <Group gap={0} justify="flex-end" className={classes.mainLinks}>
                        {mainItems}
                    </Group>
                </Box>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                    hiddenFrom="sm"
                />
            </Container>
        </header>
    );
}
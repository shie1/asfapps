import { useEffect, useState } from 'react';
import { Container, Anchor, Group, Burger, Box, Title, Transition, Stack, Divider } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
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
    { link: '/quote-request', label: 'Ajánlatkérés' },
    { link: '/contact', label: 'Kapcsolat' },
];

export function DoubleHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const router = useRouter()
    const smallerThanSm = useMediaQuery("(max-width: 767px)");

    const mainItems = mainLinks.map((item, index) => (
        <Link
            href={item.link}
            key={item.label}
            className={classes.mainLink}
            onClick={() => {
                if (smallerThanSm) toggle()
            }}
            data-active={router.pathname === item.link || undefined}
        >
            {item.label}
        </Link>
    ));

    const secondaryItems = userLinks.map((item) => (
        <a
            href={item.link}
            key={item.label}
            onClick={toggle}
            target={"_blank"}
            rel={"external noreferrer noopener"}
            className={classes.secondaryLink}
        >
            {item.label}
        </a>
    ));

    useEffect(() => {
        if (typeof window === "undefined") return
        let listener
        if (opened && smallerThanSm) {
            const x = window.scrollX
            const y = window.scrollY
            listener = (e: any) => {
                window.scrollTo(x, y)
            }
        } else {
            listener = () => { }
        }
        window.addEventListener("scroll", listener)
        return () => window.removeEventListener("scroll", listener)
    }, [opened, smallerThanSm])

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
            <Transition transition="slide-up" mounted={opened}>
                {(styles) => (
                    <div style={styles} className={classes.mobileLinks}>
                        <Stack gap="md">
                            {mainItems}
                        </Stack>
                        <Divider my="lg" />
                        <Stack p="md" gap="md">
                            {secondaryItems}
                        </Stack>
                    </div>
                )}
            </Transition>
        </header>
    );
}
import { QuoteRequest } from "@/components/types"
import { Box, Container, Group, Paper, Stack, Text, Title } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import cookie from "cookie"
import { useEffect, useState } from "react"
import classes from "@/styles/AdminPanel.module.css"

export default function AdminPanel() {
    const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([])

    useEffect(() => {
        const ac = new AbortController()
        fetch(`/api/admin/quote-requests`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            credentials: "include",
        }).then(async (res) => {
            const data = await res.json()
            if (res.status === 200) {
                setQuoteRequests(data)
            } else {
                notifications.show({
                    title: data.title,
                    message: data.message,
                    color: "red",
                })
            }
        }).catch(() => { })
        return () => ac.abort()
    }, [])

    return (<>
        <main className={classes.main}>
            <Container size="md" px="xl" pb="xl">
                <Title style={{
                    lineHeight: 1,
                    fontFamily: "var(--font-title)",
                    fontWeight: 100,
                    marginBottom: "1rem",
                }}>Ajánlatkérések</Title>
                <Stack gap={10}>
                    {quoteRequests.map((qr, i) => (
                        <Box className={classes.quoteRequest} key={i}>
                            <Box style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "1rem",
                            }}>
                                <Text style={{
                                    fontFamily: "var(--font-title)",
                                    fontWeight: 100,
                                    fontSize: "1.5rem",
                                }}>{qr.client.name}</Text>
                                <Box style={{
                                    width: "5px",
                                    height: "5px",
                                    borderRadius: "50%",
                                    backgroundColor: "var(--mantine-color-dark-2)",
                                }} />
                                <Stack gap={2}>
                                    <Text>{qr.client.email}</Text>
                                    <Text>{qr.client.phone}</Text>
                                </Stack>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </main>
    </>)
}

export const getServerSideProps = async (ctx: any) => {

    // get auth cookie
    const cookies = ctx.req.headers.cookie
    if (cookies === undefined) return {
        redirect: {
            destination: '/editor/auth',
            permanent: false,
        }
    }
    // cookies.auth
    const hash = cookie.parse(cookies).auth

    const authSuccesful = await fetch(`${process.env.URL}/api/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ hash }),
    }).then(async (res) => {
        return await res.status == 200
    })

    if (!authSuccesful) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            }
        }
    } else {
        return {
            props: {}
        }
    }
}
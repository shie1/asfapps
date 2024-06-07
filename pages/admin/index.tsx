import { QuoteRequest, QuoteRequestWithFeatures, WebsiteFeature } from "@/components/types"
import { ActionIcon, Box, Container, Divider, Paper, Stack, Text, Title } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import cookie from "cookie"
import { useEffect, useState } from "react"
import classes from "@/styles/AdminPanel.module.css"
import { useMemo } from "react"
import { PriceRender } from "@/components/PriceRender"
import { IconCheck, IconTrash } from "@tabler/icons-react"

const QuoteRequestComponent = ({ qr }: { qr: QuoteRequestWithFeatures }) => {
    const price = useMemo(() => {
        return qr.project.features.reduce((acc, f) => {
            return acc + f.price.increase * (f.quantification?.amount || 1)
        }, 0)
    }, [qr.project.features])

    return (<Box className={classes.quoteRequest}>
        <Box style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            position: "relative",
        }}>
            <ActionIcon onClick={() => {
                if (confirm("Biztosan törölni szeretné?")) {
                    fetch(`/api/admin/quote-requests/delete?id=${qr._id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Cache-Control": "no-cache",
                        },
                        credentials: "include",
                    }).then(async (res) => {
                        const data = await res.json()
                        if (res.status === 200) {
                            notifications.show({
                                title: data.title,
                                message: data.message,
                                color: "green",
                            })
                        } else {
                            notifications.show({
                                title: data.title,
                                message: data.message,
                                color: "red",
                            })
                        }
                    }).catch(() => { }).finally(() => {
                        window.dispatchEvent(new Event("quote-request-deleted"))
                    })
                }
            }} size="xl" radius="xl" color="blue">
                <IconCheck />
            </ActionIcon>
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
        <Divider style={{
            width: "100%",
        }} />
        <Box style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "1rem",
        }}>
            <Text style={{
                fontFamily: "var(--font-title)",
                fontWeight: 100,
                fontSize: "1.2rem",
            }}>{qr.project.name}</Text>
            <Text style={{
                borderLeft: "5px solid var(--mantine-color-dark-2)",
                paddingLeft: "1rem",
            }}>{qr.project.description}</Text>
            <Box className={classes.features}>
                {qr.project.features.map((f, i) => (
                    <Box key={f.value} className={classes.feature}>
                        <Text style={{
                            fontFamily: "var(--font-title)",
                            fontWeight: 100,
                            fontSize: "1rem",
                        }}>{f.label}</Text>
                        <Text>{f.description}</Text>
                        <Text className={classes.price}>
                            <PriceRender value={f.price.increase * (f.quantification?.amount || 1)} /> {f.quantification ? `(${f.quantification.amount} ${f.quantification.name})` : ""}
                        </Text>
                    </Box>
                ))}
            </Box>
            <Divider style={{
                width: "100%",
            }} />
            <Box style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "1rem",
            }}>
                <Text style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: ".5rem",
                    marginBottom: ".5rem",
                    lineHeight: 1,
                }}> Becsült ár: <span className={classes.price}><PriceRender value={price} /></span></Text>
            </Box>
        </Box>
    </Box>)
}

export default function AdminPanel() {
    const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([])
    const [features, setFeatures] = useState<WebsiteFeature[]>([])

    useEffect(() => {
        const ac = new AbortController()
        const listener = () => {
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
        }
        window.addEventListener("quote-request-deleted", listener)
        return () => {
            ac.abort()
            window.removeEventListener("quote-request-deleted", listener)
        }
    }, [])

    const quoteRequestsWithFeatures: QuoteRequestWithFeatures[] = useMemo(() => {
        if (quoteRequests.length === 0 || features.length === 0) return []
        // match features based on value, insert quantity into quantification.amount
        const quoteRequestsWithFeatures: QuoteRequestWithFeatures[] = quoteRequests.map((qr) => {
            const project = qr.project
            const featuresWithQuantification = project.features.map((f) => {
                const feature: WebsiteFeature = features.find((feature) => feature.value === f.value)!
                return {
                    ...feature,
                    ...(f.quantity ? {
                        quantification: {
                            ...feature.quantification,
                            amount: f.quantity || 1,
                        }
                    } : {})
                } as any
            })
            return {
                client: qr.client,
                _id: qr._id,
                project: {
                    ...project,
                    features: featuresWithQuantification,
                }
            }
        })
        return quoteRequestsWithFeatures
    }, [quoteRequests, features]) as any

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

    useEffect(() => {
        const ac = new AbortController()
        fetch(`/api/features`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            credentials: "include",
        }).then(async (res) => {
            const data = await res.json()
            if (res.status === 200) {
                setFeatures(data)
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
                    {quoteRequestsWithFeatures.map((qr, i) => (
                        <QuoteRequestComponent key={i} qr={qr} />
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
            destination: '/admin/login',
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
        return res.status == 200
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
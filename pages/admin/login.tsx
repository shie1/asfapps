import { Button, Container, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import classes from "@/styles/AdminLogin.module.css";
import { useForm } from "@mantine/form";
import { getHash } from "@/components/api";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

export default function AdminLogin() {
    const form = useForm<{
        username: string,
        password: string,
    }>({
        initialValues: {
            username: "",
            password: "",
        },
    });

    const router = useRouter();

    return (<>
        <main>
            <Container size="md" px="xl" pb="xl" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Paper style={{
                    padding: "2rem",
                    borderRadius: "1rem",
                    boxShadow: "0 0 50px var(--mantine-color-paleRed-light)",
                }} shadow="xs">
                    <form className={classes.form} onSubmit={form.onSubmit((values) => {
                        const hash = getHash(values.username, values.password);
                        fetch("/api/admin/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ hash }),
                        }).then(async (res) => {
                            const json = await res.json();
                            if (res.status !== 200) {
                                notifications.show({
                                    title: json.title,
                                    message: json.message,
                                    color: "red",
                                })
                            } else {
                                notifications.show({
                                    title: json.title,
                                    message: json.message,
                                    color: "teal",
                                })
                                router.push(json.redirect);
                            }
                        });
                    })}>
                        <Title order={2} style={{
                            fontFamily: "var(--font-body)",
                        }}>Bejelentkezés</Title>
                        <TextInput style={{
                            width: "100%",
                        }} label="Felhasználónév" placeholder="gipsz.jakab" required {...form.getInputProps("username")} />
                        <TextInput formEncType="password" style={{
                            width: "100%",
                        }} type="password" label="Jelszó" placeholder="********" required {...form.getInputProps("password")} />
                        <Button type="submit">Bejelentkezés</Button>
                    </form>
                </Paper>
                <Text style={{
                    marginTop: "5rem",
                    fontFamily: "var(--font-body)",
                    maxWidth: "25rem",
                    fontStyle: "italic",
                    textAlign: "center",
                }}>Jelentkezz be, hogy megtekintsd az oldal látogatottságát és a beküldött árajánlatokat.</Text>
            </Container>
        </main>
    </>)
}
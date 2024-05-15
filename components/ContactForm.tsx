import { Button, Card, Group, MultiSelect, Select, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "@/styles/ContactForm.module.css";
import contact from "./contact.svg"
import Image from "next/image";

export function ContactForm() {
    const form = useForm<{
        name: string;
        email: string;
        message: string;
        subject?: string;
    }>({
        initialValues: {
            name: "",
            email: "",
            message: "",
            subject: undefined,
        },
    });

    return (<>
        <Group align="center" className={classes.group}>
            <div className={classes.left}>
                <div className={classes.inner}>
                    <Title className={classes.title} order={2}>Lépjünk kapcsolatba!</Title>
                    <Text className={classes.text}>Ha bármilyen kérdésed van, vagy szeretnél egyedi ajánlatot kérni, akkor <b>ne habozz, írj nekem!</b></Text>
                </div>
                <Image src={contact} alt="Contact" width={350} height={350} />
            </div>
            <Card className={classes.card}>
                <form className={classes.form} onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Stack className={classes.stack} gap="md">
                        <div className={classes.horizontal}>
                            <TextInput
                                required
                                placeholder="Nagy Csaba"
                                style={{
                                    flex: 1,
                                    minWidth: 250,
                                }}
                                label="Név"
                                value={form.values.name}
                                onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
                            />
                            <TextInput
                                style={{
                                    flex: 1,
                                    minWidth: 250,
                                }}
                                required
                                placeholder="nagy.csaba@gmail.com"
                                label="Email"
                                type="email"
                                value={form.values.email}
                                onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                            />
                        </div>
                        <Select
                            label="Tárgy"
                            placeholder="Válassz egyet"
                            classNames={{
                                root: classes.select,
                                dropdown: classes.selectDropdown,
                                wrapper: classes.selectWrapper,
                                option: classes.selectOption,
                            }}
                            data={[
                                { value: "web", label: "Weboldal készítés" },
                                { value: "seo", label: "SEO optimalizálás" },
                                { value: "other", label: "Egyéb" },
                            ]}
                            value={form.values.subject}
                            onChange={(value) => form.setFieldValue("subject", value || undefined)}
                        />
                        <Textarea
                            required
                            label="Üzenet"
                            value={form.values.message}
                            rows={5}
                            maxRows={10}
                            resize="vertical"
                            onChange={(event) => form.setFieldValue("message", event.currentTarget.value)}
                        />
                        <Button style={{
                            width: "min-content",
                        }} type="submit">Küldés</Button>
                    </Stack>
                </form>
            </Card>
        </Group>
    </>)
}
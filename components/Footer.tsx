import classes from "@/styles/Footer.module.css";
import { Container, Divider, Text } from "@mantine/core";
import { CurrentYearRender } from "./CurrentYearRender";
import { ProtectedEmailRender } from "./ProtectedEmailRender";

export const Footer = () => {
    return (
        <footer className={classes.footer}>
            <Container size="md" px="xl" className={classes.inner}>
                <div className={classes.column}>
                    <div>
                        <Text style={{
                            color: "var(--mantine-color-paleRed-5)",
                            lineHeight: 1.2,
                            height: "1lh",
                            fontSize: "2.4rem",
                            fontFamily: "var(--font-title)",
                            lineClamp: 1,
                            fontStyle: "italic",
                            paddingRight: 5,
                            overflow: "hidden",
                        }}>
                            <span>asf</span><span style={{
                                color: "var(--mantine-color-mainMix-6)",
                            }}>ap</span><span style={{
                                color: "var(--mantine-color-paleViolet-5)",
                            }}>ps</span>
                        </Text>
                        <Text style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "1.6rem",
                            fontWeight: 500,
                            lineHeight: 1,
                            fontStyle: "italic",
                            color: "var(--mantine-color-paleRed-6)",
                        }}>
                            Online, <span style={{
                                color: "var(--mantine-color-paleViolet-5)",
                            }}>megfizethetően</span>
                        </Text>
                        <div className={classes.divider} />
                    </div>
                    <Text className={classes.normalText}>
                        Modern webes megoldások cégeknek és magánszemélyeknek
                    </Text>
                    <Text className={classes.normalText}>
                        <CurrentYearRender /> &copy; Skoda Dávid EV. | Minden jog fenntartva.
                    </Text>
                </div>
                <div className={classes.column}>
                    <Text style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "1.2rem",
                        color: "var(--mantine-color-dark-0)",
                    }}>
                        Cégadatok
                    </Text>
                    <Text className={classes.normalText}>
                        Skoda Dávid EV.
                    </Text>
                    <Text className={classes.normalText}>
                        Adószám: HU 45755754-2-27
                    </Text>
                    <Text className={classes.normalText}>
                        Nyilvántartási szám: 58338658
                    </Text>
                    <Text className={classes.normalText}>
                        Email: <ProtectedEmailRender email="info@asfap.hu" />
                    </Text>
                </div>
            </Container>
        </footer>
    );
};
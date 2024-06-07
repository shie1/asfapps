import { Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import classes from '@/styles/HeroBullets.module.css';
import web from "./web.svg"
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from "next/image";

export function HeroBullets() {
    return (
        <div>
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>
                        Legyél online,<br /> legyél <span className={classes.highlight}><motion.div style={{
                            position: 'absolute',
                            display: 'inline-block',
                            width: '100%',
                            height: '100%',
                            top: 0,
                            right: 0,
                            backgroundColor: '#242424',
                        }}
                            /* decrease width on page load*/
                            initial={{ width: '100%' }}
                            animate={{ width: 0 }}
                            transition={{ duration: .5, delay: .5, type: 'just' }}
                        />látható!</span>
                    </Title>
                    <Text c="dimmed" mt="md">
                        Tűnj ki a tömegből egy lenyűgöző weboldallal! A weboldalad az első benyomás, amit a látogatóid
                        kapnak rólad. Hát ne habozz, <b>mutasd a legjobb oldalad</b>!
                    </Text>

                    <List
                        mt={30}
                        spacing="sm"
                        size="sm"
                        icon={
                            <ThemeIcon color='paleViolet' size={30} radius="xl" style={{
                                fontWeight: 700,
                                fontSize: 20,
                                lineHeight: .5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                ?
                            </ThemeIcon>
                        }
                    >
                        <List.Item>
                            Unod már, hogy a versenytársaid <b>elhúznak melletted</b>?
                        </List.Item>
                        <List.Item>
                            Eleged van abból, hogy milliókat kérnek egy <b>egyszerű weboldalért</b>?
                        </List.Item>
                        <List.Item>
                            Szeretnéd, ha a weboldalad <b>nem csak működő, de szép is</b> lenne?
                        </List.Item>
                    </List>

                    <Group mt={30}>
                        <Link href="/quote-request">
                            <Button radius="xl" size="md" className={classes.control}>
                                Kérj ajánlatot még ma!
                            </Button>
                        </Link>
                    </Group>
                </div>
                <Image width={320} height={580} alt="" loading='eager' draggable={false} src={web.src} className={classes.image} />
            </div>
        </div>
    );
}
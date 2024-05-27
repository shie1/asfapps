import { Accordion, Grid, Container, Title } from '@mantine/core';
import classes from '@/styles/FaqWithImage.module.css';
import svg from './faq.svg';
import Image from "next/image"

export function FaqWithImage() {
    return (
        <div className={classes.wrapper}>
            <Grid id="faq-grid" gutter={50}>
                <Grid.Col style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 0,
                    paddingTop: 0,
                }} span={{ base: 12, md: 6 }}>
                    <div className={classes.image}>
                        <Image height={350} width={400} src={svg.src} alt="Gyakran ismételt kérdések" />
                    </div>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Title order={2} ta="center" className={classes.title}>
                        Gyakran ismételt kérdések
                    </Title>

                    <Accordion chevronPosition="right" defaultValue="" variant="separated">
                        <Accordion.Item className={classes.item} value="1">
                            <Accordion.Control>
                                Mennyibe kerül egy weboldal elkészítése?
                            </Accordion.Control>
                            <Accordion.Panel>
                                A weboldal ára számos tényezőtől függ, mint például a weboldal összetettsége és a kívánt funkciók. Kérj árajánlatot, hogy pontos árat kapj, ez teljesen ingyenes és kötelezettségmentes.
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item className={classes.item} value="2">
                            <Accordion.Control>
                                Mennyi idő alatt készül el a weboldal?
                            </Accordion.Control>
                            <Accordion.Panel>
                                Ez a weboldal összetettségétől függően változhat. Általában egy egyszerű weboldal elkészítése néhány héttől egy hónapig tart, míg egy összetettebb weboldal elkészítése akár több hónapig is eltarthat.
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item className={classes.item} value="3">
                            <Accordion.Control>
                                Milyen technológiákat használtok?
                            </Accordion.Control>
                            <Accordion.Panel>
                                A weboldalakat a Next.js keretrendszerrel készítjük, amely a React.js-t használja. Ez jelenleg az egyik legelterjedtebb és leggyorsabb technológia a weboldalak készítésére.
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item className={classes.item} value="4">
                            <Accordion.Control>
                                Milyen tartalommal kell rendelkeznem a weboldal elindításához?
                            </Accordion.Control>
                            <Accordion.Panel>
                                Szükség lesz szöveges tartalomra <i>(pl.: bemutatkozó szöveg, szolgáltatásleírások)</i> és képekre a weboldalához.<br />Ha segítségre van szükséged a tartalom megírásában, természetesen tudunk segíteni.
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Grid.Col>
            </Grid>
        </div>
    );
}
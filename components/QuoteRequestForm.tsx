import { Box, Button, Checkbox, Group, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { features } from "process";
import classes from "@/styles/QuoteRequestFrom.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

const Item = ({ title, description, price, quantity, disclaimer }: {
  title: string;
  description: string;
  price: number | [number, number];
  quantity?: number;
  disclaimer?: string;
}) => {
  return (<div className={classes.item}>
    <Title order={4}>{title}</Title>
    <p>{description}</p>

    {disclaimer && <p>{disclaimer}</p>}
  </div>);
}

export type WebsiteFeature = {
  value: string;
  label: string;
  description: string;
  quantification?: {
    name: string; // "hó" | "űrlap" showing up as "Ft/hó" or "Ft/űrlap"
    amount?: number
  };
  price: {
    increase: number; // fixed price | [min, max] displayed as x-y Ft
  };
  disclaimer?: string;
}

const websiteFeaturesList: WebsiteFeature[] = [
  {
    value: "forms",
    label: "Űrlapok",
    description: "Űrlapokkal gyűjthetünk adatokat a felhasználóktól, például kapcsolatfelvételi űrlapok.",
    quantification: {
      name: "űrlap",
    },
    price: {
      increase: 5990,
    }
  }, {
    value: "blog",
    label: "Tartalomkezelő rendszer",
    description: "Módosítható lesz az oldal tartalma anélkül, hogy fejlesztő segítségét kérnénk. Ez lehet például egy blog, de akár lehet egy egyszerű aloldal tartalmának módosítása is.",
    price: {
      increase: 9990,
    },
  }, {
    value: "pwa",
    label: "PWA: Letölthető weboldal és offline működés",
    description: "A weboldal letölthető lesz a felhasználók számítógépére vagy telefonjára, és offline is használható lesz.",
    price: {
      increase: 9990,
    }
  }, {
    value: "google-analytics",
    label: "Google Analytics integráció",
    description: "Érdekel mennyi látogatód van, honnan jönnek, és mit csinálnak az oldaladon? Beállítjuk a Google Analytics-et az oldaladhoz.",
    price: {
      increase: 4990,
    }
  }, {
    value: "ecommerce",
    label: "Fizetési rendszer",
    description: "Szeretnél értékesíteni termékeket, vagy szolgáltatásokat? Beépíthetjük a fizetési rendszert az oldalba.",
    price: {
      increase: 19500,
    },
    disclaimer: "A fizetési rendszer beépítése nem tartalmazza a fizetési szolgáltató díjait.",
  }, {
    value: "localization",
    label: "Többnyelvűség",
    description: "Szeretnéd, hogy az oldalad több nyelven is elérhető legyen? Beállítjuk a többnyelvűséget az oldaladhoz.",
    quantification: {
      name: "nyelv",
    },
    price: {
      increase: 8000,
    },
    disclaimer: "Az ár az oldal szövegének mennyiségétől függően változhat."
  }, {
    value: "live-chat",
    label: "Élő csevegés",
    description: "Szeretnél élő csevegést az oldaladon? Beépíthetjük az élő csevegést az oldalba.",
    price: {
      increase: 5000,
    },
    disclaimer: "Az élő csevegés szolgáltatójának díjai nem tartalmazottak az árban."
  }
]

export function QuoteRequestForm() {
  const form = useForm<{
    client: {
      name: string;
      email: string;
      phone: string;
    };
    project: {
      name: string;
      description: string;
      features: WebsiteFeature[];
    };
  }>({
    initialValues: {
      client: {
        name: "",
        email: "",
        phone: "",
      },
      project: {
        name: "",
        description: "",
        features: [],
      }
    },
  });

  const estimatedPrice = useMemo<number | undefined>(() => {
    if (form.values.project.features.length === 0) return undefined;
    return form.values.project.features.reduce((acc, feature) => {
      if (typeof feature.price.increase === "number") {
        return acc + feature.price.increase;
      } else {
        return acc + (feature.price.increase[0] + feature.price.increase[1]) / 2;
      }
    }, 0);
  }, [form.values.project.features]);

  const showProjectDetails = useMemo(() => {
    return form.values.client.name && form.values.client.email && form.values.client.phone;
  }, [form.values.client.name, form.values.client.email, form.values.client.phone]);

  const showFeatures = useMemo(() => {
    return form.values.project.name && form.values.project.description && showProjectDetails;
  }, [form.values.project.name, form.values.project.description, showProjectDetails]);

  const showSummary = useMemo(() => {
    return showFeatures;
  }, [showFeatures]);

  function WebsiteFeatureCheckbox({ feature }: { feature: WebsiteFeature }) {
    return (<Box className={classes.featureCard} key={feature.value}>
      <Checkbox className={classes.checkBox} type="checkbox" id={feature.value} onClick={() => {
        if (form.values.project.features.includes(feature)) {
          form.setFieldValue("project.features", form.values.project.features.filter(f => f !== feature));
        } else {
          form.setFieldValue("project.features", [...form.values.project.features, feature]);
        }
      }} checked={form.values.project.features.includes(feature)} />
      <label className={classes.info} htmlFor={feature.value}>
        <Title className={classes.label} order={4}>{feature.label}</Title>
        <p className={classes.description}>{feature.description}</p>
        <div className={classes.footer}>
          {feature.disclaimer && <p className={classes.disclaimer}>{feature.disclaimer}</p>}
          <p className={classes.price}>{feature.price.increase} Ft{feature.quantification ? `/${feature.quantification.name}` : ""}</p>
        </div>
      </label>
    </Box>)
  }

  return (<>
    <Box>
      <form className={classes.form} onSubmit={form.onSubmit((values => console.log(values)))}>
        <Stack className={classes.stack} gap="md">
          <Box key="clientDetails" className={classes.section}>
            <Title className={classes.sectionLabel} order={3}>Kapcsolattartási adatok</Title>
            <Group wrap="wrap">
              <TextInput className={classes.input} label="Név" placeholder="Nagy Csaba" required {...form.getInputProps("client.name")} />
              <TextInput className={classes.input} label="Email" placeholder="nagy.csaba@gmail.com" required {...form.getInputProps("client.email")} />
              <TextInput className={classes.input} label="Telefonszám" placeholder="+36301234567" required {...form.getInputProps("client.phone")} />
            </Group>
          </Box>
          <AnimatePresence>
            {showProjectDetails && <motion.div key={"projectDetails"} className={classes.section}
              transition={{
                duration: 0.4,
                type: "just",
                ease: "easeInOut"
              }}
              initial={{ transform: "translateY(100%)" }}
              animate={{ transform: "translateX(0)" }}
              exit={{ transform: "translateY(100%)" }}
            >
              <Title className={classes.sectionLabel} order={3}>Projekt adatok</Title>
              <Stack>
                <TextInput className={classes.input} label="Weboldal neve" placeholder="Webnév" required {...form.getInputProps("project.name")} />
                <Textarea className={classes.input} label="Projekt leírása" placeholder="Egy rövid leírás a weboldalról" required {...form.getInputProps("project.description")} />
              </Stack>
            </motion.div>}
            {showFeatures && <motion.div key="WebsiteFeatures" className={classes.section}
              transition={{
                duration: 0.4,
                type: "just",
                ease: "easeInOut"
              }}
              initial={{ transform: "translateY(100%)" }}
              animate={{ transform: "translateX(0)" }}
              exit={{ transform: "translateY(100%)" }}
            >
              <Title className={classes.sectionLabel} order={3}>Funkciók</Title>
              <Stack>
                {websiteFeaturesList.map(feature => (
                  <WebsiteFeatureCheckbox key={feature.value} feature={feature} />
                ))}
              </Stack>
            </motion.div>}
            {showSummary && <motion.div key="summary" className={classes.endSection}
              transition={{
                duration: 0.4,
                type: "just",
                ease: "easeInOut"
              }}
              initial={{ transform: "translateY(100%)" }}
              animate={{ transform: "translateX(0)" }}
              exit={{ transform: "translateY(100%)" }}>
              <Text>Becsült ár: {estimatedPrice ? `${estimatedPrice} Ft` : "ismeretlen"}</Text>
              <Button className={classes.submitButton} type="submit">Küldés</Button>
            </motion.div>}
          </AnimatePresence>
        </Stack>
      </form>
    </Box>
  </>);
}
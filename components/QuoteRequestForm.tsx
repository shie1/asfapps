import { ActionIcon, Box, Button, Checkbox, Group, NumberInput, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import classes from "@/styles/QuoteRequestFrom.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PriceRender } from "./PriceRender";

const Item = ({ name, price, quantity }: {
  name: string;
  price: number;
  quantity?: number;
}) => {
  return (<div className={classes.item}>
    <Text className={classes.name}>{name}</Text>
    <p className={classes.price}>{quantity ? `${quantity} x ` : ""}<PriceRender value={price} /></p>
  </div>);
}

const QuoteFormContext = createContext<UseFormReturnType<{
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
}> | null>(null);

function WebsiteFeatureCheckbox({ feature }: {
  feature: WebsiteFeature,
}) {
  const [amount, setAmount] = useState(0);
  const form = useContext(QuoteFormContext)!;

  const checked = useMemo(() => {
    return form.values.project.features.find(f => f.label === feature.label) !== undefined;
  }, [form.values.project.features, feature]);

  useEffect(() => {
    if (!feature.quantification) return;
    if (amount < 0) setAmount(0);
    if (amount === 0) {
      form.setFieldValue("project.features", form.values.project.features.filter(f => f.label !== feature.label));
    } else {
      if (form.values.project.features.find(f => f.label === feature.label)) {
        form.setFieldValue("project.features", form.values.project.features.map(f => f.label === feature.label ? { ...f, quantification: { ...f.quantification, amount: amount, name: f.quantification?.name || "" } } : f));
      } else {
        form.setFieldValue("project.features", [...form.values.project.features, { ...feature, quantification: { ...feature.quantification, amount: amount, name: feature.quantification?.name || "" } }]);
      }
    }
  }, [amount, feature, form])

  return (<Box className={classes.featureCard} key={feature.value}>
    {feature.quantification ?
      <div className={classes.quantityInput}>
        <ActionIcon className={classes.quantityButton} size="sm" onClick={() => setAmount(amount + 1)}>+</ActionIcon>
        <p
          contentEditable
          className={classes.amount}
          suppressContentEditableWarning
          onBlur={(e) => {
            const value = parseInt(e.currentTarget.innerText);
            if (!isNaN(value)) {
              setAmount(value);
            }
          }}
        >{amount}</p>
        <ActionIcon disabled={amount < 1} className={classes.quantityButton} size="sm" onClick={() => setAmount(amount - 1)}>-</ActionIcon>
      </div>
      :
      <Checkbox className={classes.checkBox} type="checkbox" id={feature.value} onClick={() => {
        if (checked) {
          form.setFieldValue("project.features", form.values.project.features.filter(f => f.label !== feature.label));
        } else {
          form.setFieldValue("project.features", [...form.values.project.features, feature]);
        }
      }} checked={checked} />}
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
      increase: 49900,
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
      increase: 18900,
    },
    disclaimer: "Az ár az oldal szövegének mennyiségétől függően változhat."
  }, {
    value: "live-chat",
    label: "Élő csevegés",
    description: "Szeretnél élő csevegést az oldaladon? Beépíthetjük az élő csevegést az oldalba.",
    price: {
      increase: 6000,
    },
    disclaimer: "Az élő csevegés szolgáltatójának díjai nem tartalmazottak az árban."
  }
]

const summaryDefaults = [
  {
    name: "Alap weboldal csomag",
    price: 139000
  }
]

export function QuoteRequestForm({
  killSignal
}: {
  killSignal?: boolean;
}) {
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

  const showProjectDetails = useMemo(() => {
    return form.values.client.name && form.values.client.email && form.values.client.phone;
  }, [form.values.client.name, form.values.client.email, form.values.client.phone]);

  const showFeatures = useMemo(() => {
    if (killSignal) {
      return false
    }
    return form.values.project.name && form.values.project.description && showProjectDetails;
  }, [form.values.project.name, form.values.project.description, showProjectDetails, killSignal]);

  const showSummary = useMemo(() => {
    return showFeatures;
  }, [showFeatures]);

  const summary = useMemo<{
    name: string;
    price: number;
    quantity?: number;
  }[]>(() => {
    return [
      ...summaryDefaults,
      ...form.values.project.features.map(feature => ({
        name: feature.label,
        price: feature.price.increase,
        quantity: feature.quantification?.amount
      }))
    ]
  }, [form.values.project.features]);

  const estimatedPrice = useMemo(() => {
    return summary.reduce((prev, curr) => prev + curr.price * (curr.quantity || 1), 0);
  }, [summary]);

  return (<>
    <QuoteFormContext.Provider value={form}>
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
              {showSummary && (<>
                <motion.div key="summary" className={classes.section}
                  transition={{
                    duration: 0.4,
                    type: "just",
                    ease: "easeInOut"
                  }}
                  initial={{ transform: "translateY(100%)" }}
                  animate={{ transform: "translateX(0)" }}
                  exit={{ transform: "translateY(100%)" }}>
                  <Stack>
                    <div>
                      <Title className={classes.sectionLabel} order={3}>Összegzés</Title>
                      <Text className={classes.disclaimer}>Az árak tájékoztató jellegűek, a végleges árat a projekt részletes elemzése után tudjuk megadni.</Text>
                    </div>
                    {summary.map(item => (
                      <Item key={item.name} name={item.name} price={item.price} quantity={item.quantity} />
                    ))}
                  </Stack>
                </motion.div>
                <motion.div key="summary" className={classes.endSection}
                  transition={{
                    duration: 0.4,
                    type: "just",
                    ease: "easeInOut"
                  }}
                  initial={{ transform: "translateY(100%)" }}
                  animate={{ transform: "translateX(0)" }}
                  exit={{ transform: "translateY(100%)" }}>
                  <Text>Becsült ár: {estimatedPrice ? <span className={classes.price}><PriceRender value={estimatedPrice} /></span> : "ismeretlen"}</Text>
                  <Button className={classes.submitButton} type="submit">Küldés</Button>
                </motion.div>
              </>)}
            </AnimatePresence>
          </Stack>
        </form>
      </Box>
    </QuoteFormContext.Provider>
  </>);
}
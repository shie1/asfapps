import { ActionIcon, Box, Button, Checkbox, Group, NumberInput, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import classes from "@/styles/QuoteRequestFrom.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PriceRender } from "./PriceRender";
import { FeatureReference, WebsiteFeature } from "./types";
import { notifications } from "@mantine/notifications";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef } from "react";
import { useMediaQuery } from "@mantine/hooks";

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
    features: FeatureReference[];
  };
  hCaptcha: string;
}> | null>(null);

const notNumberRegex = /[^0-9]*/g

function WebsiteFeatureCheckbox({ feature }: {
  feature: WebsiteFeature,
}) {
  const [amount, setAmount] = useState(feature.quantification?.amount || 0);
  const form = useContext(QuoteFormContext)!;

  const checked = useMemo(() => {
    return form.values.project.features.find(f => f.value === feature.value) !== undefined;
  }, [form.values.project.features, feature]);

  useEffect(() => {
    if (!feature.quantification) return;
    if (amount < 0 || !amount) {
      setAmount(0)
    }
    if (amount === 0) {
      form.setFieldValue("project.features", prevFeatures => prevFeatures.filter(f => f.value !== feature.value));
    } else {
      if (checked) {
        form.setFieldValue("project.features", prevFeatures => prevFeatures.map(f => f.value === feature.value ? { value: feature.value, quantity: amount } : f));
      } else {
        form.setFieldValue("project.features", prevFeatures => [...prevFeatures, { value: feature.value, quantity: amount }]);
      }
    }
  }, [amount, feature])

  return (<Box className={classes.featureCard} key={feature.value}>
    {feature.quantification ?
      <div className={classes.quantityInput}>
        <ActionIcon className={classes.quantityButton} size="sm" onClick={() => setAmount(amount + 1)}>+</ActionIcon>
        <p
          contentEditable
          className={classes.amount}
          suppressContentEditableWarning
          onBlur={(e) => {
            e.currentTarget.innerText = e.currentTarget.innerText.replace(notNumberRegex, '')
            const value = parseInt(e.currentTarget.innerText);
            if (!isNaN(value)) {
              setAmount(value);
            }
          }}
        >{amount}</p>
        <ActionIcon disabled={amount < 1} className={classes.quantityButton} size="sm" onClick={() => setAmount(amount - 1)}>-</ActionIcon>
      </div>
      :
      <Checkbox className={classes.checkBox} type="checkbox" id={feature.value} onChange={(check) => {
        if (check.currentTarget.checked) {
          form.setFieldValue("project.features", prevFeatures => [...prevFeatures, {
            value: feature.value,
          }]);
        } else {
          form.setFieldValue("project.features", prevFeatures => prevFeatures.filter(f => f.value !== feature.value));
        }
      }} checked={checked} />}
    <label className={classes.info} htmlFor={feature.value}>
      <Title className={classes.label} order={4}>{feature.label}</Title>
      <p className={classes.description}>{feature.description}</p>
      <div className={classes.footer}>
        {feature.disclaimer && <p className={classes.disclaimer}>{feature.disclaimer}</p>}
        <p className={classes.price}><PriceRender value={feature.price.increase} />{feature.quantification ? `/${feature.quantification.name}` : ""}</p>
      </div>
    </label>
  </Box>)
}

const summaryDefaults = [
  {
    name: "Alap weboldal csomag",
    price: 139000
  }
]

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
      features: FeatureReference[]
    };
    hCaptcha: string;
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
      },
      hCaptcha: "",
    },
    validateInputOnBlur: true,
    validate: {
      client: {
        name: (value) => value.length > 0 ? null : "Kérlek add meg a neved!",
        email: (value) => value.length > 0 ? (value.match(emailRegex) ? null : "Kérlek érvényes email címet adj meg!") : "Kérlek add meg az email címed!",
      }
    },
  });

  const captchaRef = useRef<any>(null);
  const [features, setFeatures] = useState<WebsiteFeature[]>([]);
  const [sitekey, setSitekey] = useState<string>("" as any);

  const compactCaptcha = useMediaQuery("(max-width: 430px)");

  const send = (values: typeof form.values = form.values) => {
    console.log(values);
    if (!values.hCaptcha) {
      notifications.show({
        title: "Hibás Captcha",
        message: "Kérlek erősítsd meg, hogy nem vagy robot!",
        color: "red",
      });
      return;
    }
    fetch("/api/quote-request/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    }).then((async res => {
      const json = await res.json();
      notifications.show({
        title: json.title,
        message: json.message,
        color: res.status == 200 ? "teal" : "red",
      })
    })).catch(console.error);
  }

  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/features", { signal: ac.signal })
      .then(res => res.json())
      .then(setFeatures)
      .catch(() => { });
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/hcaptcha/sitekey", { signal: ac.signal })
      .then(res => res.json())
      .then(setSitekey)
      .catch(() => { });
    return () => ac.abort();
  }, []);

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
      ...form.values.project.features.map(f => {
        const feature = features.find(feature => feature.value === f.value);
        if (!feature) return {
          name: "Ismeretlen",
          price: 0,
        }
        return {
          name: feature.label,
          price: feature.price.increase,
          quantity: f.quantity,
        }
      })
    ]
  }, [features, form.values.project.features]);

  const estimatedPrice = useMemo(() => {
    return summary.reduce((prev, curr) => prev + curr.price * (curr.quantity || 1), 0);
  }, [summary]);

  return (<>
    <QuoteFormContext.Provider value={form}>
      <Box>
        <form className={classes.form} onSubmit={form.onSubmit(send)}>
          <Stack className={classes.stack} gap="md">
            <Box key="clientDetails" className={classes.section}>
              <Title className={classes.sectionLabel} order={3}>Kapcsolattartási adatok</Title>
              <Group wrap="wrap">
                <TextInput className={classes.input} label="Név" placeholder="Nagy Csaba" required {...form.getInputProps("client.name")} />
                <TextInput onBlur={() => {
                  console.log("aaa")
                  form.validateField("client.email")
                }} className={classes.input} label="Email" placeholder="nagy.csaba@gmail.com" required {...form.getInputProps("client.email")} />
                <TextInput className={classes.input} label="Telefonszám" placeholder="+36301234567" {...form.getInputProps("client.phone")} />
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
                  <TextInput className={classes.input} label="Projekt neve" placeholder="Ruházati webshop, Shopify API kapcsolattal" required {...form.getInputProps("project.name")} />
                  <Textarea className={classes.input} label="Ismertetés" placeholder="Weboldal célja, ötletek, stb..." required {...form.getInputProps("project.description")} />
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
                  {features.map(feature => (
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
                <motion.div key="captcha" className={classes.section}
                  transition={{
                    duration: 0.4,
                    type: "just",
                    ease: "easeInOut"
                  }}
                  initial={{ transform: "translateY(100%)" }}
                  animate={{ transform: "translateX(0)" }}
                  exit={{ transform: "translateY(100%)" }}>
                  <div className={classes.captcha}>{sitekey ? <HCaptcha
                    languageOverride="hu"
                    theme="light"
                    size={compactCaptcha ? "compact" : "normal"}
                    ref={captchaRef}
                    sitekey={sitekey}
                    onVerify={(token) => form.setFieldValue("hCaptcha", token)}
                  /> : <></>}</div>
                </motion.div>
                <motion.div key="summaryBottom" className={classes.endSection}
                  transition={{
                    duration: 0.4,
                    type: "just",
                    ease: "easeInOut"
                  }}
                  initial={{ transform: "translateY(100%)" }}
                  animate={{ transform: "translateX(0)" }}
                  exit={{ transform: "translateY(100%)" }}>
                  <Text>Becsült ár: {estimatedPrice ? <span className={classes.price}><PriceRender value={estimatedPrice} /></span> : "ismeretlen"}</Text>
                  <Button disabled={!form.values.hCaptcha} className={classes.submitButton} type="submit">{form.values.hCaptcha ? "Küldés" : "Kérlek erősítsd meg, hogy nem vagy robot!"}</Button>
                </motion.div>
              </>)}
            </AnimatePresence>
          </Stack>
        </form>
      </Box>
    </QuoteFormContext.Provider>
  </>);
}
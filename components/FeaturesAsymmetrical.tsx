import { Text, SimpleGrid, Container, rem } from '@mantine/core';
import classes from '@/styles/FeaturesAsymmetrical.module.css';
import { IconDeviceMobile, IconMoodConfuzed, IconMoodHappy, IconPaint, IconTools } from '@tabler/icons-react';

interface FeatureProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

function Feature({ icon: Icon, title, description, className, ...others }: FeatureProps) {
  return (
    <div className={classes.feature} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon style={{ width: rem(38), height: rem(38) }} className={classes.icon} stroke={1.5} />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconPaint,
    title: 'Egyedi, stílusos design',
    description: 'Legyen egyedi a weboldalad, amely tükrözi a céged arculatát és stílusát.',
  },{
    icon: IconDeviceMobile,
    title: 'Teljesen reszponzív',
    description: 'Minden eszközön tökéletesen fog megjelenni a weboldalad.',
  },{
    icon: IconTools,
    title: 'SEO optimalizált',
    description: 'Az ügyfelek könnyen megtalálják a weboldaladat a Google keresőben.',
  }
];

export function FeaturesAsymmetrical() {
  const items = mockdata.map((item) => <Feature {...item} key={item.title} />);

  return (
    <Container mt={30} mb={30} size="lg">
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
import { Flex } from '@mantine/core';
import { BusinessTypeChart } from '@/components/Charts/BusinessTypeChart/BusinessTypeChart';
import { DelayedPMChart } from '@/components/Charts/DelayedPMChart/DelayedPMChart';
import { KpiDonutChart } from '@/components/Charts/KpiDonutChart/KpiDonutChart';
import { SalesRevenueChart } from '@/components/Charts/SalesRevenueChart/SalesRevenueChart';

export default function HomePage() {
  return (
    <>
      <Flex direction="column" gap={16}>
        <Flex direction="row" justify="space-between" gap={16}>
          <SalesRevenueChart />
          <BusinessTypeChart />
        </Flex>
        <Flex direction="row" justify="space-between" gap={16}>
          <DelayedPMChart />
          <KpiDonutChart />
        </Flex>
      </Flex>
    </>
  );
}

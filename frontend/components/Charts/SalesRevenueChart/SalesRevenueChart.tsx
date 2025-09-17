'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Flex, Loader, Title } from '@mantine/core';
import { ChartWrapper } from '@/components/Charts/ChartWrapper';
import { useSalesRevenue } from '@/hooks/useSalesRevenue';

export const SalesRevenueChart = () => {
  const { data, isLoading } = useSalesRevenue();

  if (isLoading) {
    return (
      <ChartWrapper>
        <Flex justify="center" align="center" style={{ height: '100%', minHeight: 250 }}>
          <Loader />
        </Flex>
      </ChartWrapper>
    );
  }

  const chartData = Object.entries(data!).map(([month, value]) => ({
    month,
    revenue: value,
  }));

  return (
    <ChartWrapper>
      <Flex direction="column" justify="space-between" align="center">
        <Title order={3} style={{ marginBottom: 8 }}>
          Sales Revenue
        </Title>
        <Title order={6} style={{ marginBottom: 8 }}>
          2025
        </Title>
      </Flex>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#ef476f"
            strokeWidth={2}
            dot
            name="Revenue"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

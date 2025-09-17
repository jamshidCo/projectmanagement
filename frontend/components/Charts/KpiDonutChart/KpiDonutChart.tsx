'use client';

import { useState } from 'react';
import { Cell, Pie, PieChart, PieLabelRenderProps, ResponsiveContainer, Tooltip } from 'recharts';
import { Flex, Loader, NumberInput, Text, Title } from '@mantine/core';
import { ChartWrapper } from '@/components/Charts/ChartWrapper';
import { useKpi } from '@/hooks/useKpi';

const COLORS = ['#ffa500', '#ff4081'];

export const KpiDonutChart = () => {
  const [target, setTarget] = useState(800000);
  const { data, isLoading } = useKpi(2025);

  if (isLoading) {
    return (
      <ChartWrapper>
        <Flex justify="center" align="center" style={{ height: '100%', minHeight: 250 }}>
          <Loader />
        </Flex>
      </ChartWrapper>
    );
  }

  const actual = data!.totalAmount;
  const achievedRate = (actual / target) * 100;
  const difference = actual - target;

  const chartData = [
    { name: 'Achieved', value: actual },
    { name: 'Remaining', value: Math.max(target - actual, 0) },
  ];

  return (
    <ChartWrapper>
      <Flex direction="column" justify="space-between" align="center">
        <Title order={3} style={{ marginBottom: 8 }}>
          KPI
        </Title>
        <Title order={6} style={{ marginBottom: 8 }}>
          2025
        </Title>
      </Flex>

      <Flex align="center" direction="row" gap={16}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label={({ percent }: PieLabelRenderProps) =>
                typeof percent === 'number' ? `${(percent * 100).toFixed(1)}%` : ''
              }
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <Flex direction="column" gap={4} w={180}>
          <NumberInput
            placeholder="Set Target"
            value={target}
            onChange={(v) => setTarget(typeof v === 'number' ? v : 0)}
            step={10000}
            min={0}
            max={1000000}
            hideControls
            size="sm"
            styles={{
              root: {
                marginBottom: 16,
              },
              input: {
                width: '100%',
                textAlign: 'right',
              },
            }}
          />
          <Flex direction="row" justify="space-between" gap={8}>
            <Text fw={700} c="gray">
              Target:
            </Text>
            <Text fw={700} c="blue">
              {target.toLocaleString()}
            </Text>
          </Flex>
          <Flex direction="row" justify="space-between" gap={8}>
            <Text fw={700} c="gray">
              Actual:
            </Text>
            <Text fw={700} c="blue">
              {actual.toLocaleString()}
            </Text>
          </Flex>

          <Text fw={700} c={difference < 0 ? 'red' : 'green'} style={{ textAlign: 'right' }}>
            ({difference >= 0 ? `+${difference.toLocaleString()}` : difference.toLocaleString()})
          </Text>
          <Flex direction="row" justify="space-between" gap={8}>
            <Text fw={700} c="gray">
              Achievement:{' '}
            </Text>
            <Text fw={700} c="green">
              {achievedRate.toFixed(1)}%
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </ChartWrapper>
  );
};

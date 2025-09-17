'use client';

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Box, Flex, Loader, Text, Title } from '@mantine/core';
import { ChartWrapper } from '@/components/Charts/ChartWrapper';
import { useDelayedProjects } from '@/hooks/useDelayedProjects';

interface ChartDataItem {
  pmName: string;
  plannedRate: number;
  actualRate: number;
  deviationPercentage: number;
}

export const DelayedPMChart = () => {
  const { data, isLoading } = useDelayedProjects();

  if (isLoading) {
    return (
      <ChartWrapper>
        <Flex justify="center" align="center" style={{ height: '100%', minHeight: 250 }}>
          <Loader />
        </Flex>
      </ChartWrapper>
    );
  }

  const chartData: ChartDataItem[] = data!.map((pm) => {
    const totalPlanned = pm.projects.reduce((sum, p) => sum + p.plannedRate, 0);
    const totalActual = pm.projects.reduce((sum, p) => sum + p.actualRate, 0);
    const totalDeviation = pm.projects.reduce((sum, p) => sum + p.deviationPercentage, 0);
    const avgDeviation = totalDeviation / pm.projects.length;

    return {
      pmName: pm.pmName,
      plannedRate: totalPlanned,
      actualRate: totalActual,
      deviationPercentage: Math.round(avgDeviation),
    };
  });

  return (
    <ChartWrapper>
      <Flex direction="column" justify="space-between" align="center">
        <Title order={3} style={{ marginBottom: 8 }}>
          Delayed PM
        </Title>
        <Title order={6} style={{ marginBottom: 8 }}>
          2025
        </Title>
      </Flex>

      <Flex align="center" direction="row">
        <ResponsiveContainer width="80%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="pmName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="plannedRate" fill="#fcd34d" name="Planned" />
            <Bar dataKey="actualRate" fill="#a78bfa" name="Actual" />
          </BarChart>
        </ResponsiveContainer>

        <Box mt="sm">
          {chartData.map((item) => (
            <Text key={item.pmName} size="sm" c="blue">
              {item.pmName}: {item.deviationPercentage}% delayed
            </Text>
          ))}
        </Box>
      </Flex>
    </ChartWrapper>
  );
};

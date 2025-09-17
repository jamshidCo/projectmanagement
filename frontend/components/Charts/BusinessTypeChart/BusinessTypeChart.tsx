'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Box, Flex, Loader, Text, Title } from '@mantine/core';
import { ChartWrapper } from '@/components/Charts/ChartWrapper';
import { useBusinessType } from '@/hooks/useBusinessType';

const COLORS = {
  SI: '#FFA726',
  SM: '#F5367E',
  SR: '#3f51b5',
};

export const BusinessTypeChart = () => {
  const { data, isLoading } = useBusinessType();

  if (isLoading) {
    return (
      <ChartWrapper>
        <Flex justify="center" align="center" style={{ height: '100%', minHeight: 250 }}>
          <Loader />
        </Flex>
      </ChartWrapper>
    );
  }

  const totalRevenue =
    data?.reduce((sum: number, category: { projects: { revenue: number }[] }) => {
      return (
        sum +
        category.projects.reduce((pSum: number, p: { revenue: number }) => pSum + p.revenue, 0)
      );
    }, 0) ?? 0;

  const chartData =
    data?.map(
      (category: {
        categoryName: string;
        projects: { id: string; projectName: string; revenue: number }[];
      }) => {
        const categoryRevenue = category.projects.reduce(
          (sum: number, p: { revenue: number }) => sum + p.revenue,
          0
        );

        return {
          name: category.categoryName,
          value: categoryRevenue,
          percent: ((categoryRevenue / totalRevenue) * 100).toFixed(0),
          projects: category.projects,
        };
      }
    ) ?? [];

  return (
    <ChartWrapper>
      <Flex direction="column" justify="space-between" align="center">
        <Title order={3} style={{ marginBottom: 8 }}>
          Business Type
        </Title>
        <Title order={6} style={{ marginBottom: 8 }}>
          2025
        </Title>
      </Flex>

      <Flex align="center" direction="row" gap={16}>
        <ResponsiveContainer width="80%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label={({ name, percent }) => `${name} ${percent}%`}
            >
              {chartData.map((entry: { name: 'SI' | 'SM' | 'SR'; [key: string]: any }) => (
                <Cell key={entry.name} fill={COLORS[entry.name as 'SI' | 'SM' | 'SR']} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <Box>
          {chartData.map((entry: { name: 'SI' | 'SM' | 'SR'; [key: string]: any }) => (
            <Box key={entry.name} mb="sm">
              <Flex align="center" gap="xs" mb={4}>
                <Box
                  w={12}
                  h={12}
                  bg={COLORS[entry.name as 'SI' | 'SM' | 'SR']}
                  style={{ borderRadius: 4 }}
                />
                <Text size="md" c="gray" fw={700}>
                  {entry.name}
                </Text>
              </Flex>
              <div style={{ margin: 0, paddingLeft: 16 }}>
                {entry.projects.map((p: { id: string; projectName: string }) => (
                  <Text key={p.id} size="xs" c="blue">
                    {p.projectName}
                  </Text>
                ))}
              </div>
            </Box>
          ))}
        </Box>
      </Flex>
    </ChartWrapper>
  );
};

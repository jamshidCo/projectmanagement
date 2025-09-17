import { ReactNode } from 'react';
import { Group, Paper, Text, ThemeIcon } from '@mantine/core';

type StatCardProps = {
  label: string;
  value: number;
  color?: string;
  icon: ReactNode;
};

export function ProjectStatsCard({ label, value, icon, color = 'gray' }: StatCardProps) {
  return (
    <Paper shadow="xs" radius="md" p="md" withBorder style={{ width: '20%' }}>
      <Group>
        <ThemeIcon variant="light" color={color} size="xl" radius="md">
          {icon}
        </ThemeIcon>
        <div>
          <Text size="xs" c="dimmed" fw={700}>
            {label}
          </Text>
          <Text size="xl" fw={700}>
            {value}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}

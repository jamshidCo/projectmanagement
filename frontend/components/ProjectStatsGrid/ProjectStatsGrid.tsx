import { IconCircleCheck, IconClock, IconList, IconLoader2, IconX } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { ProjectStatsCard } from '@/components/ProjectStatsCard/ProjectStatsCard';
import { STATUSES } from '@/constants/statuses';
import { ProjectStatus } from '@/types/project';

const totalStats = {
  label: 'Total Projects',
  icon: <IconList size={24} />,
  color: 'gray',
};

const statusStats = [
  {
    status: STATUSES.PLANNED,
    label: 'Planned',
    icon: <IconClock size={24} />,
    color: 'cyan',
  },
  {
    status: STATUSES.IN_PROGRESS,
    label: 'In Progress',
    icon: <IconLoader2 size={24} />,
    color: 'yellow',
  },
  {
    status: STATUSES.COMPLETED,
    label: 'Completed',
    icon: <IconCircleCheck size={24} />,
    color: 'green',
  },
  { status: STATUSES.DELAYED, label: 'Delayed', icon: <IconX size={24} />, color: 'red' },
];

export function ProjectStatsGrid({
  total,
  statusCounts,
}: {
  total: number;
  statusCounts: Record<ProjectStatus, number>;
}) {
  const statsWithValues = statusStats.map((stat) => ({
    ...stat,
    value: statusCounts[stat.status] || 0,
  }));
  const stats = [{ ...totalStats, value: total }, ...statsWithValues];

  return (
    <Flex gap="md" justify="space-between" wrap="nowrap" direction="row" mb={16}>
      {stats.map((stat) => (
        <ProjectStatsCard {...stat} />
      ))}
    </Flex>
  );
}

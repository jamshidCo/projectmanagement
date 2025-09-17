import { IconCircleCheck, IconClock, IconList, IconLoader2, IconX } from '@tabler/icons-react';
import { Flex, Loader } from '@mantine/core';
import { ProjectStatsCard } from '@/components/ProjectStatsCard/ProjectStatsCard';
import { STATUSES } from '@/constants/statuses';
import { StatusCountResponse, useProjectStatusCounts } from '@/hooks/useProjects';
import styles from './ProjectStatsGrid.module.css';

const statusStats = [
  {
    status: 'TOTAL',
    label: 'Total Projects',
    icon: <IconList size={24} />,
    color: 'gray',
  },
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

export function ProjectStatsGrid() {
  const { data: statusCounts, isLoading } = useProjectStatusCounts();

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader color="blue" />
      </div>
    );
  }


  const stats = statusStats.map((stat) => ({
    ...stat,
    value: statusCounts?.[stat.status as keyof StatusCountResponse] ?? 0,
  }));

  return (
    <Flex gap="md" justify="space-between" wrap="nowrap" direction="row" mb={16}>
      {stats.map((stat) => (
        <ProjectStatsCard key={stat.label} {...stat} />
      ))}
    </Flex>
  );
}

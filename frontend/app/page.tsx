'use client';

import { ProjectHeader } from '@/components/ProjectHeader/ProjectHeader';
import { ProjectStatsGrid } from '@/components/ProjectStatsGrid/ProjectStatsGrid';
import ProjectTable from '@/components/ProjectTable/ProjectTable';
import { STATUSES } from '@/constants/statuses';

export default function HomePage() {
  return (
    <>
      <ProjectStatsGrid
        total={5}
        statusCounts={{
          [STATUSES.COMPLETED]: 5,
          [STATUSES.DELAYED]: 1,
          [STATUSES.PLANNED]: 3,
          [STATUSES.IN_PROGRESS]: 15,
        }}
      />

      <ProjectHeader />

      <ProjectTable />
    </>
  );
}

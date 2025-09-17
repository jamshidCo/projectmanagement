'use client';

import { ProjectStatsGrid } from '@/components/ProjectStatsGrid/ProjectStatsGrid';
import ProjectTable from '@/components/ProjectTable/ProjectTable';

export default function HomePage() {
  return (
    <>
      <ProjectStatsGrid />

      <ProjectTable />
    </>
  );
}

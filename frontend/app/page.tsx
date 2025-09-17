'use client';

import { ProjectStatsGrid } from '@/components/ProjectStatsGrid/ProjectStatsGrid';
import ProjectTable from '@/components/ProjectTable/ProjectTable';
import { useProjectStatusCounts } from '@/hooks/useProjects';

export default function HomePage() {
  const {
    data: statusCounts,
    isLoading,
    refetch: refetchProjectStatusCounts,
  } = useProjectStatusCounts();

  return (
    <>
      <ProjectStatsGrid statusCounts={statusCounts} isLoading={isLoading} />
      <ProjectTable onProjectChanged={refetchProjectStatusCounts} />
    </>
  );
}

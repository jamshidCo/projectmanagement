import { useQuery } from '@tanstack/react-query';
import { DelayedProjectChartData } from '@/types/project';

const fetchDelayedProjects = async (): Promise<DelayedProjectChartData[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/delayed_project`);
  return await response.json();
};

export const useDelayedProjects = () =>
  useQuery({
    queryKey: ['delayed-projects'],
    queryFn: fetchDelayedProjects,
  });

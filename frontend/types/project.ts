import { STATUSES } from '@/constants/statuses';

export type Project = {
  id: number;
  projectName: string;
  revenue: number;
  startDate: string;
  endDate: string;
  workingDays: number;
  pmName: string;
  plannedRate: number;
  actualRate: number;
  status: ProjectStatus;
  category: Category;
};

export type Category = {
  id: number;
  name: string;
};

export type ProjectStatus = (typeof STATUSES)[keyof typeof STATUSES];

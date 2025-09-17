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

export type CreateProject = {
  projectName: string;
  revenue: number;
  startDate: string;
  endDate: string;
  pmName?: string;
  plannedRate?: number;
  workingDays: number;
  categoryId: Category['id'];
  status: ProjectStatus;
  actualRate: number;
};

export type Category = {
  id: number;
  name: string;
};

export type ProjectStatus = (typeof STATUSES)[keyof typeof STATUSES];

export interface DelayedProjectChartData {
  pmName: string;
  projects: {
    projectName: string;
    plannedRate: number;
    actualRate: number;
    deviationPercentage: number;
  }[];
}

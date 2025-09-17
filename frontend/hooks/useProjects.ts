import { useQuery } from '@tanstack/react-query';
import { Category, CreateProject, Project, ProjectStatus } from '@/types/project';

type ProjectResponseType = {
  content: Project[];
  totalPages: number;
  totalElements: number;
  number: number;
};

interface UseProjectsPaginationParams {
  page: number;
  pageSize: number;
}

export type StatusCountResponse = Record<ProjectStatus, number> & {
  TOTAL: number;
};

const fetchProjectStatusCounts = async (): Promise<StatusCountResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/status_count`);
  if (!response.ok) {
    throw new Error('Failed to fetch status counts');
  }
  return await response.json();
};

const useProjectStatusCounts = () => {
  return useQuery({
    queryKey: ['projectStatusCounts'],
    queryFn: fetchProjectStatusCounts,
  });
};

export const fetchProjectsPage = async ({
  page,
  pageSize,
}: UseProjectsPaginationParams): Promise<ProjectResponseType> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects?page=${page - 1}&size=${pageSize}`
  );
  if (!resp.ok) {
    throw new Error('Error fetching projects');
  }
  const data = await resp.json();
  return data;
};

const useProjectsPagination = ({ page, pageSize }: UseProjectsPaginationParams) => {
  return useQuery({
    queryKey: ['projects', page, pageSize],
    queryFn: () => fetchProjectsPage({ page, pageSize }),
  });
};

const fetchCategories = async (): Promise<Array<Category>> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projectCategories`);
  const data = await response.json();

  return data;
};

const createProject = async (project: CreateProject): Promise<Project> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error('Failed to create project');
  }

  return await response.json();
};

const deleteProject = async (projectId: number): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
  await response;
};

const editProject = async (id: number, project: CreateProject): Promise<Project> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });

  if (!response.ok) {
    throw new Error('Failed to edit project');
  }

  return await response.json();
};

const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });
};

export {
  useProjectsPagination,
  createProject,
  useCategories,
  deleteProject,
  useProjectStatusCounts,
  editProject,
};

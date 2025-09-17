'use client';

import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  LoadingOverlay,
  Pagination,
  Table,
  Text,
} from '@mantine/core';
import { ProjectHeader } from '@/components/ProjectHeader/ProjectHeader';
import { ProjectRevenueModal } from '@/components/ProjectRevenueModal/ProjectRevenueModal';
import { STATUSES } from '@/constants/statuses';
import { deleteProject, useProjectsPagination } from '@/hooks/useProjects';
import { Project } from '@/types/project';
import { EditProjectModal } from '../EditProjectModal/EditProjectModal';
import styles from './ProjectTable.module.css';

const PAGE_SIZE = 10;

export default function ProjectTable({ onProjectChanged }: { onProjectChanged: () => void }) {
  const [page, setPage] = useState(1);
  const [selectedEditProject, setSelectedEditProject] = useState<Project | undefined>();
  const [selectedRevenueProject, setSelectedRevenueProject] = useState<Project | undefined>();

  const { data, isLoading, isError, refetch } = useProjectsPagination({
    page,
    pageSize: PAGE_SIZE,
  });

  const projects = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleDeleteProject = async (projectId: number) => {
    try {
      await deleteProject(projectId);
      refetch();
      onProjectChanged();
    } catch (error) {
      console.error('Error during project deletion', error);
    }
  };

  const handleProjectCreated = () => {
    refetch();
    setPage(totalPages);
    onProjectChanged();
  };

  return (
    <div style={{ position: 'relative' }}>
      {isLoading && <LoadingOverlay visible />}
      <EditProjectModal
        onClose={() => {
          setSelectedEditProject(undefined);
        }}
        project={selectedEditProject}
        refetchProjects={refetch}
      />

      <ProjectRevenueModal
        onClose={() => {
          setSelectedRevenueProject(undefined);
        }}
        project={selectedRevenueProject}
      />

      <ProjectHeader handleProjectCreated={handleProjectCreated} />

      {isError ? (
        <Center>
          <Text c="red">Error loading data</Text>
        </Center>
      ) : (
        <Table highlightOnHover withTableBorder className={styles.table}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className={styles.projectNameHeaderCell}>Project Name</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th className={clsx(styles.rightAlign, styles.revenueHeaderCell)}>
                Revenue
              </Table.Th>
              <Table.Th>Start date</Table.Th>
              <Table.Th>End date</Table.Th>
              <Table.Th className={styles.rightAlign}>Working Days</Table.Th>
              <Table.Th>PM Name</Table.Th>
              <Table.Th className={styles.rightAlign}>Planned Rate (%)</Table.Th>
              <Table.Th className={styles.rightAlign}>Actual Rate (%)</Table.Th>
              <Table.Th className={styles.centerAlign}>Status</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {projects.map((project) => (
              <Table.Tr key={project.id}>
                <Table.Td>
                  <Button
                    variant="transparent"
                    className={styles.hoveredButton}
                    onClick={() => setSelectedEditProject(project)}
                  >
                    {project.projectName}
                  </Button>
                </Table.Td>
                <Table.Td>{project.category.name}</Table.Td>
                <Table.Td className={styles.rightAlign}>
                  <Button
                    variant="transparent"
                    className={styles.hoveredButton}
                    onClick={() => {
                      setSelectedRevenueProject(project);
                    }}
                  >
                    {project.revenue}
                  </Button>
                </Table.Td>
                <Table.Td>{project.startDate}</Table.Td>
                <Table.Td>{project.endDate}</Table.Td>
                <Table.Td className={styles.rightAlign}>{project.workingDays}</Table.Td>
                <Table.Td>{project.pmName}</Table.Td>
                <Table.Td className={styles.rightAlign}>{project.plannedRate}</Table.Td>
                <Table.Td className={styles.rightAlign}>{project.actualRate}</Table.Td>
                <Table.Td className={styles.centerAlign}>
                  {project.status === STATUSES.COMPLETED && (
                    <Badge variant="outline" color="green" radius="md">
                      Completed
                    </Badge>
                  )}
                  {project.status === STATUSES.PLANNED && (
                    <Badge variant="outline" color="cyan" radius="md">
                      Planned
                    </Badge>
                  )}
                  {project.status === STATUSES.DELAYED && (
                    <Badge variant="outline" color="red" radius="md">
                      Delayed
                    </Badge>
                  )}
                  {project.status === STATUSES.IN_PROGRESS && (
                    <Badge variant="outline" color="yellow" radius="md">
                      In progress
                    </Badge>
                  )}
                </Table.Td>
                <Table.Td className={styles.centerAlign}>
                  <ActionIcon
                    onClick={() => handleDeleteProject(project.id)}
                    aria-label="Delete project"
                    variant="subtle"
                    size="lg"
                  >
                    <IconTrash size={16} stroke={1.5} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}

      <div className={styles.paginationWrapper}>
        <Pagination
          total={totalPages}
          value={page}
          onChange={(p) => {
            setPage(p);
          }}
          radius="xl"
          size="md"
        />
      </div>
    </div>
  );
}

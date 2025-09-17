'use client';

import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import clsx from 'clsx';
import { ActionIcon, Badge, Button, Pagination, Table } from '@mantine/core';
import { STATUSES } from '@/constants/statuses';
import { Project } from '@/types/project';
import styles from './ProjectTable.module.css';

const projects: Project[] = [
  {
    id: 1,
    projectName: 'PMS Development',
    revenue: 50000,
    startDate: '2025-09-01',
    endDate: '2025-10-31',
    workingDays: 61,
    pmName: 'John',
    plannedRate: 14,
    actualRate: 10,
    status: STATUSES.DELAYED,
    category: {
      id: 2,
      name: 'SM',
    },
  },
  {
    id: 2,
    projectName: 'Smart Platform',
    revenue: 50000,
    startDate: '2025-09-01',
    endDate: '2025-10-31',
    workingDays: 61,
    pmName: 'John',
    plannedRate: 14,
    actualRate: 10,
    status: 'IN_PROGRESS',
    category: {
      id: 2,
      name: 'SM',
    },
  },
  {
    id: 3,
    projectName: 'Smart Platform',
    revenue: 50000,
    startDate: '2025-09-01',
    endDate: '2025-10-31',
    workingDays: 61,
    pmName: 'John',
    plannedRate: 14,
    actualRate: 10,
    status: STATUSES.PLANNED,
    category: {
      id: 1,
      name: 'SI',
    },
  },
  {
    id: 4,
    projectName: 'Movie Ticketing System',
    revenue: 50000,
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    workingDays: 92,
    pmName: 'Jay',
    plannedRate: 100,
    actualRate: 100,
    status: STATUSES.COMPLETED,
    category: {
      id: 2,
      name: 'SM',
    },
  },
  {
    id: 5,
    projectName: 'Movie Ticketing System1',
    revenue: 50000,
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    workingDays: 92,
    pmName: 'Jay',
    plannedRate: 100,
    actualRate: 100,
    status: STATUSES.IN_PROGRESS,
    category: {
      id: 2,
      name: 'SM',
    },
  },
];

const PAGE_SIZE = 10;

export default function ProjectTable() {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedProjects = projects.slice(startIndex, endIndex);

  return (
    <>
      {/*todo add widths for columns to prevent blinking between pages changed*/}
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
          {paginatedProjects.map((project) => (
            <Table.Tr key={project.id}>
              <Table.Td>
                <Button variant="transparent" className={styles.hoveredButton}> {project.projectName}</Button>
              </Table.Td>
              <Table.Td>{project.category.name}</Table.Td>
              <Table.Td className={styles.rightAlign}>
                <Button variant="transparent" className={styles.hoveredButton}>{project.revenue}</Button>
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
                  // onClick={() => setOpened(false)}
                  aria-label="Close sidebar"
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
      <div className={styles.paginationWrapper}>
        <Pagination
          total={Math.ceil(projects.length / PAGE_SIZE)}
          value={page}
          onChange={setPage}
          radius="xl"
          size="md"
        />
      </div>
    </>
  );
}

'use client';

import dayjs from 'dayjs';
import { Box, Table, TextInput, Title } from '@mantine/core';
import { Project } from '@/types/project';
import { CustomModal } from '../Modal/CustomModal';

type Props = {
  onClose: () => void;
  project?: Project;
};

export const ProjectRevenueModal = ({ onClose, project }: Props) => {
  if (!project) {
    return null;
  }

  const { projectName, revenue, startDate, endDate } = project;

  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const months = end.diff(start, 'month') + 1;
  const monthlyRevenue = Number((revenue / months).toFixed(2));

  const monthlyRows = Array.from({ length: months }, (_, i) => {
    const month = start.add(i, 'month').format('MMMM YYYY'); // Ex: September 2025
    return { month, amount: monthlyRevenue };
  });

  return (
      <CustomModal title="Project Monthly Sales" opened={!!project} onClose={onClose}>
        <Box mb="md">
          <TextInput label="Project name" value={projectName} readOnly />
        </Box>

        <Box>
          <Title order={5} mb="sm">
            Monthly breakdown
          </Title>
          <Table striped withTableBorder withColumnBorders highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: '60%' }}>Month</Table.Th>
                <Table.Th>Revenue</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {monthlyRows.map((row) => (
                  <Table.Tr key={row.month}>
                    <Table.Td>{row.month}</Table.Td>
                    <Table.Td>{row.amount.toLocaleString()}</Table.Td>
                  </Table.Tr>
              ))}
              <Table.Tr>
                <Table.Td style={{ fontWeight: 600 }}>Total</Table.Td>
                <Table.Td style={{ fontWeight: 600, color: '#228be6' }}>
                  {revenue.toLocaleString()}
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </Box>
      </CustomModal>
  );
};

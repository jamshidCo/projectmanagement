'use client';

import { useEffect, useState } from 'react';
import { Box, Flex, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { EMPTY_FIELD, REVERSED_DATE } from '@/constants/form';
import { STATUSES } from '@/constants/statuses';
import { editProject, useCategories } from '@/hooks/useProjects';
import { CreateProject, Project, ProjectStatus } from '@/types/project';
import { RefetchType } from '@/types/shared';
import { calculateDayDiff, calculatePlannedRate } from '@/utils/date';
import { CustomModal } from '../Modal/CustomModal';

type Props = {
  onClose: () => void;
  project?: Project;
  refetchProjects: RefetchType;
};

export const EditProjectModal = ({ onClose, project, refetchProjects }: Props) => {
  const [name, setName] = useState('');
  const [categoryName, setCategoryName] = useState<string>();
  const [revenue, setRevenue] = useState<number>();
  const [status, setStatus] = useState<ProjectStatus>();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [actualRate, setActualRate] = useState<number>();

  useEffect(() => {
    if (project) {
      setName(project.projectName);
      setCategoryName(project.category.name);
      setRevenue(project.revenue);
      setStatus(project.status);
      setStartDate(project.startDate);
      setEndDate(project.endDate);
      setActualRate(project.actualRate);
    }
  }, [project]);

  const [isLoading, setIsLoading] = useState(false);
  const [isTriedToSave, setIsTriedToSave] = useState(false);

  const { data: categories, isFetching } = useCategories();

  const days: number = calculateDayDiff(startDate, endDate);
  const plannedRate: number = calculatePlannedRate(startDate, endDate);

  const nameError: string | null = name ? null : EMPTY_FIELD;
  const categoryError: string | null = categoryName ? null : EMPTY_FIELD;
  const revenueError: string | null = revenue ? null : EMPTY_FIELD;
  const statusError: string | null = status ? null : EMPTY_FIELD;
  const startDateEror: string | null = days < 0 ? REVERSED_DATE : startDate ? null : EMPTY_FIELD;
  const endDateError: string | null = days < 0 ? REVERSED_DATE : endDate ? null : EMPTY_FIELD;
  const actualError: string | null = actualRate ? null : EMPTY_FIELD;

  const isFormValid: boolean =
    !nameError && !categoryError && !revenueError && !startDateEror && !endDateError;

  const clearFields = () => {
    setName('');
    setCategoryName(undefined);
    setRevenue(undefined);
    setStartDate(null);
    setEndDate(null);
  };

  const handleApply = async () => {
    setIsTriedToSave(true);
    setIsLoading(true);

    const categoryId: number | undefined = categories?.find((cat) => cat.name === categoryName)?.id;
    const projectId: number | undefined = project?.id;
    const actual: number | undefined = actualRate;

    if (
      isFormValid &&
      !!categoryId &&
      !!revenue &&
      !!startDate &&
      !!endDate &&
      !!projectId &&
      !!actual &&
      !!status
    ) {
      const editedProject: CreateProject = {
        projectName: name,
        categoryId,
        revenue,
        startDate,
        endDate,
        workingDays: days,
        pmName: project?.pmName,
        status,
        plannedRate,
        actualRate: actual,
      };
      await editProject(projectId, editedProject);
      onClose();
      clearFields();
      refetchProjects();
      setIsTriedToSave(false);
    }
    setIsLoading(false);
  };

  return (
    <CustomModal
      opened={!!project}
      onClose={onClose}
      onApply={handleApply}
      title="Modify project info"
      isLoading={isLoading || isFetching}
    >
      <>
        <Box h="80px">
          <TextInput
            label="Project name"
            placeholder="Type project name..."
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            error={isTriedToSave && nameError}
          />
        </Box>
        <Flex gap="md" align="start" h="80px">
          <NativeSelect
            label="Project category"
            value={categoryName}
            onChange={(event) => setCategoryName(event.currentTarget.value)}
            data={categories?.map(({ name }) => name)}
            error={isTriedToSave && categoryError}
          />
          <NumberInput
            label="Sales revenue"
            placeholder="Type project revenue"
            value={revenue}
            onChange={(event) => setRevenue(Number(event))}
            error={isTriedToSave && revenueError}
          />
          <NativeSelect
            label="Status"
            value={status}
            onChange={(event) => setStatus(event.currentTarget.value as ProjectStatus)}
            data={Object.values(STATUSES)}
            error={isTriedToSave && statusError}
          />
        </Flex>
        <Flex gap="md" align="start" h="90px">
          <DateInput
            label="Start date"
            placeholder="Choose start date"
            value={startDate}
            onChange={setStartDate}
            error={isTriedToSave && startDateEror}
          />
          <DateInput
            label="End date"
            placeholder="Choose end date"
            value={endDate}
            onChange={setEndDate}
            error={isTriedToSave && endDateError}
          />
          <TextInput label="Working days" value={days} disabled />
        </Flex>
        <Flex gap="md" align="start" h="60px">
          <NumberInput
            label="Plan %"
            placeholder="Project planned rate"
            value={plannedRate}
            disabled
          />
          <NumberInput
            label="Actual %"
            placeholder="Type project actual rate"
            value={actualRate}
            onChange={(event) => setActualRate(Number(event))}
            error={isTriedToSave && actualError}
          />
        </Flex>
      </>
    </CustomModal>
  );
};

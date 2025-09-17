'use client';

import { useState } from 'react';
import { Flex, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { EMPTY_FIELD, REVERSED_DATE } from '@/constants/form';
import { STATUSES } from '@/constants/statuses';
import { createProject, useCategories } from '@/hooks/useProjects';
import { Category, CreateProject } from '@/types/project';
import { RefetchType } from '@/types/shared';
import { calculateDayDiff } from '@/utils/date';
import { CustomModal } from '../Modal/CustomModal';

type Props = {
  opened: boolean;
  onClose: () => void;
  handleProjectCreated: () => void;
};

export const CreateProjectModal = ({ opened, onClose, handleProjectCreated }: Props) => {
  const [name, setName] = useState('');
  const [categoryName, setCategoryName] = useState<string>();
  const [revenue, setRevenue] = useState<number>();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { data: categories, isFetching } = useCategories();

  const days: number = calculateDayDiff(startDate, endDate);

  const nameError: string | null = name ? null : EMPTY_FIELD;
  const categoryError: string | null = categoryName ? null : EMPTY_FIELD;
  const revenueError: string | null = revenue ? null : EMPTY_FIELD;
  const startDateEror: string | null = days < 0 ? REVERSED_DATE : startDate ? null : EMPTY_FIELD;
  const endDateError: string | null = days < 0 ? REVERSED_DATE : endDate ? null : EMPTY_FIELD;

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
    setIsLoading(true);
    const category: Category | undefined = categories?.find((cat) => cat.name === categoryName);
    if (isFormValid && !!category && !!revenue && !!startDate && !!endDate) {
      const newProject: CreateProject = {
        projectName: name,
        categoryId: category.id,
        revenue,
        startDate,
        endDate,
        workingDays: days,
        status: STATUSES.PLANNED,
      };
      await createProject(newProject);
      onClose();
      clearFields();
      handleProjectCreated();
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      title="New Project"
      opened={opened}
      onClose={onClose}
      onApply={handleApply}
      isApplyDisabled={!isFormValid}
      isLoading={isLoading || isFetching}
    >
      <>
        <TextInput
          label="Project name"
          placeholder="Type project name..."
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          error={nameError}
        />
        <Flex gap="md">
          <NativeSelect
            label="Project category"
            value={categoryName}
            onChange={(event) => setCategoryName(event.currentTarget.value)}
            data={categories?.map(({ name }) => name)}
            error={categoryError}
          />
          <NumberInput
            label="Sales revenue"
            placeholder="Type project revenue"
            value={revenue}
            onChange={(event) => setRevenue(Number(event))}
            error={revenueError}
          />
        </Flex>
        <Flex gap="md" align="center">
          <DateInput
            label="Start date"
            placeholder="Choose start date"
            value={startDate}
            onChange={setStartDate}
            error={startDateEror}
          />
          <DateInput
            label="End date"
            placeholder="Choose end date"
            value={endDate}
            onChange={setEndDate}
            error={endDateError}
          />
          <TextInput label="Working days" value={days} disabled />
        </Flex>
      </>
    </CustomModal>
  );
};

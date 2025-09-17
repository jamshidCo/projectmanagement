'use client';

import { useEffect, useState } from 'react';
import { Box, Flex, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { EMPTY_FIELD, REVERSED_DATE } from '@/constants/form';
import { STATUSES } from '@/constants/statuses';
import { createProject, useCategories } from '@/hooks/useProjects';
import { Category, CreateProject } from '@/types/project';
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
  const [isTriedToSave, setIsTriedToSave] = useState(false);

  const { data: categories, isFetching } = useCategories();

  const days: number = calculateDayDiff(startDate, endDate);

  const nameError: string | null = name ? null : EMPTY_FIELD;
  const categoryError: string | null = categoryName ? null : EMPTY_FIELD;
  const revenueError: string | null = revenue ? null : EMPTY_FIELD;
  const startDateEror: string | null = days < 0 ? REVERSED_DATE : startDate ? null : EMPTY_FIELD;
  const endDateError: string | null = days < 0 ? REVERSED_DATE : endDate ? null : EMPTY_FIELD;

  const isFormValid: boolean =
    !nameError && !categoryError && !revenueError && !startDateEror && !endDateError;

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoryName(categories[0].name);
    }
  }, [categories]);

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
        actualRate: 0,
      };
      await createProject(newProject);
      onClose();
      clearFields();
      handleProjectCreated();
      setIsTriedToSave(false);
    }
    setIsLoading(false);
  };

  return (
    <CustomModal
      title="New Project"
      opened={opened}
      onClose={onClose}
      onApply={handleApply}
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
        </Flex>
        <Flex gap="md" align="start" h="70px">
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
      </>
    </CustomModal>
  );
};

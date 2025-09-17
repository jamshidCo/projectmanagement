'use client';

import { useEffect, useState } from 'react';
import { Flex, NativeSelect, NumberInput, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { STATUSES } from '@/constants/statuses';
import { CustomModal } from '../Modal/CustomModal';

import '@mantine/dates/styles.css';

type Props = {
  opened: boolean;
  onClose: () => void;
};

type Status = (typeof STATUSES)[keyof typeof STATUSES];

export const CreateProjectModal = ({ opened, onClose }: Props) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>(STATUSES.COMPLETED);
  const [revenue, setRevenue] = useState<number>();
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // todo refactor mock function
  const handleApply =() =>{}
  return (
    <CustomModal title="New Project" opened={opened} onClose={onClose} onApply={handleApply}>
      <>
        <TextInput
          label="Project name"
          placeholder="Type project name..."
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <Flex gap="md">
          <NativeSelect
            label="Project type"
            value={status}
            onChange={(event) => setStatus(event.currentTarget.value as Status)}
            data={Object.values(STATUSES)}
          />
          <NumberInput
            label="Sales revenue"
            placeholder="Type project revenue"
            value={revenue}
            onChange={(event) => setRevenue(Number(event))}
          />
        </Flex>
        <Flex gap="md" align="center">
          <DateInput
            label="From date"
            placeholder="Choose from date"
            value={fromDate}
            onChange={setFromDate}
          />
          <DateInput
            label="End date"
            placeholder="Choose end date"
            value={endDate}
            onChange={setEndDate}
          />
          <TextInput label="Working days" value={0} disabled />
        </Flex>
      </>
    </CustomModal>
  );
};

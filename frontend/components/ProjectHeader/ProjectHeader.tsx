'use client';

import { IconPlus } from '@tabler/icons-react';
import { Button, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CreateProjectModal } from '@/components/CreateProjectModal/CreateProjectModal';

export function ProjectHeader({ handleProjectCreated }: { handleProjectCreated: () => void }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <CreateProjectModal
        opened={opened}
        onClose={close}
        handleProjectCreated={handleProjectCreated}
      />

      <Group justify="space-between" mt="xl" mb="lg">
        <Title order={2}>Projects List</Title>

        <Button
          leftSection={<IconPlus size={18} />}
          variant="filled"
          color="blue"
          radius="md"
          onClick={open}
        >
          Add Project
        </Button>
      </Group>
    </>
  );
}

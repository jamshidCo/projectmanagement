'use client';

import { useDisclosure } from '@mantine/hooks';
import { CustomModal } from '../Modal/CustomModal';

export const EditProjectModal = () => {
  const [opened, { open, close }] = useDisclosure(true);

  return (
    <CustomModal opened={opened} onClose={close} onApply={close} title="Modify project info">
      <div>content...</div>
    </CustomModal>
  );
};

'use client';

import { ReactNode } from 'react';
import { Box, Button, Flex, LoadingOverlay, Modal } from '@mantine/core';

type Props = {
  opened: boolean;
  onClose: () => void;
  onApply?: () => void;
  title: string;
  children: ReactNode;
  isApplyDisabled?: boolean;
  isLoading?: boolean;
};

export const CustomModal = ({
  opened,
  onClose,
  onApply,
  title,
  children,
  isApplyDisabled,
  isLoading,
}: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      radius="lg"
      overlayProps={{ backgroundOpacity: 0.4, blur: 4 }}
      styles={{
        content: {
          padding: 0,
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        },
        body: { padding: '24px' },
        title: {
          // fontSize: '14px',
          fontWeight: '600',
          marginLeft: 24,
        },
        header: {
          borderBottom: '1px solid #f1f3f5',
        },
      }}
      title={title}
    >
      <LoadingOverlay visible={isLoading} />

      <Box px="md" pb="xl">
        {children}
      </Box>

      <Flex
        justify="flex-end"
        align="center"
        gap="sm"
        py="md"
        px="md"
        pb={0}
        style={{ borderTop: '1px solid #f1f3f5' }}
      >
        <Button variant="light" color="gray" onClick={onClose}>
          Cancel
        </Button>
        {onApply && (
          <Button onClick={onApply} disabled={isApplyDisabled} radius="md">
            Apply
          </Button>
        )}
      </Flex>
    </Modal>
  );
};

'use client';

import { ReactNode } from 'react';
import { Box, Button, Center, CloseButton, Flex, Modal, Title } from '@mantine/core';

type Props = {
  opened: boolean;
  onClose: () => void;
  onApply?: () => void;
  title: string;
  children: ReactNode;
};

export const CustomModal = ({ opened, onClose, onApply, title, children }: Props) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      withCloseButton={false}
      padding={0}
      size="xl"
    >
      <Flex bg="#9BB2D4" justify="space-between" align="center" direction="row" p="5px">
        <Box w="100%">
          <Center>
            <Title order={3} c="white">
              {title}
            </Title>
          </Center>
        </Box>
        <CloseButton onClick={onClose} radius="xs" bg="white" />
      </Flex>
      <Flex bg="#CAD9EF" p="xs" direction="column" gap="md">
        {children}
      </Flex>
      <Flex bg="#BDCDE3" justify="end" align="center" direction="row" p="5px" h="40px">
        {onApply && (
          <Button onClick={onApply} variant="default" color="gray" radius="md">
            APPLY
          </Button>
        )}
      </Flex>
    </Modal>
  );
};

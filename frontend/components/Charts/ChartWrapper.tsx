import { ReactNode } from 'react';
import { Box } from '@mantine/core';

export function ChartWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      p="md"
      bg="gray.0"
      w="100%"
      style={{ borderRadius: 12, boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}
    >
      {children}
    </Box>
  );
}

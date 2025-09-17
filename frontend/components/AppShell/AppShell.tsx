'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconChartPie, IconHome } from '@tabler/icons-react';
import { AppShell, Burger, NavLink } from '@mantine/core';
import styles from './AppShell.module.css';

const navItems = [
  { href: '/', label: 'Projects', icon: <IconHome size={20} stroke={1.5} /> },
  { href: '/dashboard', label: 'Dashboard', icon: <IconChartPie size={20} stroke={1.5} /> },
];

export default function MainAppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const pathname = usePathname();

  const activeNavItem = navItems.find((item) => item.href === pathname);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: collapsed ? 60 : 200,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <AppShell.Header className={styles.header}>
        <div className={styles.headerContent}>
          <Burger
            opened={!collapsed}
            onClick={() => setCollapsed((prevState) => !prevState)}
            size="sm"
          />
          <span className={styles.headerTitle}>{activeNavItem?.label || 'Offshoring POC'}</span>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="xs" className={styles.sidebar}>
        {navItems.map(({ href, label, icon }) => (
          <NavLink
            key={href}
            component={Link}
            href={href}
            label={collapsed ? null : label}
            leftSection={icon}
            active={pathname === href}
            classNames={{
              root: styles.navItem,
            }}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main className={styles.main}>{children}</AppShell.Main>
    </AppShell>
  );
}

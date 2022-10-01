import { Stack } from '@chakra-ui/react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import NavLink from './NavLink';
import NavSection from './NavSection';

export default function SideBarNav(): JSX.Element {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Overview">
        <NavLink icon={RiDashboardLine} href="/dashboard" title="Dashboard" />
        <NavLink icon={RiContactsLine} href="/users" title="Users" />
      </NavSection>

      <NavSection title="Blockchain Stats">
        <NavLink icon={RiInputMethodLine} href="/form" title="Forms" />
        <NavLink icon={RiGitMergeLine} href="/automation" title="Automation" />
      </NavSection>

      <NavSection title="Application Stats">
        <NavLink icon={RiInputMethodLine} href="/form" title="Forms" />
        <NavLink icon={RiGitMergeLine} href="/automation" title="Automation" />
      </NavSection>

      <NavSection title="Ecosystem">
        <NavLink icon={RiInputMethodLine} href="/form" title="Forms" />
        <NavLink icon={RiGitMergeLine} href="/automation" title="Automation" />
      </NavSection>
    </Stack>
  );
}

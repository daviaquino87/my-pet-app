import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { HeaderApp } from '../components/header';

export function LayoutPage() {
  return (
    <Flex direction="column" minH="100vh">
      <HeaderApp />
      <Flex flex={1} direction="column">
        <Outlet />
      </Flex>
    </Flex>
  );
}

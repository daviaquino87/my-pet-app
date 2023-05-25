import { IconButton, Tooltip } from '@chakra-ui/react';
import { MdLogout } from 'react-icons/md';

export function Logout() {
  return (
    <Tooltip label="Logout" placement="bottom">
      <IconButton
        icon={<MdLogout size="1rem" />}
        aria-label="Logout"
        _hover={{
          bg: 'red.100',
          color: 'red.500',
        }}
      />
    </Tooltip>
  );
}

import { HamburgerIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function ReportsLink() {
  return (
    <Link to="/reports">
      <Button
        bg="blue.50"
        color="blue.400"
        _hover={{
          bg: 'blue.100',
          color: 'blue.500',
        }}
        _dark={{
          bg: 'gray.700',
          color: 'white',
          _hover: {
            bg: 'gray.600',
          },
        }}
        rightIcon={<HamburgerIcon />}
      >
        Reports
      </Button>
    </Link>
  );
}

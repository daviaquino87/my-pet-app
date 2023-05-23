import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import { useUser } from '../../context/user-context';
import { Link } from 'react-router-dom';
import { ArrowBackIcon, HamburgerIcon } from '@chakra-ui/icons';
import { ToggleTheme } from './toggle-theme';

export function HeaderApp() {
  const { user } = useUser();

  const [canView] = useMediaQuery('(min-width: 425px)');

  return (
    <Flex
      h="16"
      w="full"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      borderBottom="1px"
      borderBottomColor="gray.200"
      _dark={{
        borderBottomColor: 'gray.700',
      }}
    >
      <Flex alignItems="center" gap={4}>
        {canView && (
          <Image
            src={process.env.PUBLIC_URL + '/logo-cat.png'}
            title="Logo cat"
            w={10}
            h={10}
          />
        )}
        {canView ? (
          <Text fontWeight="medium" fontSize={18}>
            {user.name}
          </Text>
        ) : (
          <Avatar
            bg="orange.50"
            color="orange.400"
            size="sm"
            border="1px"
            name={user.name}
            w={8}
            h={8}
          />
        )}
      </Flex>
      <Flex gap={4} alignItems="center">
        <ToggleTheme />
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
        <Tooltip label="Logout" placement="bottom">
          <IconButton
            aria-label="Logout"
            _hover={{
              bg: 'red.100',
              color: 'red.500',
            }}
            icon={<ArrowBackIcon />}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
}

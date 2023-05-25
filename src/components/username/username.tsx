import { Avatar, Text, useMediaQuery } from '@chakra-ui/react';
import { useUser } from '../../context/user-context';

export function Username() {
  const { user } = useUser();
  const [canView] = useMediaQuery('(min-width: 425px)');

  return (
    <>
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
    </>
  );
}

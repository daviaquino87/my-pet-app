import { Text, useMediaQuery } from '@chakra-ui/react';
import { useUser } from '../../context/user-context';

export function Username() {
  const { user } = useUser();
  const [canView] = useMediaQuery('(min-width: 425px)');

  if (!canView) return null;

  return (
    <Text fontWeight="medium" fontSize={18}>
      {user.name}
    </Text>
  );
}

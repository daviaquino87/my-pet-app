import { Text } from '@chakra-ui/react';
import { useUser } from '../../context/user-context';
import { useIsMobile } from '../../hooks/use-is-mobile';

export function Username() {
  const { user } = useUser();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <Text fontWeight="medium" fontSize={18}>
      {user.name}
    </Text>
  );
}

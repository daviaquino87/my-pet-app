import { AddIcon } from '@chakra-ui/icons';
import { ChakraProps, IconButton, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useIsMobile } from '../../hooks/use-is-mobile';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const btnSizes = {
  sm: 14,
  md: 16,
  lg: 20,
};

export function ButtonAddLink({ size = 'md' }: Props) {
  const btnSize = btnSizes[size];

  const isMobile = useIsMobile();

  const styles = isMobile
    ? {
        bottom: 100,
        position: 'fixed',
      }
    : {};

  return (
    <Link as={RouterLink} to="/new" {...(styles as ChakraProps)}>
      <IconButton
        rounded="full"
        aria-label="Add spending"
        icon={<AddIcon />}
        width={btnSize}
        height={btnSize}
        bg="orange.300"
        shadow="0 0 0 0.5rem var(--chakra-colors-orange-100)"
        color="gray.800"
        _hover={{
          bg: 'orange.400',
        }}
      />
    </Link>
  );
}

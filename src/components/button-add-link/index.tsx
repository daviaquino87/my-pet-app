import { AddIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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

  return (
    <Link to="/new">
      <IconButton
        rounded="full"
        aria-label="Add spending"
        icon={<AddIcon />}
        width={btnSize}
        height={btnSize}
        bg="orange.300"
        shadow="0 0 0 0.5rem var(--chakra-colors-orange-100)"
        _hover={{
          bg: 'orange.400',
        }}
      />
    </Link>
  );
}

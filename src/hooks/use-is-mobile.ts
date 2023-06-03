import { useMediaQuery } from '@chakra-ui/react';

export function useIsMobile() {
  const [isMobile] = useMediaQuery('(max-width: 426px)');

  return isMobile;
}

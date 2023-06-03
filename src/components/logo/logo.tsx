import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../../hooks/use-is-mobile';

export function Logo() {
  const isMobile = useIsMobile();

  const size = isMobile ? 9 : 10;

  return (
    <Link to="/">
      <Image
        flexShrink={0}
        w={size}
        h={size}
        transition="all 200ms"
        src={process.env.PUBLIC_URL + '/logo-cat.png'}
      />
    </Link>
  );
}

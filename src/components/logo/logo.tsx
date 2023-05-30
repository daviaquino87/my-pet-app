import { Image, useMediaQuery } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function Logo() {
  const [canView] = useMediaQuery('(min-width: 425px)');

  const size = canView ? 9 : 10;

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

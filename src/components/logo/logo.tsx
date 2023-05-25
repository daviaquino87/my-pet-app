import { Image, useMediaQuery } from '@chakra-ui/react';

export function Logo() {
  const [canView] = useMediaQuery('(min-width: 425px)');

  if (!canView) return null;

  return (
    <Image
      src={process.env.PUBLIC_URL + '/logo-cat.png'}
      title="Logo cat"
      w={10}
      h={10}
    />
  );
}

import { useMediaQuery } from '@chakra-ui/react';
import LottiePlayer from 'lottie-react';
import cat from '../../lottie/14592-loader-cat.json';
export function Logo() {
  const [canView] = useMediaQuery('(min-width: 425px)');

  if (!canView) return null;

  return (
    <LottiePlayer
      animationData={cat}
      color="red"
      style={{
        height: 64,
        width: 86,
      }}
    />
  );
}

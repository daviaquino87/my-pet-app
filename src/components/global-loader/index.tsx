import { Center, Spinner } from '@chakra-ui/react';

export function GlobalLoader() {
  return (
    <Center minH="100vh">
      <Spinner />
    </Center>
  );
}

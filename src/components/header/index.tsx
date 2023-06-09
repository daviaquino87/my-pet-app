import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  logo: ReactNode;
  user: ReactNode;
  actions: ReactNode;
}

export function HeaderApp({ logo, user, actions }: Props) {
  return (
    <Flex
      h="16"
      w="full"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      borderBottom="1px"
      borderBottomColor="gray.200"
      _dark={{
        borderBottomColor: "gray.700",
      }}
    >
      <Flex alignItems="center" gap={4}>
        {logo}
        {user}
      </Flex>
      <Flex gap={4} alignItems="center">
        {actions}
      </Flex>
    </Flex>
  );
}

import { ArrowBackIcon } from "@chakra-ui/icons";
import { HStack, Heading, IconButton } from "@chakra-ui/react";
import { useBack } from "../../hooks/use-back";

interface Props {
  title: string;
}

export function PageTitle({ title }: Props) {
  const back = useBack();
  return (
    <HStack spacing="5">
      <IconButton onClick={back} icon={<ArrowBackIcon />} aria-label="Voltar" />
      <Heading size="md">{title}</Heading>
    </HStack>
  );
}

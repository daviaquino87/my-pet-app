import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Container,
  HStack,
  Heading,
  IconButton,
  Stack,
  Input,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { CurrencyInput } from 'react-currency-mask';
export function NewSpendingPage() {
  return (
    <Container maxW="96" pt={20}>
      <Stack spacing={10}>
        <HStack>
          <IconButton icon={<ArrowBackIcon />} aria-label="Voltar" />
          <Heading size="md">Nova despesa</Heading>
        </HStack>

        <CurrencyInput
          onChangeValue={(
            event: ChangeEvent,
            originalValue: any,
            maskedValue: any
          ) => {
            console.log(event, originalValue, maskedValue);
          }}
          InputElement={<Input autoFocus placeholder="Valor" />}
        />
      </Stack>
    </Container>
  );
}

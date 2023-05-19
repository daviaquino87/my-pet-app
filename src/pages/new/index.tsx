import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Container,
  HStack,
  Heading,
  IconButton,
  Stack,
  Input,
  Button,
} from '@chakra-ui/react';
import { Ref, forwardRef } from 'react';
import { CurrencyInput } from 'react-currency-mask';
import { Controller, useForm } from 'react-hook-form';
interface CustomCurrencyInputProps {
  onChange: (value: number) => void;
}

const CustomCurrencyInput = forwardRef(
  (
    { onChange, ...props }: CustomCurrencyInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <CurrencyInput
        {...props}
        ref={ref}
        defaultValue={0}
        onChangeValue={(originalValue: any) => {
          onChange(originalValue);
        }}
        InputElement={<Input placeholder="R$ Valor" />}
        currency="BRL"
      />
    );
  }
);

export function NewSpendingPage() {
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      price: 0,
    },
  });

  const submit = (values: any) => {
    console.log('debug:name', values);
  };
  return (
    <Container maxW="96" pt={20}>
      <Stack spacing={10}>
        <HStack spacing="5">
          <IconButton icon={<ArrowBackIcon />} aria-label="Voltar" />
          <Heading size="md">Nova despesa</Heading>
        </HStack>

        <Stack as="form" spacing="10" onSubmit={handleSubmit(submit)}>
          <Controller
            control={control}
            name="price"
            render={({ field }) => <CustomCurrencyInput {...field} />}
          />

          <Button type="submit" colorScheme="green">
            Salvar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

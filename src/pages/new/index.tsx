import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

import { Calendar } from '../../components/calendar';
import { CustomCurrencyInput } from '../../components/input-currency';
import { PageTitle } from '../../components/page-title';
import { useToast } from '../../hooks/use-toast';
import { privateApi } from '../../services/api';
import { EndpointsEnum } from '../../enum/endpoints';

interface IFormState {
  price: string | number;
  date: Date | string;
}

export function NewSpendingPage() {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IFormState>({
    defaultValues: {
      price: '',
      date: new Date(),
    },
  });

  const toast = useToast();

  const submit = async (values: IFormState) => {
    if (!values.price) {
      setError('price', { message: 'Insira um valor válido' });
      return;
    }

    await privateApi.post(EndpointsEnum.SPENDINGS, values);

    reset();

    toast.success({ title: 'Criado com sucesso' });
  };

  return (
    <Container maxW="96" pt={16}>
      <Stack spacing={10}>
        <PageTitle title="Nova despesa" />
        <Stack as="form" spacing="10" onSubmit={handleSubmit(submit)}>
          <Stack>
            <FormControl isInvalid={!!errors.price?.message}>
              <Controller
                control={control}
                name="price"
                rules={{
                  required: 'Campo obrigatório',
                }}
                render={({ field }) => <CustomCurrencyInput {...field} />}
              />
              <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
            </FormControl>
          </Stack>

          <Controller
            control={control}
            name="date"
            render={({ field }) => <Calendar {...field} />}
          />

          <Button type="submit" colorScheme="green">
            Salvar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

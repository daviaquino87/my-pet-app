import { forwardRef, useState } from 'react';

import {
  Container,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { CalendarPanel } from 'chakra-dayzed-datepicker';

import { CustomCurrencyInput } from './input-currenct';
import { endOfDay, format } from 'date-fns';
import { privateApi } from '../../services/api';
import { useToast } from '../../hooks/use-toast';
import { PageTitle } from '../../components/page-title';

const Calendar = forwardRef((rest: any, ref: any) => {
  const demoDate = new Date();
  const [date, setDate] = useState(demoDate);

  const handleOnDateSelected = (props: {
    date: Date;
    nextMonth: boolean;
    prevMonth: boolean;
    selectable: boolean;
    selected: boolean;
    today: boolean;
  }) => {
    const { date } = props;
    if (date instanceof Date && !isNaN(date.getTime())) {
      setDate(date);
      rest.onChange(format(endOfDay(date), "yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }
  };

  return (
    <CalendarPanel
      {...rest}
      dayzedHookProps={{
        selected: date,
        onDateSelected: handleOnDateSelected,
      }}
      configs={{
        dateFormat: 'yyyy-MM-dd',
        monthNames: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ],
        dayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        firstDayOfWeek: 0,
      }}
    />
  );
});

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

    await privateApi.post('/spendings', values);

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

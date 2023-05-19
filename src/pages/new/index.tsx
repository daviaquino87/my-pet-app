import { forwardRef, useState } from 'react';

import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Container,
  HStack,
  Heading,
  IconButton,
  Stack,
  Button,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { CalendarPanel } from 'chakra-dayzed-datepicker';

import { CustomCurrencyInput } from './input-currenct';
import { endOfDay, format } from 'date-fns';
import { privateApi } from '../../services/api';
import { useToast } from '../../hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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

export function NewSpendingPage() {
  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      price: '',
      date: new Date(),
    },
  });

  const navigate = useNavigate();

  const toast = useToast();

  const submit = async (values: any) => {
    console.log('debug:name', values);

    await privateApi.post('/spendings', values);

    reset();

    toast.success({ title: 'Criado com sucesso' });
  };
  return (
    <Container maxW="96" pt={20}>
      <Stack spacing={10}>
        <HStack spacing="5">
          <IconButton
            onClick={() => navigate(-1)}
            icon={<ArrowBackIcon />}
            aria-label="Voltar"
          />
          <Heading size="md">Nova despesa</Heading>
        </HStack>

        <Stack as="form" spacing="10" onSubmit={handleSubmit(submit)}>
          <Controller
            control={control}
            name="price"
            render={({ field }) => <CustomCurrencyInput {...field} />}
          />

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

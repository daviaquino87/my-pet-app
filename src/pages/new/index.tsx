import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { Calendar } from '../../components/calendar';
import { CustomCurrencyInput } from '../../components/input-currency';
import { PageTitle } from '../../components/page-title';
import { useToast } from '../../hooks/use-toast';
import { privateApi } from '../../services/api';
import { EndpointsEnum } from '../../enum/endpoints';
import { useIsMobile } from '../../hooks/use-is-mobile';
import { format } from 'date-fns';
import { useState } from 'react';
import { CalendarIcon } from '@chakra-ui/icons';

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
    getValues,
    formState: { errors },
  } = useForm<IFormState>({
    defaultValues: {
      price: '',
      date: new Date(),
    },
  });

  const toast = useToast();

  const isMobile = useIsMobile();

  // only for Mobile
  const [showCalendarDialog, setShowCalendarDialog] = useState(false);

  useWatch({ control });

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

          {isMobile ? (
            <Button
              onClick={() => setShowCalendarDialog(true)}
              rightIcon={
                <CalendarIcon
                  color="gray.600"
                  _dark={{
                    color: 'gray.500',
                  }}
                />
              }
            >
              dia {format(new Date(getValues().date), 'dd')}
            </Button>
          ) : (
            <Controller
              control={control}
              name="date"
              render={({ field }) => <Calendar {...field} />}
            />
          )}

          <Modal
            isCentered
            isOpen={showCalendarDialog}
            onClose={() => setShowCalendarDialog(false)}
            size="full"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Selecionar data</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <Calendar key={String(showCalendarDialog)} {...field} />
                  )}
                />
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={() => setShowCalendarDialog(false)}>
                  Cancaler
                </Button>
                <Button
                  bg="orange.300"
                  color="gray.800"
                  _hover={{
                    bg: 'orange.400',
                  }}
                  onClick={() => setShowCalendarDialog(false)}
                >
                  Concluir
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Button type="submit" colorScheme="green">
            Salvar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

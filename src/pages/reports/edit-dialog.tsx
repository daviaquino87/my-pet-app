import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { CustomCurrencyInput } from '../../components/input-currency';
import { Controller, useForm } from 'react-hook-form';
import { ISpending } from '../../types/spending';

export type SpendingBaseType = Pick<ISpending, 'id' | 'price'>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  price: string | number;
  date: string;
  onEdit: (values: SpendingBaseType) => void;
}

export function EditDialog({ isOpen, onClose, price, date, onEdit }: Props) {
  const initialRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit } = useForm<SpendingBaseType>({
    mode: 'onChange',
  });

  const submit = (values: SpendingBaseType) => {
    onEdit(values);
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(submit)}>
        <ModalHeader>Editar despesa</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Preço</FormLabel>
            <Controller
              control={control}
              name="price"
              defaultValue={Number(price)}
              render={({ field }) => <CustomCurrencyInput {...field} />}
            />
          </FormControl>

          {/* TODO: enable this when the API accept date */}
          {/* <FormControl mt={4}>
            <FormLabel>Data</FormLabel>
            <Controller
              control={control}
              name="date"
              defaultValue={date}
              render={({ field: { ref, ...state } }) => <Calendar {...state} />}
            />
          </FormControl> */}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            color="gray.800"
            bg="orange.300"
            _hover={{
              bg: 'orange.400',
            }}
            type="submit"
            ml={3}
          >
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

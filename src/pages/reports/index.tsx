import {
  Center,
  Container,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';

import { ISpendingResponse, ISpending } from '../../types/spending';
import { privateApi } from '../../services/api';
import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { currency } from '../../utils/currency';
import { format } from 'date-fns';
import { ConfirmDeleteDialog } from '../../components/confirm-delete-dialog';
import { PageTitle } from '../../components/page-title';
import { CustomCurrencyInput } from '../../components/input-currency';
import { Calendar } from '../../components/calendar';
import { EndpointsEnum } from '../../enum/endpoints';

async function fetchReports(page = 1): Promise<ISpendingResponse> {
  const params = { page };
  const response = await privateApi.get<ISpendingResponse>(
    EndpointsEnum.SPENDINGS,
    {
      params,
    }
  );

  return response.data;
}

type EditSpendingType = Pick<ISpending, 'id' | 'price' | 'date'>;

interface SpendingItemProps extends EditSpendingType {
  onOpenConfirmDelete: (id: string) => void;
  onOpenEdit: (item: EditSpendingType) => void;
  isEditing: boolean;
}

function SpendingItem({
  id,
  date,
  price,
  onOpenConfirmDelete,
  onOpenEdit,
}: SpendingItemProps) {
  return (
    <Tr key={id}>
      <Td>{format(new Date(date), 'dd/MM/yyyy')}</Td>
      <Td isNumeric>{currency(price)}</Td>
      <Td textAlign="center">
        <HStack>
          <IconButton
            size="xs"
            aria-label="Remover item"
            icon={<DeleteIcon />}
            _hover={{
              bg: 'red.100',
              color: 'red.500',
            }}
            onClick={() => onOpenConfirmDelete(id)}
          />

          <IconButton
            size="xs"
            aria-label="Editar item"
            icon={<EditIcon />}
            _hover={{
              bg: 'orange.100',
              color: 'orange.500',
            }}
            onClick={() => {
              onOpenEdit({ id, price, date });
            }}
          />
        </HStack>
      </Td>
    </Tr>
  );
}

export function ReportsPage() {
  // TODO: change this to Spending object to reuse by edit dialog
  const [selectedSpendingId, setSelectedSpendingId] = useState<null | string>(
    null
  );

  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ['reports', page],
    () => fetchReports(page),
    {
      keepPreviousData: true,
    }
  );

  const [selectedSpending, setSelectedSpending] = useState<null | ISpending>(
    null
  );

  const initialRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      return privateApi.delete(`${EndpointsEnum.DELETE_SPENDING}/${id}`);
    },
    onSuccess: () => {
      setSelectedSpendingId(null);
      queryClient.invalidateQueries(['reports']);
    },
  });

  const handleCloseConfirm = () => {
    setSelectedSpendingId(null);
  };

  const handleRemove = () => {
    if (selectedSpendingId) {
      removeMutation.mutate(selectedSpendingId);
    }
  };

  const handleOpenConfirm = (id: string) => {
    setSelectedSpendingId(id);
  };

  const handleConfirm = () => {
    handleRemove();
  };

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const isPreviousDisabled = page === 1;
  const isNextDisabled = data?.spendings.length !== 10;

  return (
    <Container maxW="container.md" pt={14} pb={10}>
      <Stack spacing={10}>
        <PageTitle title="Relatório" />

        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Data</Th>
                    <Th isNumeric>Preço</Th>
                    <Th w="80px"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.spendings.map((item) => (
                    <SpendingItem
                      key={item.id}
                      id={item.id}
                      date={item.date}
                      price={item.price}
                      onOpenConfirmDelete={handleOpenConfirm}
                      onOpenEdit={() => setSelectedSpending(item)}
                      isEditing={Boolean(selectedSpending)}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <HStack justifyContent="space-between">
              <Tooltip label="Em breve" placement="top">
                <Button isDisabled size="sm">
                  Download
                </Button>
              </Tooltip>
              <HStack>
                <Button
                  size="sm"
                  leftIcon={<ArrowLeftIcon fontSize={10} />}
                  onClick={handlePrevious}
                  isDisabled={isPreviousDisabled}
                >
                  Anterior
                </Button>
                <Button
                  size="sm"
                  rightIcon={<ArrowRightIcon fontSize={10} />}
                  onClick={handleNext}
                  isDisabled={isNextDisabled}
                >
                  Próximo
                </Button>
              </HStack>
            </HStack>
          </>
        )}
      </Stack>
      <ConfirmDeleteDialog
        isOpen={!!selectedSpendingId}
        onClose={handleCloseConfirm}
        onOK={handleConfirm}
        title="Remover despesa"
        description="Você tem certeza que deseja remover?"
      />

      <Modal
        initialFocusRef={initialRef}
        isOpen={Boolean(selectedSpending)}
        onClose={() => setSelectedSpending(null)}
      >
        <ModalOverlay />
        <ModalContent w="fit-content">
          <ModalHeader>Editar despesa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Preço</FormLabel>
              <CustomCurrencyInput
                value={String(selectedSpending?.price)}
                onChange={() => {}}
                ref={initialRef}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Data</FormLabel>
              <Calendar value={selectedSpending?.date} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => setSelectedSpending(null)}>Cancelar</Button>
            <Button colorScheme="blue" ml={3}>
              Editar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

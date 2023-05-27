import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';
import {
  Button,
  Center,
  Container,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { ConfirmDeleteDialog } from '../../components/confirm-delete-dialog';
import { PageTitle } from '../../components/page-title';
import { EndpointsEnum } from '../../enum/endpoints';
import { privateApi } from '../../services/api';
import { ISpending, ISpendingResponse } from '../../types/spending';
import { currency } from '../../utils/currency';
import { EditDialog, SpendingBaseType } from './edit-dialog';
import { OnDateSelected, RangeCalendarPanel } from 'chakra-dayzed-datepicker';

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
  const [selectedSpendingId, setSelectedSpendingId] = useState<null | string>(
    null
  );

  const [selectedSpending, setSelectedSpending] = useState<null | ISpending>(
    null
  );

  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ['reports', page],
    () => fetchReports(page),
    {
      keepPreviousData: true,
    }
  );

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

  const handleEdit = async (values: SpendingBaseType) => {
    await privateApi.put(
      `${EndpointsEnum.UPDATE_SPENDING}/${selectedSpending?.id}`,
      values
    );
    setSelectedSpending(null);
    queryClient.invalidateQueries(['reports']);
  };

  const isPreviousDisabled = page === 1;
  const isNextDisabled = data?.spendings.length !== 10;

  const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
    let newDates = [...selectedDates];
    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        let firstTime = selectedDates[0];
        if (firstTime < date) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
        setSelectedDates(newDates);
        return;
      }

      if (newDates.length === 2) {
        setSelectedDates([date]);
        return;
      }
    } else {
      newDates.push(date);
      setSelectedDates(newDates);
    }
  };

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
              <Button size="sm" onClick={onOpen}>
                Download
              </Button>
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

      <EditDialog
        key={selectedSpending?.id}
        isOpen={!!selectedSpending}
        onClose={() => setSelectedSpending(null)}
        price={String(selectedSpending?.price)}
        date={String(selectedSpending?.date)}
        onEdit={handleEdit}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exportar relatório</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RangeCalendarPanel
              selected={selectedDates}
              dayzedHookProps={{
                showOutsideDays: false,
                onDateSelected: handleOnDateSelected,
                selected: selectedDates,
                monthsToDisplay: 2,
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
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancaler
            </Button>
            <Button isDisabled colorScheme="orange">
              Exportar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

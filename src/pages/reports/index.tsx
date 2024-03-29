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
  useDisclosure,
} from '@chakra-ui/react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useState } from 'react';
import { ConfirmDeleteDialog } from './actions/delete-dialog';
import { PageTitle } from '../../components/page-title';
import { EndpointsEnum } from '../../enum/endpoints';
import { privateApi } from '../../services/api';
import { ISpending, ISpendingResponse } from '../../types/spending';
import { currency } from '../../utils/currency';
import { EditDialog, SpendingBaseType } from './actions/edit-dialog';
import { ExportDialog } from './actions/export-dialog';

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

  const [selectedSpending, setSelectedSpending] =
    useState<null | EditSpendingType>(null);

  const {
    isOpen: isExportDialogOpen,
    onOpen: onOpenExportDialog,
    onClose: onCloseExportDialog,
  } = useDisclosure();

  const {
    isOpen: isEditDialogOpen,
    onOpen: onOpenEditDialog,
    onClose: onCloseEditDialog,
  } = useDisclosure();

  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ['reports', page],
    () => fetchReports(page),
    {
      keepPreviousData: true,
    }
  );

  const queryClient = useQueryClient();

  const { isLoading: isLoadingRemove, mutate: handleRemoveSpending } =
    useMutation(
      async (id: string) => {
        return privateApi.delete(`${EndpointsEnum.DELETE_SPENDING}/${id}`);
      },
      {
        onSuccess: () => {
          setSelectedSpendingId(null);
          queryClient.invalidateQueries(['reports']);
        },
      }
    );

  const handleCloseConfirm = () => {
    setSelectedSpendingId(null);
  };

  const handleRemove = () => {
    if (selectedSpendingId) {
      handleRemoveSpending(selectedSpendingId);
    }
  };

  const handleOpenConfirm = (id: string) => {
    setSelectedSpendingId(id);
  };

  const handleOpenEdit = ({ id, price, date }: EditSpendingType) => {
    setSelectedSpending({ id, price, date });
    onOpenEditDialog();
  };

  const handleOnCloseEdit = () => {
    onCloseEditDialog();
    setSelectedSpending(null);
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

  const { isLoading: isLoadingEdit, mutate: handleEditSpending } = useMutation(
    async ({ id, price }: Omit<SpendingBaseType, 'date'>) =>
      await privateApi.put(
        `${EndpointsEnum.UPDATE_SPENDING}/${selectedSpending?.id}`,
        {
          id,
          // TODO: remove this Number, always be number
          price: Number(price),
        }
      ),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['reports']);
        handleOnCloseEdit();
      },
    }
  );

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
              <Table>
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
                      onOpenEdit={handleOpenEdit}
                      isEditing={Boolean(selectedSpending)}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <HStack justifyContent="space-between">
              <Button colorScheme="telegram" onClick={onOpenExportDialog}>
                Download
              </Button>
              <HStack>
                <Button
                  leftIcon={<ArrowLeftIcon fontSize={10} />}
                  onClick={handlePrevious}
                  isDisabled={isPreviousDisabled}
                >
                  Anterior
                </Button>
                <Button
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
        isLoading={isLoadingRemove}
      />

      <EditDialog
        isOpen={isEditDialogOpen}
        onClose={handleOnCloseEdit}
        price={String(selectedSpending?.price)}
        onEdit={handleEditSpending}
        isLoading={isLoadingEdit}
        id={String(selectedSpending?.id)}
      />

      <ExportDialog isOpen={isExportDialogOpen} onClose={onCloseExportDialog} />
    </Container>
  );
}

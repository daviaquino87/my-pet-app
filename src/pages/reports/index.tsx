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
  Input,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
} from '@chakra-ui/icons';

import { ISpendingResponse, ISpending } from '../../types/spending';
import { privateApi } from '../../services/api';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { currency } from '../../utils/currency';
import { format } from 'date-fns';
import { ConfirmDeleteDialog } from '../../components/confirm-delete-dialog';
import { PageTitle } from '../../components/page-title';

async function fetchReports(page = 1): Promise<ISpendingResponse> {
  const params = { page };
  const response = await privateApi.get<ISpendingResponse>('/spendings', {
    params,
  });

  return response.data;
}

interface SpendingItemProps extends Pick<ISpending, 'id' | 'price' | 'date'> {
  onOpenConfirmDelete: (id: string) => void;
}

function SpendingItem({
  id,
  date,
  price,
  onOpenConfirmDelete,
}: SpendingItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Tr key={id}>
      <Td>{format(new Date(date), 'dd/MM/yyyy')}</Td>
      <Td isNumeric>
        {isEditing ? <Input size="sm" defaultValue={price} /> : currency(price)}
      </Td>
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

          {!isEditing && (
            <IconButton
              size="xs"
              aria-label="Editar item"
              icon={<EditIcon />}
              _hover={{
                bg: 'orange.100',
                color: 'orange.500',
              }}
              onClick={() => setIsEditing(true)}
            />
          )}

          {isEditing && (
            <IconButton
              size="xs"
              aria-label="Editar item"
              icon={<CheckIcon />}
              _hover={{
                bg: 'green.100',
                color: 'green.500',
              }}
              onClick={() => setIsEditing(false)}
            />
          )}
        </HStack>
      </Td>
    </Tr>
  );
}

export function ReportsPage() {
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

  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      return privateApi.delete(`/spendings/delete/${id}`);
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
                      id={item.id}
                      date={item.date}
                      price={item.price}
                      onOpenConfirmDelete={handleOpenConfirm}
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
    </Container>
  );
}

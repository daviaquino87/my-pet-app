import {
  Center,
  Container,
  HStack,
  Heading,
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DeleteIcon,
} from '@chakra-ui/icons';

import { ISpendingResponse } from '../../types/spending';
import { privateApi } from '../../services/api';
import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { currency } from '../../utils/currency';
import { useBack } from '../../hooks/use-back';
import { format } from 'date-fns';

async function fetchReports(page = 1): Promise<ISpendingResponse> {
  const params = { page };
  const response = await privateApi.get<ISpendingResponse>('/spendings', {
    params,
  });

  return response.data;
}

export function ReportsPage() {
  const back = useBack();

  const cancelRef = useRef(null);

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
        <HStack spacing="5">
          <IconButton
            onClick={back}
            icon={<ArrowBackIcon />}
            aria-label="Voltar"
          />
          <Heading size="md">Relatório</Heading>
        </HStack>
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
                    <Tr key={item.id}>
                      <Td>{format(new Date(item.date), 'dd/MM/yyyy')}</Td>
                      <Td isNumeric>{currency(item.price)}</Td>
                      <Td textAlign="center">
                        <IconButton
                          size="xs"
                          aria-label="Remover item"
                          icon={<DeleteIcon />}
                          _hover={{
                            bg: 'red.100',
                            color: 'red.500',
                          }}
                          onClick={() => handleOpenConfirm(item.id)}
                        />
                      </Td>
                    </Tr>
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
      <AlertDialog
        isOpen={!!selectedSpendingId}
        leastDestructiveRef={cancelRef}
        onClose={handleCloseConfirm}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remover despesa
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza? Você não pode desfazer esta ação.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCloseConfirm}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                Remover
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}

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
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DeleteIcon,
} from '@chakra-ui/icons';

import { ISpendingResponse } from '../../types/spending';
import { privateApi } from '../../services/api';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { currency } from '../../utils/currency';
import { useBack } from '../../hooks/use-back';

async function fetchReports(page = 1): Promise<ISpendingResponse> {
  const params = { page };
  const response = await privateApi.get<ISpendingResponse>('/spendings', {
    params,
  });

  return response.data;
}

export function ReportsPage() {
  const back = useBack();

  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery(
    ['reports', page],
    () => fetchReports(page),
    {
      keepPreviousData: true,
    }
  );

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
                      <Td>{new Date(item.date).toLocaleDateString()}</Td>
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
    </Container>
  );
}

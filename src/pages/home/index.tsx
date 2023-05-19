import { Box, Flex, Heading, IconButton, Spinner } from '@chakra-ui/react';
import { privateApi } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import { AddIcon } from '@chakra-ui/icons';
import { currency } from '../../utils/currency';
import { Link } from 'react-router-dom';

interface IBalanceResponse {
  balance: number;
}

async function fetchSpendings() {
  const req = await privateApi.get('/users/balance');
  return req.data;
}

export function HomePage() {
  const { data } = useQuery<IBalanceResponse>(['spendings'], () =>
    fetchSpendings()
  );

  return (
    <Flex align="center" pt={52} direction="column">
      <Box h="24">
        {data ? (
          <Heading size="3xl">{currency(Number(data?.balance || 0))}</Heading>
        ) : (
          <Spinner />
        )}
      </Box>

      <Link to="/new">
        <IconButton
          rounded="full"
          aria-label="Add spending"
          icon={<AddIcon />}
          width={16}
          height={16}
          bg="orange.300"
          shadow="0 0 0 0.5rem var(--chakra-colors-orange-100)"
          _hover={{
            bg: 'orange.400',
          }}
        />
      </Link>
    </Flex>
  );
}

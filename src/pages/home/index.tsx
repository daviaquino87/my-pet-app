import {
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { useUser } from '../../context/user-context';
import { privateApi } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import { AddIcon } from '@chakra-ui/icons';

// interface ISpending {
//   created_at: string;
//   date: string;
//   id: string;
//   price: number;
//   user_id: string;
// }

// interface ISpendingResponse {
//   spendings: ISpending[];
// }

interface IBalanceResponse {
  balance: number;
}

async function fetchSpendings() {
  const req = await privateApi.get('/users/balance');
  return req.data;
}

export function HomePage() {
  const { user } = useUser();

  const { data } = useQuery<IBalanceResponse>(['spendings'], () =>
    fetchSpendings()
  );

  // const create = () => {
  //   privateApi.post('/spendings', {
  //     price: 150.21,
  //     date: '2023-04-12 13:23:32',
  //   });
  // };
  return (
    <Flex direction="column">
      <Flex
        h="16"
        bg="white"
        w="full"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        borderBottom="1px"
        borderBottomColor="gray.200"
      >
        <Image
          src={process.env.PUBLIC_URL + '/logo-cat.png'}
          title="Logo cat"
          w={10}
          h={10}
        />
        <Text fontWeight="medium" fontSize={18}>
          {user.name}
        </Text>
      </Flex>
      <Flex direction="column">
        <Center>
          <Heading>{data?.balance}</Heading>
        </Center>
        <Center>
          <IconButton
            rounded="full"
            aria-label="Add spending"
            icon={<AddIcon />}
          />
        </Center>
      </Flex>
    </Flex>
  );
}

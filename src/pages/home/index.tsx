import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ButtonAddLink } from "../../components/button-add-link";
import { privateApi } from "../../services/api";
import { currency } from "../../utils/currency";
import { EndpointsEnum } from "../../enum/endpoints";

interface IBalanceResponse {
  balance: number;
}

async function fetchSpendings() {
  const req = await privateApi.get(EndpointsEnum.BALANCE);
  return req.data;
}

function useSpendings() {
  return useQuery<IBalanceResponse>(["spendings"], () => fetchSpendings());
}

export function HomePage() {
  const { data, isLoading } = useSpendings();

  return (
    <Flex align="center" pt={52} direction="column">
      <Box h="24">
        {isLoading ? (
          <Spinner />
        ) : (
          <Heading size="3xl">{currency(Number(data?.balance || 0))}</Heading>
        )}
      </Box>

      <ButtonAddLink />
    </Flex>
  );
}

import {
  Card,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  CardBody,
  Button,
  Image,
  FormErrorMessage,
  Stack,
  Heading,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';
import { useAuthPageInfo } from './use-auth-page-info';
import {
  AuthPageFormType,
  IAuthPageProps,
  ILoginForm,
} from './auth-page.types';
import { useToast } from '../../hooks/use-toast';

export function AuthPage({ type }: IAuthPageProps) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthPageFormType>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const { btnText, headingText } = useAuthPageInfo(type);

  const toast = useToast();

  const submit = async (values: ILoginForm) => {
    if (type === 'login') {
      // TODO: handle with errors

      const newValues = {
        email: values.email,
        password: values.password,
      };
      await api.post('/login', newValues);

      return;
    }

    if (type === 'register') {
      // TODO: handle with errors
      await api.post('/register', values);
      toast.success({ title: 'Sucesso' });
    }

    reset();
  };

  return (
    <Center minH="100vh" display="flex" flexDirection="column" bg="gray.50">
      <Stack mt={-20} spacing="3">
        <Center>
          <Heading mx={10} as="h4" fontSize="3xl">
            {headingText}
          </Heading>
        </Center>

        <Center>
          <Image
            src={process.env.PUBLIC_URL + '/logo-cat.png'}
            title="Logo cat"
            w={14}
            h={14}
          />
        </Center>

        <Card w="sm" rounded="xl">
          <CardBody p={7}>
            <Flex direction="column" as="form" onSubmit={handleSubmit(submit)}>
              {type === 'register' && (
                <FormControl mt={5} isInvalid={!!errors.name?.message}>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    placeholder="Nome"
                    {...register('name', { required: 'Campo obrigatório' })}
                  />
                  <Flex h="30px" alignItems="center">
                    <FormErrorMessage m={0}>
                      {errors.name?.message}
                    </FormErrorMessage>
                  </Flex>
                </FormControl>
              )}

              <FormControl isInvalid={!!errors.email?.message}>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  placeholder="E-mail"
                  {...register('email', { required: 'Campo obrigatório' })}
                />
                <Flex h="30px" alignItems="center">
                  <FormErrorMessage m={0}>
                    {errors.email?.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>

              <FormControl isInvalid={!!errors.password?.message}>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Seanh"
                  {...register('password', { required: 'Campo obrigatório' })}
                />
                <Flex h="30px" alignItems="center">
                  <FormErrorMessage m={0}>
                    {errors.password?.message}
                  </FormErrorMessage>
                </Flex>
              </FormControl>

              <Button
                mt={3}
                mb={4}
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.300',
                }}
                type="submit"
              >
                {btnText}
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Stack>
    </Center>
  );
}

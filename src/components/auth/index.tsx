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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api';

interface ILoginForm {
  email: string;
  password: string;
  name?: string;
}

interface Props {
  type: 'login' | 'register';
}

export function AuthPage({ type }: Props) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const submit = async (values: ILoginForm) => {
    if (type === 'login') {
      const newValues = {
        email: values.email,
        password: values.password,
      };
      await api.post('/login', newValues);

      return;
    }

    if (type === 'register') {
      await api.post('/register', values);
    }
    reset();
  };

  return (
    <Center minH="100vh" display="flex" flexDirection="column" bg="gray.50">
      <Image
        mb={10}
        src={process.env.PUBLIC_URL + '/logo-cat.png'}
        title="Logo cat"
      />

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
              {type === 'login' ? 'Entrar' : 'Registrar'}
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Center>
  );
}

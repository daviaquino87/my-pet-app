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
import { useAuthPageInfo } from './auth-page-hook';
import {
  AuthPageFormType,
  IAuthPageProps,
  ILoginForm,
  IRegisterForm,
} from './auth-page.types';
import { useToast } from '../../hooks/use-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthDispatch } from '../../context/auth-context';

interface ISession {
  token: string;
  user: {
    id: string;
    name: string;
  };
}

interface ILoginResponse extends ISession {}

interface IResponseError {
  message: string;
}

const authPageServices = {
  login: async (data: ILoginForm): Promise<ILoginResponse> => {
    const response = await api.post('/session', data);
    return response.data;
  },
  register: async (data: IRegisterForm): Promise<void> => {
    const response = await api.post('/register', data);
    return response.data;
  },
};

export function AuthPage({ type }: IAuthPageProps) {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthPageFormType>({
    defaultValues: {
      email: searchParams.get('email') || '',
      password: '',
      name: '',
    },
  });

  const { btnText, headingText, isLoginPage } = useAuthPageInfo(type);

  const toast = useToast();

  const navigate = useNavigate();

  const dispatch = useAuthDispatch();

  const submit = async (values: ILoginForm) => {
    if (type === 'login') {
      // TODO: handle with errors

      const newValues = {
        email: values.email,
        password: values.password,
      };

      try {
        const { user, token } = await authPageServices.login(newValues);
        toast.success({ title: `Bem-vindo ${user.name}` });

        dispatch({ token, user });

        localStorage.setItem('@data', JSON.stringify({ token, user }));

        navigate('/');
      } catch (e) {
        if (axios.isAxiosError<IResponseError>(e)) {
          toast.error({ title: e.response?.data?.message });
          return;
        }
        toast.error({ title: 'Credenciais inválidas' });
      }

      return;
    }

    if (type === 'register') {
      try {
        await authPageServices.register(values as IRegisterForm);
        toast.success({
          title: 'Sucesso',
          isClosable: true,
          onCloseComplete: () => {
            navigate({
              pathname: '/login',
              search: `email=${values.email}`,
            });
          },
        });
      } catch (e) {
        if (axios.isAxiosError<IResponseError>(e)) {
          toast.error({
            title: e.response?.data?.message,
          });
          return;
        }
        toast.error({ title: 'Erro ao se registrar' });
      }
    }
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

              <Center>
                {isLoginPage ? (
                  <Link to="/register">Registrar-se</Link>
                ) : (
                  <Link to="/login">Faça login</Link>
                )}
              </Center>
            </Flex>
          </CardBody>
        </Card>
      </Stack>
    </Center>
  );
}

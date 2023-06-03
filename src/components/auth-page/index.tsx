import {
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import LottiePlayer from 'lottie-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuthDispatch } from '../../context/auth-context';
import { useAuthPage } from '../../hooks/use-auth-page';
import { useToast } from '../../hooks/use-toast';
import lottieCat from '../../lottie/65619-happy-cat.json';
import { IResponseError } from '../../types/response/login';
import { useAuthPageInfo } from './auth-page-hook';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import {
  AuthPageFormType,
  IAuthPageProps,
  ILoginForm,
} from './auth-page.types';

const fieldRules = {
  required: 'Campo obrigatório',
  minLength: {
    value: 6,
    message: 'Nome deve ter pelo menos 6 caracteres',
  },
};

export function AuthPage({ type }: IAuthPageProps) {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<AuthPageFormType>({
    defaultValues: {
      email: searchParams.get('email') || '',
      password: '',
      name: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const { btnText, isLoginPage } = useAuthPageInfo(type);

  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const dispatch = useAuthDispatch();

  const { onLogin, onRegister } = useAuthPage();

  const submit = async (values: ILoginForm) => {
    setIsLoading(true);
    if (type === 'login') {
      const newValues = {
        email: values.email,
        password: values.password,
      };

      try {
        const { token, user } = await onLogin(newValues);

        dispatch({ token, user });
        localStorage.setItem('@data', JSON.stringify({ token, user }));
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);

        if (axios.isAxiosError<IResponseError>(e)) {
          toast.error({ title: e.response?.data?.message });
          setFocus('password');
          handleSelectPasswordInput();

          return;
        }
        setFocus('password');
        handleSelectPasswordInput();

        toast.error({ title: 'Credenciais inválidas' });
      }

      return;
    }

    if (type === 'register') {
      try {
        const newValues = {
          email: values.email,
          password: values.password,
          name: values.name,
        };

        await onRegister(newValues);
        setIsLoading(false);
      } catch (e) {
        if (axios.isAxiosError<IResponseError>(e)) {
          toast.error({
            title: e.response?.data?.message,
          });
          setIsLoading(false);
          return;
        }
        toast.error({ title: 'Erro ao se registrar' });
        setIsLoading(false);
      }
    }
  };

  const handleSelectPasswordInput = () => {
    (
      document.getElementById('auth-input-password') as HTMLInputElement
    )?.select();
  };

  return (
    <Center
      minH="100vh"
      display="flex"
      flexDirection="column"
      bg="gray.50"
      _dark={{
        bg: 'gray.800',
      }}
    >
      <Stack mt={-20} spacing="3">
        <Center>
          <LottiePlayer
            style={{
              width: 100,
            }}
            animationData={lottieCat}
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
                    {...register('name', {
                      ...fieldRules,
                    })}
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
                <FormLabel htmlFor="auth-input-password">Senha</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Senha"
                    {...register('password', {
                      ...fieldRules,
                    })}
                    id="auth-input-password"
                  />
                  <InputRightElement w="4" mr={4}>
                    <Button h="1.75rem" size="sm" onClick={togglePassword}>
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>

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
                isLoading={isLoading}
              >
                {btnText}
              </Button>

              <Center>
                {isLoginPage ? (
                  <Link to="/register">Criar uma conta</Link>
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

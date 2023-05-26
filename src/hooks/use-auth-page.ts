import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from './use-toast';
import {
  ILoginForm,
  IRegisterForm,
} from '../components/auth-page/auth-page.types';
import { authPageServices } from '../services/auth';

export function useAuthPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const hasRedirectTo = searchParams.get('redirectTo') ?? '/';

  const onLogin = async (params: ILoginForm) => {
    const { user, token } = await authPageServices.login(params);
    toast.success({
      title: `Bem-vindo ${user.name}`,
      isClosable: true,
      onCloseComplete: () => {
        navigate(hasRedirectTo);
      },
    });

    return {
      user,
      token,
    };
  };

  const onRegister = async (params: IRegisterForm) => {
    await authPageServices.register(params);
    toast.success({
      title: 'Sucesso',
      isClosable: true,
      onCloseComplete: () => {
        navigate({
          pathname: '/login',
          search: `email=${params.email}`,
        });
      },
    });
  };

  return {
    onLogin,
    onRegister,
  };
}

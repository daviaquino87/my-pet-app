import { AuthPageTypeEnum } from './auth-page.enum';

export function useAuthPageInfo(type: AuthPageTypeEnum) {
  const isLoginPage = type === 'login';
  const headingText = isLoginPage ? 'Login' : 'Registre-se';
  const btnText = isLoginPage ? 'Entrar' : 'Registrar-se';

  return {
    isLoginPage,
    headingText,
    btnText,
  };
}

import { AuthPageTypeEnum } from './auth-page.enum';

export function useAuthPageInfo(type: AuthPageTypeEnum) {
  const isLoginType = type === 'login';
  const headingText = isLoginType ? 'Login' : 'Registre-se';
  const btnText = isLoginType ? 'Entrar' : 'Registrar-se';

  return {
    isLoginType,
    headingText,
    btnText,
  };
}

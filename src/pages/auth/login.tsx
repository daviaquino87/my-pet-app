import { AuthPage } from '../../components/auth-page';
import { AuthPageTypeEnum } from '../../components/auth-page/auth-page.enum';

export function LoginPage() {
  return <AuthPage type={AuthPageTypeEnum.LOGIN} />;
}

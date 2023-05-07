import { AuthPage } from '../../components/auth-page';
import { AuthPageTypeEnum } from '../../components/auth-page/auth-page.enum';

export function RegisterPage() {
  return <AuthPage type={AuthPageTypeEnum.REGISTER} />;
}

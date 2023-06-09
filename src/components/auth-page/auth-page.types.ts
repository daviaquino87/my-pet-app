import { AuthPageTypeEnum } from "./auth-page.enum";

export interface ILoginForm {
  email: string;
  password: string;
  name?: string;
}

export interface IRegisterForm extends ILoginForm {
  name?: string;
}

export interface IAuthPageProps {
  type: AuthPageTypeEnum;
}

export type AuthPageFormType = ILoginForm & IRegisterForm;

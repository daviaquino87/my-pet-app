import { ISession } from '../session';

export interface ILoginResponse extends ISession {}

export interface IResponseError {
  message: string;
}

import {
  ILoginForm,
  IRegisterForm,
} from "../components/auth-page/auth-page.types";
import { EndpointsEnum } from "../enum/endpoints";
import { ILoginResponse } from "../types/response/login";
import { api } from "./api";

export const authPageServices = {
  login: async (data: ILoginForm): Promise<ILoginResponse> => {
    const response = await api.post(EndpointsEnum.SESSION, data);
    return response.data;
  },
  register: async (data: IRegisterForm): Promise<void> => {
    const response = await api.post(EndpointsEnum.REGISTER, data);
    return response.data;
  },
};

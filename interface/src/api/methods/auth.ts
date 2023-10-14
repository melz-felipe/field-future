import { AxiosResponse } from "axios";

import api from "@/api/instance";
import { LOGIN_ROUTE, LOGIN_REQUEST_KEY } from "@/api/routes";

export interface LoginPayload {
  wallet: string;
  signature: string;
}

export const login = (payload: LoginPayload): Promise<AxiosResponse> => {
  return api.post(LOGIN_ROUTE, payload);
};

export const requestLoginKey = (wallet: string): Promise<AxiosResponse> => {
  return api.get(`${LOGIN_REQUEST_KEY}/${wallet}`);
};

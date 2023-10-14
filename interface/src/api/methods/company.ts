import { AxiosResponse } from "axios";

import api from "@/api/instance";
import { CREATE_COMPANY_ROUTE } from "@/api/routes";

export interface CreateCompanyPayload {
  companyName: string;
  wallets: string[];
  neededSignatures: number;
}

export const createCompany = (
  payload: CreateCompanyPayload
): Promise<AxiosResponse> => {
  return api.post(CREATE_COMPANY_ROUTE, payload);
};

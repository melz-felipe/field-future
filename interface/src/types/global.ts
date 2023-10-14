export interface ICompany {
  id: number;
  name: string | null;
  wallet: string;
  signThreshold: number;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: number;
  wallet: string;
  name: string | null;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  hourlyRate: number | null;
  companyRole: EnumCompanyRole;
}

export enum EnumCompanyRole {
  "ADMIN" = "ADMIN",
  "SIGNER" = "SIGNER",
  "EMPLOYEE" = "EMPLOYEE",
}

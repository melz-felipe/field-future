import {
  TOKEN_KEY,
  WALLET_KEY,
  COMPANY_KEY,
  USER_KEY,
} from "@/services/localStorage/keys";
import { ICompany, IUser } from "@/types/global";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setWallet = (wallet: string) => {
  localStorage.setItem(WALLET_KEY, wallet);
};

export const getWallet = () => {
  return localStorage.getItem(WALLET_KEY);
};

export const removeWallet = () => {
  localStorage.removeItem(WALLET_KEY);
};

export const setUser = (user: IUser) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

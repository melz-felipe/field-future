import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";

import {
  getToken,
  getUser,
  getWallet,
  removeToken,
  setToken,
  setUser,
} from "@/services/localStorage";
import { LoginPayload, login as apiLogin } from "@/api/methods/auth";
import {
  DASHBOARD_ROUTE,
  CREATE_COMPANY_ROUTE,
  LOGIN_ROUTE,
} from "@/router/routes";

export const CHECK_AUTH_CALL = "CHECK_AUTH_CALL";
export const CHECK_AUTH_SUCCESS = "CHECK_AUTH_SUCCESS";
export const CHECK_AUTH_FAILURE = "CHECK_AUTH_FAILURE";
export const LOGIN_CALL = "LOGIN_CALL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const checkAuth = () => (dispatch: Dispatch) => {
  dispatch({ type: CHECK_AUTH_CALL });

  const token = getToken();
  const wallet = getWallet();
  const user = getUser();

  if (token) {
    dispatch({
      type: CHECK_AUTH_SUCCESS,
      payload: { token, wallet, user },
    });
    return user;
  } else {
    dispatch({ type: CHECK_AUTH_FAILURE });
  }
  return null;
};

export const login = (payload: LoginPayload) => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_CALL });

  try {
    const {
      data: { user, token },
    } = await apiLogin({
      wallet: payload.wallet,
      signature: payload.signature,
    });

    dispatch({ type: LOGIN_SUCCESS });
    setToken(token);

    if (user.companyId) {
      setUser(user);
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: { error: JSON.stringify(error) },
    });
  }
};

export const logout = () => (dispatch: Dispatch) => {
  removeToken();

  window.location.href = LOGIN_ROUTE;
};

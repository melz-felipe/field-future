import { AnyAction } from "@reduxjs/toolkit";

import {
  CHECK_AUTH_CALL,
  CHECK_AUTH_FAILURE,
  CHECK_AUTH_SUCCESS,
  LOGIN_CALL,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from "@/actions/authActions";
import { IUser } from "@/types/global";

interface AuthState {
  auth: {
    token: string | null;
    wallet: string | null;
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    initialLoad: boolean;
  };
  login: {
    loading: boolean;
    error: string | null;
  };
}

const initialState: AuthState = {
  auth: {
    token: null,
    wallet: null,
    user: null,
    isAuthenticated: false,
    isLoading: true,
    initialLoad: false,
  },
  login: {
    loading: false,
    error: null,
  },
};

const authReducer = (state: AuthState = initialState, action: AnyAction) => {
  switch (action.type) {
    case CHECK_AUTH_CALL: {
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: true,
          initialLoad: true,
        },
      };
    }
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.payload.token,
          wallet: action.payload.wallet,
          user: action.payload.user,
          isAuthenticated: true,
          isLoading: false,
        },
      };
    case CHECK_AUTH_FAILURE:
      return {
        ...state,
        auth: {
          ...state.auth,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        },
      };
    case LOGIN_CALL:
      return {
        ...state,
        login: {
          ...state.login,
          error: null,
          loading: true,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: action.payload.error,
        },
      };
    default:
      return state;
  }
};

export default authReducer;

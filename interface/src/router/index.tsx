import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/store";
import { checkAuth } from "@/actions/authActions";
import { CREATE_COMPANY_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE } from "@/router/routes";
import ProtectedRoute from "@/router/components/ProtectedRoute";
import PublicRoute from "@/router/components/PublicRoute";
import { Login } from "@/pages/login";
import { Dashboard } from "@/pages/dashboard";
import { CreateCompany } from "@/pages/createCompany";

const Router: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    auth: { isAuthenticated, isLoading, initialLoad },
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!initialLoad) {
      dispatch(checkAuth());
    }
  }, [dispatch, isLoading, initialLoad]);

  if (isLoading) {
    return <div />;
  }

  return (
    <>
      <Routes>
        <Route
          path={LOGIN_ROUTE}
          element={
            <PublicRoute isAuthenticated={isAuthenticated} outlet={<Login />} />
          }
        />
        <Route
          path={DASHBOARD_ROUTE}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} outlet={<Dashboard />} />
          }
        />
        <Route
          path={CREATE_COMPANY_ROUTE}
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} outlet={<CreateCompany />} />
          }
        />
        <Route path="/*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    </>
  );
};

export default Router;

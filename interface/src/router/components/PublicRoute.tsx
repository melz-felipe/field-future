import { Navigate } from "react-router-dom";

import { CREATE_COMPANY_ROUTE, DASHBOARD_ROUTE } from "@/router/routes";
import { USER_KEY } from "@/services/localStorage/keys";

export type PublicRouteProps = {
  isAuthenticated: boolean;
  outlet: JSX.Element;
};

const PublicRoute = ({ isAuthenticated, outlet }: PublicRouteProps) => {
  const user = JSON.parse(localStorage.getItem(USER_KEY) || "{}");
  if (!isAuthenticated) {
    return outlet;
  } else {
    return (
      <Navigate
        to={{
          pathname: user.companyId ? DASHBOARD_ROUTE : CREATE_COMPANY_ROUTE,
        }}
      />
    );
  }
};

export default PublicRoute;

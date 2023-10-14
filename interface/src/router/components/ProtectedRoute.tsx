import { Navigate } from "react-router-dom";

import { LOGIN_ROUTE } from "@/router/routes";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  outlet: JSX.Element;
};

const ProtectedRoute = ({ isAuthenticated, outlet }: ProtectedRouteProps) => {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: LOGIN_ROUTE }} />;
  }
};

export default ProtectedRoute;

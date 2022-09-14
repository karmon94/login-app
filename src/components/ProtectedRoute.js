import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../app/UserContextProvider";

const ProtectedRoute = ({ user, children }) => {
  const userCtxt = useContext(UserContext);

  if (!userCtxt.user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

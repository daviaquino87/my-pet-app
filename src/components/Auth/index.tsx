import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

function AuthUser({ children }: Props) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={"/"} />;
  }
  return <React.Fragment>{children}</React.Fragment>;
}

export default AuthUser;

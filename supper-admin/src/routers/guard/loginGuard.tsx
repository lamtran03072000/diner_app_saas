import React from "react";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../store";
import { useSelector } from "react-redux";

const LoginGuard = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  return <div>{isLogin ? <Navigate to="/" /> : children}</div>;
};

export default LoginGuard;

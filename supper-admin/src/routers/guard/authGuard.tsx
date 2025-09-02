import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Navigate } from "react-router-dom";
import { PATH } from "..";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  return <div>{isLogin ? children : <Navigate to={PATH.LOGIN} />}</div>;
};

export default AuthGuard;

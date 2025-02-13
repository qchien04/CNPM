import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { isInitialized, isAuthenticated } = useSelector((state:RootState)=>state.authReducer);

  if (!isInitialized) return(
    <Spin tip="Đang tải..." spinning={true} size="large" fullscreen={true} />
  );
  if (!isAuthenticated) return <Navigate to="/auth/sign-in" />;

  
  return <>{children}</>;
};

export default AuthGuard;

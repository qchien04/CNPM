import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const GuestGuard: FC= () => {
  const { isInitialized, isAuthenticated } = useSelector((state:RootState)=>state.authReducer);

  if (!isInitialized) return (
    <Spin tip="Đang tải..." spinning={true} size="large" fullscreen={true} />
  );
  if (isAuthenticated) return <Navigate to="/" />;

  return <><Outlet></Outlet></>;
};

export default GuestGuard;

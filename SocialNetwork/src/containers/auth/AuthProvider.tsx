import { FC, ReactNode, useEffect, useState } from "react";
import { initialize } from "../../store/actions/authAction";
import authService from "../../services/authService";
import { useDispatch } from "react-redux";
import { normalizeAuthType, User } from "../../utils/type";
import { Spin } from "antd";

interface ChildrenProps {
  children: ReactNode;
}

const AuthProvider: FC<ChildrenProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);  // Thêm loading state

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem('jwtToken');
      if (!accessToken) {
        const data: normalizeAuthType = initialize({ isAuthenticated: false, user: null });
        dispatch(data);
        setLoading(false);  // Cập nhật loading khi hoàn tất
        return;
      }

      try {
        const user: User = await authService.getbasicInfo();
        const data: normalizeAuthType = initialize({ isAuthenticated: true, user });
        dispatch(data);
      } catch {
        const data: normalizeAuthType = initialize({ isAuthenticated: false, user: null });
        dispatch(data);
      } finally {
        setLoading(false);  // Đảm bảo cập nhật trạng thái loading khi kết thúc
      }
    })();
  }, [dispatch]);

  // Hiển thị loading khi đang tải dữ liệu
  if (loading) {
    return <div>
       <Spin tip="Đang tải..." spinning={true} size="large" fullscreen={true} />
  </div>;  // Hoặc một chỉ báo tải khác
  }

  return (
    <>
      {children}
    </>
  );
};

export default AuthProvider;

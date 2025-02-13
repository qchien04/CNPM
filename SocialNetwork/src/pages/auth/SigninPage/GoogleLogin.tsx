import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { GoogleOutlined } from "@ant-design/icons";
import { FE_URL } from '../../../config/api';
import authService from '../../../services/authService';

import { signIn } from "../../../store/actions/authAction";
import { useDispatch } from "react-redux";
import { normalizeAuthType, User } from "../../../utils/type";



const GoogleLogin:React.FC=() => {
  const [accessToken, setAccessToken] = useState<string>("");
  const dispatch=useDispatch();
  useEffect(() => {
    const check =async ()=>{
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const act = params.get("access_token");
        if (act) {
          console.log("Access Token:", act);
          setAccessToken(act)
          // Gửi Access Token đến Backend
          const response = await authService.signingoogle(hash);
          console.log(response.jwt);
          localStorage.setItem("jwtToken",response.jwt);

          const user:User=await authService.getbasicInfo();
          console.log(user);


          const data:normalizeAuthType=signIn({user});
          dispatch(data);
        }
      }
    }
    check();
  }, [dispatch]);

  const handleLogin = () => {
    const clientId = '82696225190-hdskhqludierkcsj1r4h9cif8kb6lq2t.apps.googleusercontent.com'; // Thay bằng client ID của bạn
    const redirectUri = `${FE_URL}/auth/sign-in`; // Thay bằng redirect URI của bạn
    const scope = 'openid profile email'; // Các quyền yêu cầu từ Google

    // Tạo URL yêu cầu đăng nhập Google
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=login`;

    // Chuyển hướng đến Google OAuth2
    window.location.href = authUrl;
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <h3>Logged in!</h3>
        </div>
      ) : (
        <div>          
          <Button
              type="primary"
              size="small"
              icon={<GoogleOutlined/>}
              onClick={handleLogin}
              style={{ width: '300px', height: '40px' }}

              variant='filled' 
              shape='round' 
              
          >
            Login with your Google Account 
          </Button>
        </div>
      )}
    </div>
  );
}

export default GoogleLogin;

import { Button } from "antd";
// import { notification,Spin } from "antd";
// import { useState } from "react";
import { Form, Input } from "antd";
import GoogleLogin from "./GoogleLogin";

import "./Signin.css";
import authService, { LoginForm } from "../../../services/authService";
import { signIn } from "../../../store/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { normalizeAuthType, User } from "../../../utils/type";

const Signin: React.FC = () => {
  const navigate=useNavigate();
  const dispatch= useDispatch();
  console.log("sign");

  const rulesPassword = [
    {
      required: true,
      message: "Not accept !",
    },
  ];
  const rulesUsername = [
    {
      required: true,
      message: "Not accept !",
    },
  ];

  const handleSubmit = async (values: LoginForm) => {
    try{
      localStorage.removeItem("jwtToken");
      
      const response = await authService.signin(values);
      console.log(response);

      localStorage.setItem("jwtToken",response.jwt);

      const user:User=await authService.getbasicInfo();
      console.log(user);
      const data:normalizeAuthType=signIn({user});
      dispatch(data);
      
    }
    catch (error){
      console.error(error);
    }

  };

  return (
    <div className="center-container">
      {/* <Spin spinning={spinning} tip="Getting login information"> */}
        <h2>Login</h2>
        {/* {contextHolder} */}
        <Form
          className="formlogin"
          name="login-form"
          layout="vertical"
          onFinish={handleSubmit}
          style={{ width: '400px', margin: '0 auto' }}
        >
          <Form.Item label="Username" name="username" rules={rulesUsername}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={rulesPassword}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
            <div>Don't have account ?</div>
            <Button type="primary" onClick={() => navigate("/auth/sign-up")}>
              Sign up
            </Button>
        </Form>
      {/* </Spin> */}
      <div className="google-login" onClick={()=>(localStorage.removeItem("jwtToken"))}>
        <GoogleLogin/>
      </div>
    </div>
  );
};

export default Signin;

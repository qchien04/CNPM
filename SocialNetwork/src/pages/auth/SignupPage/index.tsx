import { Button } from "antd";
import { notification,Spin } from "antd";
import { useState } from "react";
import { Form, Input } from "antd";

import "../SigninPage/Signin.css";
import authService, { RegisterForm } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import Authmail from "./Authmail";


const Signup: React.FC = () => {
  const [notifyApi, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState<boolean>(false);
  const [isAuthmailPage,setIsAuthmailPage]=useState<boolean>(false);
  const [dataRegister,setDataRegister]=useState<RegisterForm>({username:"",password:"",email:""});
  const navigate=useNavigate();


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
  const handleSubmit = async (values: RegisterForm) => {
    try{
      setSpinning(true);
      const response = await authService.signup(values);
      
      setTimeout(() => {
        if (response.accept) {
          notifyApi.success({
            message: `Success`,
            description: `check your email !`,
            duration: 5,
            placement: "bottomRight",
          });
          setIsAuthmailPage(true);
          setDataRegister(values);
        } 
        else {
          notifyApi.error({
            message: "Failed",
            description: `email exists`,
            duration: 5,
          });
        }
        setSpinning(false);
      }, 2000);
    }
    catch (error){
      console.error(error);
    }

  };

  return (
    <div className="center-container">
      <Spin spinning={spinning} tip="Getting login information">
        <h2>Sign up</h2>
        {contextHolder}
        {isAuthmailPage?(
            <Authmail dataform={dataRegister}></Authmail>
        ):(
            <Form
                className="formlogin"
                name="login-form"
                layout="vertical"
                onFinish={handleSubmit}
                style={{ width: '400px', margin: '0 auto' }}
                >

                <Form.Item label="Email" name="email" rules={rulesPassword}>
                    <Input />
                </Form.Item>  

                <Form.Item label="Username" name="username" rules={rulesUsername}>
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={rulesPassword}>
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Resgister
                    </Button>
                </Form.Item>

                <div>Have account?</div>
                <Button type="primary" onClick={() => navigate("/auth/sign-in")}>
                    Sign in
                </Button>
            </Form>
        )}
      </Spin>
    </div>
  );
};

export default Signup;

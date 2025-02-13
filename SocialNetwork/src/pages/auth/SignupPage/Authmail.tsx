import { Button } from "antd";
import { notification,Spin } from "antd";
import { useState } from "react";
import { Form, Input } from "antd";

import "../SigninPage/Signin.css";
import authService, { RegisterForm } from "../../../services/authService";
import { useNavigate } from "react-router-dom";


interface RegisterFormProps {
    dataform: RegisterForm; 
}
interface AuthFormValues {
  otp: string;
}
const Authmail: React.FC<RegisterFormProps> = ({dataform}) => {
  const [notifyApi, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState<boolean>(false);
  const navigate=useNavigate();
  const rulesPassword = [
    {
      required: true,
      message: "Not accept !",
    },
  ];

  const handleSubmit = async (values:AuthFormValues) => {
    try{
      setSpinning(true);
      const inforRegister={
        ...dataform,
        otp:values.otp

      }
      console.log(inforRegister);
      const response = await authService.authAccount(inforRegister);
      console.log(response);
      setTimeout(() => {
        if (response.jwt&&response.isAuth==true) {
          notifyApi.success({
            message: `Success`,
            description: `Successfully`,
            duration: 5,
            placement: "bottomRight",
          });
          localStorage.setItem("jwtToken",response.jwt);

          navigate("/account");
          window.location.reload();          
        } 
        else {
          notifyApi.error({
            message: "Failed",
            description: `Try again`,
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
      <Spin spinning={spinning} tip="Please wait">
        <h2>Auth email</h2>
        {contextHolder}
        <Form
                className="formlogin"
                name="login-form"
                layout="vertical"
                onFinish={handleSubmit}
                style={{ width: '400px', margin: '0 auto' }}
            >
    
                <Form.Item label="OTP" name="otp" rules={rulesPassword}>
                    <Input />
                </Form.Item>  
    
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Auth
                    </Button>
                </Form.Item>
            </Form>
      </Spin>
    </div>
  );
};

export default Authmail;

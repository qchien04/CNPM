import axiosClient from '../../config/axiosconfig';


export interface LoginForm{
    username:string,
    password:string
}
export interface RegisterForm{
  email:string,
  username:string,
  password:string
}

export interface AuthEmailForm{
  email:string,
  username:string,
  password:string,
  otp:string

}
export interface RegisterResponse{
  email:string,
  username:string,
  password:string,
  accept: boolean,
}
export interface SigninResponse{
    jwt:string,
    isAuth:boolean
}

interface AuthoritiesResponse{
    email:string;
    avt?:string;
    name:string;
    roles:string[];
    permissions:string[];
  }
const authService = {
  getbasicInfo: async (): Promise<AuthoritiesResponse> => {
    try {
      const {data,status} = await axiosClient.get('/api/users/basicInfo');
      if(status===200){
        return data;
      }
        
      else{
        throw new Error("Can not get user information");
      }
    } catch (error) {
      console.error('Error fetching Authorities:', error);
      throw error; 
    }
  },

  signin: async (loginform: LoginForm): Promise<SigninResponse> => {
    try {
      const {data,status} = await axiosClient.post('/auth/signin', loginform);
      if(status===200)
        return data;
      else{
        throw new Error("Can not get login information");
      }
    } catch (error) {
      console.error('Error login: ', error);
      throw error;
    }
  },

  signingoogle: async (accessToken:string): Promise<SigninResponse> => {
    try {
      const {data} = await axiosClient.post('/google/login/user', {accessToken});
      return data;
    } catch (error) {
      console.error('Error login: ', error);
      throw error;
    }
  },

  signup: async (registerForm: RegisterForm): Promise<RegisterResponse> => {
    try {
      const {data} = await axiosClient.post('/auth/signup', registerForm);
      const res={
        ...data,
        accept:true,
      }
      if(data.message!=='not accept')
        return res;
      else{
        res.accept=false;
        return res;
      }
    } catch (error) {
      console.error('Error sign up: ', error);
      throw error;
    }
  },
  authAccount: async (authEmailForm: AuthEmailForm): Promise<SigninResponse> => {
    try {
      const {data} = await axiosClient.post('/auth/authAccount', authEmailForm);
      return data;
    } catch (error) {
      console.error('Error sign up: ', error);
      throw error;
    }
  },

};
export default authService;
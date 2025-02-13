import { FC, ReactNode } from "react";
import { useAuth } from "../../modules/auth/hooks/useAuth";
import { Alert, Layout } from "antd";
import 'antd/dist/reset.css';
import { User } from "../../modules/auth/context/types";




export interface RoleBasedGuardProps {
    accessibleRoles: string[];
    children: ReactNode;
  }
  
const RoleBasedGuard: FC<RoleBasedGuardProps> = ({
    children,
    accessibleRoles,
  }) => {
    const { user } = useAuth();
    function intersection(user:User|null, arr2:string[]):string[] {
        if(user==null){
            return [];
        }
        return user.roles.filter(item => arr2.includes(item));
    }    
    console.log("intersection");
    console.log(intersection(user,accessibleRoles))

    if (intersection(user,accessibleRoles).length==0) {
      return (
        <Layout style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Alert 
                message="Permission Denied" 
                description="You do not have permission to access this page" 
                type="error" 
                showIcon 
            />
        </Layout>
      );
    }
  
    return <>{children}</>;
  };
  
  export default RoleBasedGuard;
  
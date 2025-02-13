import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { Badge, Button, Dropdown } from 'antd';
import { useDispatch } from 'react-redux';
import { normalizeAuthType } from '../../utils/type';
import { signOut } from '../../store/actions/authAction';

function UserOption(){
    const dispatch=useDispatch();

    const handleLogout=()=>{
        const userConfirmed = confirm("Are you sure you want to logout?");
        if (userConfirmed) {
            localStorage.removeItem('jwtToken');
            const data:normalizeAuthType=signOut();
            dispatch(data);
        } 
    }
    const items = [
    {
        key: '1',
        label: <Button icon={<LogoutOutlined/>} type='link'></Button>,
        extra: 'Đăng xuất',
        onClick:()=>{handleLogout()}
    },

    ];


    return(
        <>
            <Dropdown menu={{items:items}} 
                trigger={["click"]}
                dropdownRender={(menu)=>(
                    <>
                        {menu}
                    </>
                )}
                >
                <Badge dot={true}>
                    <Button type='text' icon={<UserOutlined style={{ fontSize: '20px', color: 'blue' }}/>}></Button>
                </Badge>
            </Dropdown>
        </>
    );
}

export default UserOption;
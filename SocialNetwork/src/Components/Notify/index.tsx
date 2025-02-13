import { BellOutlined } from '@ant-design/icons';
// import { SettingOutlined } from '@ant-design/icons';

import { Badge, Button, Dropdown } from 'antd';
import "./Notify.css";

function Notify(){

    const items = [
    {
        key: '1',
        label: (<div className='notify__item'>
        <div className='notify__item-icon'>
            <BellOutlined></BellOutlined>
        </div>
        <div className='notify__item--content'>
            <div className='notify__item-title'>
                Item1
            </div>
            <div className='notify__item-time'>
                1s truoc
            </div>
        </div>
        </div>),
        extra: '⌘F',
    },

    {
        key: '2',
        label: (<div className='notify__item'>
            <div className='notify__item-icon'>
                <BellOutlined></BellOutlined>
            </div>
            <div className='notify__item--content'>
                <div className='notify__item-title'>
                    Item1
                </div>
                <div className='notify__item-time'>
                    1s truoc
                </div>
            </div>
            </div>),
        extra: '⌘Y',
    },
    {
        key: '3',
        label: (<div className='notify__item'>
            <div className='notify__item-icon'>
                <BellOutlined></BellOutlined>
            </div>
            <div className='notify__item--content'>
                <div className='notify__item-title'>
                    Item1
                </div>
                <div className='notify__item-time'>
                    1s truoc
                </div>
            </div>
            </div>),
        extra: '⌘C',
    },
    ];


    return(
        <>
            <Dropdown menu={{items:items}} 
                trigger={["click"]}
                dropdownRender={(menu)=>(
                    <>
                        <div className='notify__dropdown'>
                            <div className='notify__header'>
                                <div className='notify__header-title'>
                                    <BellOutlined></BellOutlined>
                                    Notifition
                                </div>
                                <Button type='link'>View All</Button>
                            </div>
                            <div className='notify__body'>
                                {menu}
                            </div>
                        </div>
                    </>
                )}
                >
                <Badge dot={true}>
                    <Button type='text' icon={<BellOutlined style={{ fontSize: '20px', color: 'blue' }}/>}></Button>
                </Badge>
            </Dropdown>
        </>
    );
}

export default Notify
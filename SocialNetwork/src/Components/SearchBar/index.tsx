import { useEffect, useState } from "react";
import userService from "../../services/accountInfoService";
import { Avatar, Col, Dropdown, MenuProps, Row } from "antd";
import { Link } from "react-router-dom";


const SearchBar:React.FC=()=>{
    const [inputVal,setInputVal]=useState<string>("");
    const [userSearchList,setUserSearchList]=useState<[]>([]);

    const handleFindUser=async()=>{
        const data=await userService.getUsersByQuery(inputVal)
        console.log(data)

        setUserSearchList(data);
    
        
    }
    useEffect(()=>{
        if(inputVal!="") handleFindUser();
        else{
            setUserSearchList([]);
        }
    },[inputVal])


    const itemsSearch: MenuProps['items'] = [];
    (userSearchList||[]).map((val,index)=>{
        const item={
            key: index+'',
            label: (
                <Link to='/profile/1' >
                    <Row align="middle" style={{width:250,paddingTop:10}}>
                        <Col span={3}>
                            <Avatar
                                className='avt'
                                size={48}
                                src={val.avt}
                            />
                        </Col>

                        <Col span={17} offset={4}>
                            {val.name}
                        </Col>
                    </Row>
                </Link>
                
            ),
        }
        itemsSearch.push(item)

        
    })

    return (
        <Dropdown menu={{items:itemsSearch}} 
            trigger={["click"]}
            dropdownRender={(menu)=>(
                <>
                    <div className='chat__body' >
                            {menu}
                    </div>
                </>
            )}
            
            >
            <input type="text" placeholder="Tìm kiếm" onChange={(e)=>setInputVal(e.target.value)} value={inputVal} className="search-input" />
        </Dropdown>

    )
}


export default SearchBar;

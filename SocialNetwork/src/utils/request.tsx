const API_DOMAIN="http://localhost:3002/";



export const get =async(path:string)=>{
    const response=await fetch(API_DOMAIN+path);
    const result=await response.json();
    return result;
}



export const post=async(path:string,option:unknown)=>{
    const response=await fetch(API_DOMAIN+path,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
        },
        body:JSON.stringify(option),
    });
    const result=await response.json();
    return result;
}

export const del=async(path:string,id:string)=>{
    const response=await fetch(`${API_DOMAIN}${path}/${id}`,{
        method:"DELETE",
    });
    const result=await response.json();
    return result;
}

export const patch=async(path:string,option:unknown)=>{
    const response=await fetch(API_DOMAIN+path,{
        method:"PATCH",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
        },
        body:JSON.stringify(option),
    });
    const result=await response.json();
    return result;
}
import request from '@/https/axios'
export const getRoleList=(data)=>{
    const obj={
        url:'/user/info/',
        method:'get',
        data
    }
    return request(obj)
}
export const doLogin=(data)=>{
    const obj={
        url:'/user/login/',
        method:'post',
        data
    }
    return request(obj)
}
import request from '@/https/axios'
export const getRoleList=(data)=>{
    const obj={
        url:'/user/info/',
        method:'get',
        data
    }
    return request(obj)
}
export const dd=(data)=>{
    const obj={
        url:'/aacc/',
        method:'get',
        data
    }
    return request(obj)
}
import request from '@/https/axios'
import type {loginResData} from '@/types/login'
export const getRoleList=()=>{
    const obj={
        url:'/user/info/',
        method:'get',
    }
    return request(obj)
}

export const doLogin=(data:loginResData)=>{
    const obj={
        url:'/user/login/',
        method:'post',
        data
    }
    return request(obj)
}
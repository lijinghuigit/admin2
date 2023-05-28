// var Mock = require('mockjs')
import Mock from 'mockjs' 
import { storeToRefs } from 'pinia'
import {useInforStore} from '@/stores/userinfor'
import type {loginResData} from '@/types/login'
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
Mock.mock('/user/info/', 'get', () => {
    const infor=useInforStore()
    let permission=[] 
    const {userInfor} =storeToRefs(infor)
    if(!userInfor.value.token){
        return {
            code:0,
            data:{}
        }
    }
    console.log(userInfor.value.token)
    if(userInfor.value.token==='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'){//管理员
        permission=["index","order-manage","order-list","product-manage","product-list","review-manage","return-goods","goods","goods-list","goods-classify","permission","user-manage","role-manage","menu-manage"]
    }else{
        permission=["index","goods","goods-list","goods-classify",]
    }
    return  {
        code:1,
        data:{
            avatar:"https://randy168.com/1533262153771.gif",
            name:"admin",
            roles:["admin"],
            data:permission
        }
    }
})
Mock.mock('/user/login/', 'post', (res:loginResData|any) => {
    res=JSON.parse(res.body)
    console.log(res.name)
    let token=''
    if(res.name==='admin'){
        token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    }else{
        token='eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNjYzNTE2OTI3LCJleHAiOjE2NjM2MDMzMjd9'
    }
    return {
        message:"获取token成功",
        code:1,
        data:{
            token:token,
            name:res.name
        }
    }
})
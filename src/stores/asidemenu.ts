/*
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-15 17:56:42
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-16 19:08:03
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\src\stores\asidemenu.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineStore } from 'pinia'
import {getRoleList} from '@/api/index'
import {asyncRoutes,constantRoutes} from '@/router/index.js'
import {recursionRouter,setSingleItem} from '@/utils/recursion-router'
import type {roleRepData} from './types/menu'
import type {routerInt,userData} from './types/routes'
export const useAsideMenuStore = defineStore('Asidemenu', {
  state: () :userData => {
    return {
        menuList: [],
        routerList:[],
        currentMenu:[],
        tagList:[],
        testPrimary:'基础数据类型'
    }
  },
  actions: {
    async asyncGetMenu(data:string) {
        const res:roleRepData=await getRoleList()
        if(res.code===1){
          // 获取到的用户权限
          const userRouter=res.data.data
          console.log(userRouter)
          // 从asyncRoutes中过滤角色权限
          const data=recursionRouter(userRouter,asyncRoutes)
          // console.log(data)
          // 该用户所拥有的所有路由权限
          const menu=[...constantRoutes,...data]
          // 将不需要展示的路由过滤
          const allRouterList=menu.filter(
            (item)=>!item.hidden
          )
          const currentMenu=setSingleItem(allRouterList,[])
          console.log(currentMenu)
          this.menuList=currentMenu
          return data 
        }
    },
    setRouter(data:any){
      this.routerList=data
    },
    setCurrentRoute(data: any){
      this.currentMenu=[]
      this.currentMenu.push(data)
    },
    setTag(data:string){
    
      this.tagList.push(data)
    },
    delCurrentTag(index:number){
      this.tagList.splice(index,1)
    }
  },
})
/*
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-14 21:37:25
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-15 17:49:22
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/Layout.vue'
export const constantRoutes=[
  {
    path: '/',
    name: 'Layout',
    redirect:'/index',
    component: Layout,
    meta:{
      title:'首页',
      icon:'icon-comments',
      single:true
    },
    children:[
      {
        path: '/index',
        name: 'index',
        component: ()=>import('../views/index.vue'),
        meta:{
          title:'首页',
          icon:'icon-youxiang'
        }
      },
    ]
  },
  {
    path:'/login',
    name:'login',
    meta:{
      title:'登陆',
      icon:'icon-youxiang'
    },
    hidden:true,
    component:()=>import('../views/login.vue')
  },
  {
    path:'/:pathMatch(.*)*',
    name:'404',
    hidden:true,
    component:()=>import('../views/error/404.vue')
  }
]
export const asyncRoutes=[
  {
    path:'/product',
    component:Layout,
    name:'product-manage',
    meta:{
      title:'产品管理',
      icon:'icon-searchcart'
    },
    children:[
      {
        path:'/product/list',
        component:()=>import('../views/product/list/index.vue'),
        name:'product-list',
        meta:{
          title:'产品列表',
          icon:'icon-raw'
        },
      },
      {
        path:'/product/category',
        component:()=>import('../views/product/category/index.vue'),
        name:'review-manage',
        meta:{
          title:'产品分类',
          icon:'icon-searchcart'
        },
        
      },
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:constantRoutes
})

export default router

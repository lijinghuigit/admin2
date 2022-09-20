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
import EmptyLayout from '@/views/empty_layout/index.vue'
export const constantRoutes=[
  {
    path: '/',
    name: 'Index',
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
        name: 'Index',
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
    redirect: '/product/list',
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
  },
  {
    path:'/order',
    component:Layout,
    name:'order-manage',
    redirect:'/order/list',
    meta:{
      title: '订单管理',
      icon: 'icon-cart-Empty'
    },
    children: [
      {
        path: '/order/list',
        name: 'order-list',
        component: () => import('@/views/order/list/index.vue'),
        meta: {
          title: '订单列表',
          icon: 'icon-Exportservices'
        }
      },
      {
        path:'/order/product',
        component:EmptyLayout,
        name:'goods',
        meta: {
          title: '货物管理',
          icon: 'icon-searchcart'
        },
        redirect: '/order/good/list',
        children: [
          {
            path: '/order/good/list',
            name: 'goods-list',
            component: () => import('@/views/order/good/list/index.vue'),
            meta: {
              title: '货物列表',
              icon: 'icon-apparel'
            }
          },
          {
            path: '/order/good/check',
            name: 'goods-classify',
            component: () => import('@/views/order/good/check/index.vue'),
            meta: {
              title: '退货管理',
              icon: 'icon-add-account'
            }
          }
        ]
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:constantRoutes
})

export default router

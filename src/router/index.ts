/*
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-14 21:37:25
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-15 17:49:22
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      redirect:'/index',
      component: ()=>import('../views/Layout/Layout.vue'),
      meta:{
        title:'首页',
        icon:'icon-comments'
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
    
  ]
})

export default router

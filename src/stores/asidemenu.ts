/*
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-15 17:56:42
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-15 18:15:38
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\src\stores\asidemenu.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'

export const useAsideMenuStore = defineStore('Asidemenu', {
  state: () => {
    return {
        menuList: []
    }
  },
  actions: {
    asyncGetMenu(data:any) {
        console.log(data)
        // const 
    //   this.menuList
    },
  },
})
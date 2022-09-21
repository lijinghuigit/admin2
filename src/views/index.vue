<!--
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-14 21:48:52
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-15 17:41:51
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\src\views\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div style="color: red;">
      {{menuList[0].meta.title}}
      {{aa.menuList.value[0].meta.title}}
      {{aa.testPrimary}}
    </div>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import {useAsideMenuStore} from '@/stores/asidemenu'
  const asidemenu=useAsideMenuStore()
  const {menuList,testPrimary}=storeToRefs(useAsideMenuStore())
  console.log(menuList.value,testPrimary.value)
  console.log(415,asidemenu.menuList,asidemenu.testPrimary)
  const aa=storeToRefs(useAsideMenuStore())
  console.log(aa.menuList.value,aa.testPrimary.value)
</script>

<style>
  
</style>
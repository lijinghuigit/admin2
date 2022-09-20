<!--
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-15 17:18:55
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-15 17:52:12
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\src\views\Layout\components\AsideMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
    import {reactive, ref,computed } from 'vue';
    import SubMenu from './SubMenu.vue'
    import {useAsideMenuStore} from '@/stores/asidemenu'
    import {useRouter,useRoute} from 'vue-router'
    import {storeToRefs} from 'pinia'
    const {menuList,currentMenu}=storeToRefs(useAsideMenuStore())
    console.log(menuList.value,currentMenu)
    const router=useRouter()
    const route=useRoute()
    const goRoute=(data:any)=>{
      router.push({
        name:data.name
      })
    }
    const { matched } = router.currentRoute.value
    const openKeysList = matched.map((item) => item.name)
    const openKeys=ref(openKeysList)
</script>
<template>
    <div class="logo" />
    <a-menu v-model:selectedKeys="currentMenu" 
    theme="dark" mode="inline"
    v-model:openKeys="openKeys"> 
      <template v-for="item in menuList" :key="item.name">
          <template v-if="!item.children">
            <a-menu-item :key="item.name" @click="goRoute(item)">
              <icon-font :type="item.meta.icon" />
              <span class="nav-text">{{item.meta.title}}</span>
            </a-menu-item>
          </template>
          <template v-else>
              <sub-menu :menu-info='item' @propsClick="goRoute" :key="item.name" />
          </template>
      </template>  
    </a-menu>
</template>

<style scoped>
  .logo{
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
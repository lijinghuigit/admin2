<!--
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-14 21:37:25
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-15 17:51:38
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\src\views\Layout.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
  import { ref,onMounted } from 'vue';
  import Header  from './components/Header.vue';
  import Footer  from './components/Footer.vue';
  import AsideMenu  from './components/AsideMenu.vue';
  import VTags  from './components/VTags.vue';
  const collapsed= ref<boolean>(false)
  onMounted(()=>{
    collapsed.value=false
  })
</script>
<template>
  <a-layout has-sider style="height: 100%;">
    <a-layout-sider breakpoint="lg" 
    style="overflow: auto;"
    v-model:collapsed="collapsed" collapsible>
      <aside-menu/>
    </a-layout-sider>
    <a-layout style="">
      <a-layout-header style="padding: 0;">
         <Header />
      </a-layout-header>
      <a-layout-content style="color:#000;">
          <div style="height: 100%;">
            <v-tags/>
            <div style="height: 100%;overflow:auto;">
               <RouterView/>
            </div>
          </div>
      </a-layout-content>
      <a-layout-footer>
          <Footer/>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<style scoped>
  
  .site-layout .site-layout-background {
    background: #fff;
  }

  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
</style>

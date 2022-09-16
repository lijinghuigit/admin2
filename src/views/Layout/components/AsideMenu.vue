<!--
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-15 17:18:55
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-15 17:52:12
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\src\views\Layout\components\AsideMenu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="ts" setup>
    import { defineComponent, ref } from 'vue';
    import {
        UserOutlined,
        VideoCameraOutlined,
        UploadOutlined,
        BarChartOutlined,
        CloudOutlined,
        AppstoreOutlined,
        TeamOutlined,
        ShopOutlined,
    } from '@ant-design/icons-vue';
    import {useAsideMenuStore} from '@/stores/asidemenu'
    const selectedKeys=ref<string[]>(['4'])
    const asidemenu=useAsideMenuStore()
    // console.log(asidemenu.menuList)
</script>
<template>
    <div class="logo" />
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
        <user-outlined />
        <span class="nav-text">nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
        <video-camera-outlined />
        <span class="nav-text">nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
        <upload-outlined />
        <span class="nav-text">nav 3</span>
        </a-menu-item>
        <a-menu-item key="4">
        <bar-chart-outlined />
        <span class="nav-text">nav 4</span>
        </a-menu-item>
        <a-menu-item key="5">
        <cloud-outlined />
        <span class="nav-text">nav 5</span>
        </a-menu-item>
        <a-menu-item key="6">
        <appstore-outlined />
        <span class="nav-text">nav 6</span>
        </a-menu-item>
        <a-menu-item key="7">
        <team-outlined />
        <span class="nav-text">nav 7</span>
        </a-menu-item>
        <a-menu-item key="8">
        <shop-outlined />
        <span class="nav-text">nav 8</span>
        </a-menu-item>
    </a-menu>

</template>

<style scoped>
  .logo{
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
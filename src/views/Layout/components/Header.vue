<template>
  <div class="header" style="">
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        <user-outlined style="font-size : 24px;"/>
        <span style="font-size : 20px;">{{user.userInfor.name}}</span> 
      </a>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="logout">
            <logout-outlined />
            <a href="javascript:;">退出登录</a>
          </a-menu-item>
          <a-menu-item key="person">
            <smile-outlined />
            <a href="javascript:;">个人信息修改</a>
          </a-menu-item>
        </a-menu>
      </template>
  </a-dropdown>
    
  </div>
</template>

<script lang="ts" setup>
  import {UserOutlined,LogoutOutlined,SmileOutlined} from '@ant-design/icons-vue'
  import {useInforStore} from '@/stores/userinfor';
  import { useRouter } from 'vue-router';
  const user=useInforStore()
  const router=useRouter()
  const handleMenuClick= (e:any) => {
      if(e.key==="logout"){
        router.push('/login')
        localStorage.removeItem('useinfor')
      }else{
        
      }
  };
</script>

<style>
    .header{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #fff;
      padding-right: 20px;
      height: 100%;
    }
</style>
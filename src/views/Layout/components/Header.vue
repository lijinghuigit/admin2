<template>
  <div class="header">
    <div>
      <template v-for="(tag,index) in tagList" :key="tag">
        <a-tag closable @close.prevent="handleClose(index)"
        :color="tag.fullPath===route.fullPath?'#108ee9':''"
        @click="handleClick(tag)">
          {{ tag.title }}
        </a-tag>
      </template>
    </div>
    <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <user-outlined style="font-size : 24px;"/>
          <span style="font-size : 20px;">{{userInfor.name}}</span> 
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
  import {useAsideMenuStore} from '@/stores/asidemenu';
  import { useRouter,useRoute } from 'vue-router';
  import { watch,onMounted,ref } from 'vue';
  import { storeToRefs } from 'pinia';
  const {userInfor}=storeToRefs(useInforStore())
  const asidemenu=useAsideMenuStore()
  const {tagList}=storeToRefs(asidemenu)
  const router=useRouter()
  const route=useRoute()
  const handleMenuClick= (e:any) => {
      if(e.key==="logout"){
        router.push('/login')
        localStorage.removeItem('useinfor')
      }else{
        
      }
  };
  const RouterChange=()=>{
    const {fullPath,meta,name,matched} =router.currentRoute.value
    const isExit=tagList.value.some((item:any)=>{
      return item.fullPath===fullPath
    })
    console.log(isExit)
    if(!isExit){
      asidemenu.setTag({
        name,
        fullPath,
        title:meta.title
      })
    }
  }
  watch(
    ()=>route.fullPath,
    ()=>{
      RouterChange()
    }
  )
  const handleClose=(index:number)=>{
    if(tagList.value.length<=1){
      return
    }
    asidemenu.delCurrentTag(index)
    const item=tagList.value[index]?tagList.value[index]:tagList.value[index-1]
    console.log(item)
    if(item){
      router.push(item.fullPath)
    }else{
      router.push('/')
    }
  }
  const handleClick=(e:any)=>{
    router.push({name:e.name})
  }
  onMounted(()=>{
    RouterChange()
  })
</script>

<style>
    .header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      padding-right: 20px;
      height: 100%;
    }
</style>
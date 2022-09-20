<template>
  <div class="t_container">
      <a-breadcrumb class="breadcrumb">
        <template v-for="route in routerList" :key="route.name">
          <a-breadcrumb-item 
            v-if="!route.meta.single">
            <!-- <router-link :to="route.path"> -->
              {{ route.meta.title }}
            <!-- </router-link> -->
          </a-breadcrumb-item>
        </template>
      </a-breadcrumb>
  </div>
  
</template>

<script lang="ts" setup>
  import { useRouter ,useRoute} from 'vue-router';
  import { onMounted,watch,computed } from 'vue';
  import {useAsideMenuStore} from '@/stores/asidemenu.js'
  import {storeToRefs} from 'pinia'
  const router=useRouter()
  const route = useRoute()
  const asidemenu=useAsideMenuStore()
  const {routerList}=storeToRefs(asidemenu)
  const routeChange=()=>{ 
    const {fullPath,meta,name,path,matched} =router.currentRoute.value
    // console.log(router.currentRoute.value,fullPath,meta,name,path,matched)
    asidemenu.setRouter(matched)
    asidemenu.setCurrentRoute(name)
  }
  watch(
    () => route.path,
    (count, prevCount) => {
      routeChange()
    }
  )
  onMounted(()=>{
    routeChange()
  })
</script>

<style scoped>
  .t_container{
    height: 40px;
    background-color: #f8f8f8;
  }
  .breadcrumb{
    line-height: 40px;
  }
</style>
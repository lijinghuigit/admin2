<template>
  <div class="t_container">
    <div>
      <!-- <a-breadcrumb :routes="tagList">
        <template #itemRender="{ route, paths }">
          <span v-if="tagList.indexOf(route) === tagList.length - 1">
            {{ route.meta.title }}
          </span>
          <router-link v-else :to="route.path">
            {{ route.meta.title }}
          </router-link>
        </template>
      </a-breadcrumb> -->
      <a-breadcrumb>
        <template v-for="route in tagList" :key="route.name">
          <a-breadcrumb-item 
            v-if="route.name!='index'">
            <!-- <router-link :to="route.path"> -->
              {{ route.meta.title }}
            <!-- </router-link> -->
          </a-breadcrumb-item>
        </template>
      </a-breadcrumb>
  </div>
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
  const tagList=storeToRefs(asidemenu).routerList
  const routeChange=()=>{ 
    const {fullpath,meta,name,matched} =router.currentRoute.value
    asidemenu.setRouter(matched)
  }
  watch(
    () => route.fullPath,
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
    background-color: bisque;
  }
</style>
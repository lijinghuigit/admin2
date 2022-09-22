<template>
    {{menuList[0].meta.title}}
    {{aa.menuList.value[0].meta.title}}
    {{aa.testPrimary}}
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
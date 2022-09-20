<script setup lang="ts">
    import { MailOutlined} from '@ant-design/icons-vue';
    defineProps({
        menuInfo:{
            type:Object,
            default(rawProps:any) {
                return {}
            },
            // validator(value) {
            //     return true
            // }
        },
    })
    const emit = defineEmits(['propsClick'])
    const goRoute=(data:any)=>{
        emit('propsClick',data)
    }
</script>
<template>
    <a-sub-menu :key="menuInfo.name">
        <template #icon>
            <icon-font :type="menuInfo.meta.icon" />
        </template>
        <template #title>{{menuInfo.meta.title}}</template>
        <template v-for="item in menuInfo.children" :key="item.name">
            <template v-if="!item.children">
                <a-menu-item :key="item.name"
                @click="goRoute(item)">
                <icon-font :type="item.meta.icon" />
                {{item.meta.title}}
            </a-menu-item>
           </template> 
           <template v-else>
                <sub-menu :menu-info='item' :key="item.name"
                @propsClick="goRoute"/>
            </template>
        </template>
    </a-sub-menu>
</template>
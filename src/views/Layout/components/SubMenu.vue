<script setup>
    import { MailOutlined} from '@ant-design/icons-vue';
    defineProps({
        menuInfo:{
            type:Object,
            default(rawProps) {
                // console.log(rawProps)
                return {}
            },
            validator(value) {
                // console.log(value)
                return true
            }
        },
        key:{
            type:String,
            default:''
        },
    })
    const emit = defineEmits(['propsClick'])
    const goRoute=(data)=>{
        emit('propsClick',data)
    }
</script>
<template>
    <a-sub-menu :key="menuInfo.key">
        <template #icon>
            <MailOutlined />
        </template>
        <template #title>{{menuInfo.meta.title}}</template>
        <template v-for="item in menuInfo.children" :key="item.name">
            <template v-if="!item.children">
                <a-menu-item :key="item.name"
                @click="goRoute(item)">{{item.meta.title}}</a-menu-item>
           </template> 
           <template v-else>
                <sub-menu :menu-info='item' :key="item.name"/>
            </template>
        </template>
    </a-sub-menu>
</template>
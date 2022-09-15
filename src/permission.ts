import router from '@/router'
import {useAsideMenuStore} from '@/stores/asidemenu'
import { any, string } from 'vue-types'
const asidemenu=useAsideMenuStore()
router.beforeEach(async (to,next)=>{
    const token=localStorage.getItem('token')
    if(to.path === '/login' || to.path === '/404'|| to.path === '/403'){
        return true
    }else{
        if(!token){
            return {
                name:'login'
            }
        }else{
            // 获取侧边menu
            if(asidemenu.menuList.length==0){
                // 获取路由信息
                await asidemenu.asyncGetMenu({token})
            }else{
                return true
            }
        }
    }
})
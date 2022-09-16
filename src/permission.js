import router from '@/router'
import {useAsideMenuStore} from '@/stores/asidemenu'

router.beforeEach(async (to,next)=>{
    const asidemenu=useAsideMenuStore()
    const token=localStorage.getItem('token')
    document.title=to.meta.title
    await asidemenu.asyncGetMenu({token})
    console.log('你先吗')
    return 
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
                console.log('你先吗')
            }else{
                return true
            }
        }
    }
})
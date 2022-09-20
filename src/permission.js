import router from '@/router'
import {useAsideMenuStore} from '@/stores/asidemenu'
import {useInforStore} from '@/stores/userinfor.js'
import { storeToRefs } from 'pinia'
router.beforeEach(async (to,next)=>{
    const asidemenu=useAsideMenuStore()
    const {userInfor}=storeToRefs(useInforStore())
    const {menuList}=storeToRefs(useAsideMenuStore())
    // console.log(userInfor.value.token,to.path)
    document.title=to.meta.title
    if(to.path === '/login' || to.path === '/404'|| to.path === '/403'){
        return true
    }else{
        if(!userInfor.value.token){
            return {
                name:'login'
            }
        }else{
            // 获取侧边menu
            if(menuList.value.length==0){
                // 获取路由信息
                const accessdRoutes= await asidemenu.asyncGetMenu({token:userInfor.value.token})
                // console.log('你先吗',accessdRoutes)
                // 动态添加路由
                accessdRoutes.forEach((item)=>{
                    router.addRoute(item)
                })
                router.push({path:to.path})
                // 或者触发重定向
                // return to.fullPath
            }else{
                return true
            }
        }
    }
})
// router.afterEach((to,from,failure)=>{
//     console.log(to)
//     const asidemenu=useAsideMenuStore()
//     const routerList=to.matched
//     asidemenu.setRouter(routerList)
// })
// import type { RouteRecordRaw } from 'vue-router';
// import '../router/types/index'
export function recursionRouter(userRouter:any,allRouter:any){
    const realRouters=allRouter.filter((item: { name: string; })=>userRouter.includes(item.name))
    .map((item: { children: any; })=>({
        ...item,
        children:item.children?recursionRouter(userRouter,item.children):null
    }))
    return realRouters
}
export function setSingleItem(list:any,newList:string[]){
    newList=list.map((item: { children: string | any[] | null; meta: { single: boolean } })=>{
        if(item.children&&item.children.length>0){
            if(item.meta&&item.meta.single){
                item={...item}
                item.children=null
            }else{
                item.children=setSingleItem(item.children,newList)
            }
            return item
        }else{
            return item
        }
    })
    return newList
}
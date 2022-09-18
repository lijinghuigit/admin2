export function recursionRouter(userRouter,allRouter){
    const realRouters=allRouter.filter(item=>userRouter.includes(item.name))
    .map(item=>({
        ...item,
        children:item.children?recursionRouter(userRouter,item.children):null
    }))
    return realRouters
}
export function setSingleItem(list,newList){
    newList=list.map(item=>{
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
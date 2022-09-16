export function recursionRouter(userRouter,allRouter){
    const realRouters=allRouter.filter(item=>userRouter.includes(item.name))
    .map(item=>({
        ...item,
        children:item.children?recursionRouter(userRouter,item.children):null
    }))
    return realRouters
}
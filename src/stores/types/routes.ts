export interface routerInt {
    fullPath:string;
    name:string;
    title:string;
}
interface routerData{
    meta:{
        title:string;
        single:boolean; 
    }
}
export interface userData{
    menuList:string[];
    routerList:routerData[];
    currentMenu:string[];
    tagList:string[];
    testPrimary:string
}
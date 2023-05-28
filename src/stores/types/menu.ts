interface ResData{
    message?:string,
    code:number,
}
interface roleData{
    avatar:string;
    data:string[];
    name:string;
    roles:string[];
}
export interface roleRepData extends ResData{
    data:roleData
}
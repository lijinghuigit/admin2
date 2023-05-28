interface ResData{
    message?:string,
    code:number,
}

interface loginData{
    data:{
        token:string,
        name:string
    }
}
export interface loginResData {
    pass: string;
    name: string;
    remember?:Boolean
}
export interface LoginResData extends ResData{
    data:loginData
}
import { defineStore } from 'pinia'
interface UserState{
  userInfor:string | any
}
interface UserInfor{
  name:string;
  token:string;
}
export const useInforStore = defineStore('UserInfor', {
    state: ():UserState => {
      return {
        userInfor:localStorage.getItem('useinfor')?JSON.parse((localStorage.getItem('useinfor') as string)):{},
    }
    },
    getters:{
    },
    actions: {
        setInfor(data:UserInfor){
            this.userInfor=data
        }
    },
  })
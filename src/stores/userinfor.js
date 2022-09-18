import { defineStore } from 'pinia'
export const useInforStore = defineStore('UserInfor', {
    state: () => {
      return {
        userInfor:localStorage.getItem('useinfor')?JSON.parse(localStorage.getItem('useinfor')):{},
    }
    },
    getters:{
    },
    actions: {
        setInfor(data){
            this.userInfor=data
        }
    },
  })
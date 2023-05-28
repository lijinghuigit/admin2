/// <reference types="vite/client" />
declare module '@/api/index'
declare module '@/stores/userinfor'
declare module '@/stores/asidemenu'
declare module '@/stores/userinfor'
declare module '@/stores/asidemenu'
declare module '@/components/icon-font'
declare module '@/router/index'
declare module 'echarts';
declare module 'mockjs';
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
  


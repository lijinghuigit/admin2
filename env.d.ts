/// <reference types="vite/client" />
declare module '@/api/index.js'
declare module '@/stores/userinfor.js'
declare module '@/stores/asidemenu.js'
declare module '@/stores/userinfor'
declare module '@/stores/asidemenu'
declare module '@/components/icon-font'
declare module '@/router/index.js'
declare module 'echarts';
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
  


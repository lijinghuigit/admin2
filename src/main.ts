import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import router from '@/router/index.js';
import "./mock/index.js";
import './assets/main.css';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './permission';
import IconFont from '@/components/icon-font'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.component('IconFont',IconFont)
app.mount('#app')

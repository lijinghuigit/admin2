admin

http://www.randy168.com/detail?id=5d8863ce108d5d0c3429e670

https://github.com/loveRandy/vue-cli3.0-vueadmin

vue3+axios+vuex+vue-router+antdesign



##  一、 vue3+elementplus搭建后台；

项目地址：https://github.com/lin-xin/vue-manage-system

项目简介：

1 技术框架：

Element Plus+vite3+pinia

2 功能

>路由相关：路由权限的过滤机存储；面包屑；
>
>vue-cropperjs截图；vue-schart; 富文本及markdown;
>
>自定义全局指令（虽然没用上）；



### 1 布局

框架布局问题及html样式

> 1 整个应用采用的布局是根据elemenuiPlus的布局容器；该容器采用的是flex布局，所以对于一些不兼容性要注意；
>
> ```js
> 1 el的hidden属性，在flex布局的元素上不生效；所以权限的隐藏通过hidden属性，就可能不生效；
> ```
>
> 2 要想整个应用全屏展示，必须html，body,#app的height设置为100%；
>
> 3 el-container和el-main元素默认样式是`overflow:auto`，要使el-main元素下的div可以滚动，这两个元素要设置为`overflow:hidden`，div设置`overflow-y:scroll`且`height:100%;`
>
> 4 el-aside可以设置固定宽度，但如果左侧menu是可以折叠的，则不要设置固定宽度，设置为`width:auto;`,
>
> 而对于展开的宽度，通过`el-menu`元素的`xx:not(.el-menu--collapse)`设置width宽度；
>
> 左侧高度保持和整个应用是100%，要设置el-menu下的ul元素为100%且el-menu的最外部元素也是100%；
>
> 5 对于icon的一些上下不居中，可设置`display:block;`
>
> 6 侧边menu的渲染，是将静态的所有路由数据跟获取到的权限过滤，从而进行渲染；权限数据存放在store中；

###  2 路由

1 以home为主页，其子路由都是main的内容；如`path:'/dashboard'`为第一个子路由，也是应用开启默认展示的首页；所以当path为'/'时，redirect跳转到'/dashboard';

2 路由的跳转，不需要加上一级，二级的路由名称，直接跳转path即可；

3 对于其他login，404等路由，都是一级路由，不需要添加到home路由中；

4 对于页面title和permiss等参数，在每个路由的meta中添加；

在路由的全局守卫`beforeEach`中获取，进行权限的判断和title的赋值；

#### 2.1 权限的操作

> ** 没有token或角色标识，以及路由的path不是登录，则跳转login；
>
> ** 通过登录获取权限，进行权限的过滤，从而跟每个路由的权限进行匹配，匹配则`return true`，不匹配则`return {name:'403'}`
>
> ** 登录后，将权限通过store进行处理；

将权限数据存放到store中，store中的数据有两种方式操作：

** 通过本地存储来保证页面刷新时，数据依然存在；

** 通过操作action来修改store中的数据，其中登录之后，不仅要将权限存储到本地，还需要通过action去处理state；

以上两种方式都必不可少；

所以整个路由权限和侧边menu的处理方式就是：

在每个路由上标注相对应的权限，通过服务端获取的权限列表并存储到本地和store中，对于路由的访问，在beforeEach中进行拦截判断；侧边menu，将静态数据和获取到的权限列表进行过滤，从而完成渲染；

#### 2.2  404匹配

```js
//这就是404的匹配
{
      path:'/:pathMatch(.*)*',
      name:'404',
      meta: {
        title: '404',
      },
      component: () => import('../views/404.vue'),
 }
```



### 2 vue-schart引入

[sChart.js中文文档](https://lin-xin.gitee.io/example/schart/)

报错1：

```js
 // 在页面中导入时，
// 报：无法找到模块“vue-schart”的声明文件
import Schart from 'vue-schart';
```

解决：在src下新建vite-env.d.ts文件

```js
/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
 declare module 'vue-schart';
```

报错2：

控制台报`The requested module xx does not provide an export named 'default'`

解决：那个模块报错，则将其配置

```js
// vite.config.js
optimizeDeps: {
    // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。
	include: ['schart.js'] //强制预构建链接的包
}
```



### 3 面包屑的获取

面包屑的实现是通过对路由的监听所实现的；

```js
import { useRoute,useRouter } from 'vue-router';
 const route=useRoute()
 const router=useRouter()
watch(
    ()=>route.fullPath,
    ()=>{
        routeChange()
    }
  )
const routeChange=()=>{
    console.log(router)
    const {fullPath, meta, name} =router.currentRoute.value
    // 判断当前路由是否已存在store中
    const isExit=tags.list.some(item=>{
        return item.path===fullPath
    })
    if(!isExit){
        //将当前路由添加到整个tags中，实现面包屑的变化
        tags.setTagsItem({
            name:name,
            title:meta.title,
            path:fullPath
        })
    }
  }
```



### 4 路由的过滤

```js
//静态路由数据和权限过滤
export function recursionRouter(Permiss,allRouter){
    const realRoutes=allRouter.filter(item=>Permiss.includes(item.permiss))
    .map(item1=>({
      ...item1,
      subs:item1.subs?
      recursionRouter(Permiss,item1.subs):null
    }))
    return realRoutes
}
```

### 5 自定义指令

根据权限自定义指令来隐藏侧边menu的展示：

这种方式是通过元素的hidden属性来隐藏元素；但对于flex布局的元素不生效；

```js
//main.ts
import { usePermissStore } from './store/permiss'
const permiss = usePermissStore()
app.directive('permiss', {
    mounted(el, binding) {
        if(!permiss.key.includes(String(binding.value))){
            el['hidden'] = true;
        }
    }
})
// 使用
<el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
    <el-icon>
   	   <component :is="item.icon"></component>
	</el-icon>
	<template #title>{{ item.title }}</template>
</el-menu-item>
```

### 6 富文本编译器

[wangEditor](https://www.wangeditor.com/)

### 7 markdown编译器

 [md-editor-v3](https://imzbf.github.io/md-editor-v3/index)

### 8 vue-cropper

这个是另一种方式：https://github.com/xyxiao001/vue-cropper

以下案例借用该文档：https://github.com/Agontuk/vue-cropperjs

```js
npm install --save vue-cropperjs
// 组件中使用 vue3.0
 import VueCropper from 'vue-cropperjs';
 import 'cropperjs/dist/cropper.css';
 import { ref } from 'vue'

// 截取后的图片
  const cropImg = ref('');
  const cropper = ref();
  const imgSrc = ref('');//source url，即未发生变化前的图片url
 // 截取移动时触发
  const cropImage = () => {
	  cropImg.value = cropper.value.getCroppedCanvas().toDataURL();//图片截取之后的url
  };
//在最后保存截图的图片时，还是要将路径赋值给cropImg.value；
const setImage=(e)=>{
    imgSrc.value = e.target.result
    cropper.value && cropper.value.replace(e.target.result);
}

 <vue-cropper
      ref="cropper"
      :src="imgSrc"
      alt="Source Image"
      @ready="cropImage"
      @cropmove="cropImage"
      @zoom="cropImage"
      style="width: 100%; height: 400px"
    >
   </vue-cropper>
```



### 9 FileReader对象

#### 9.1 input的file类型

关于input的file类型：

`<input type="file" id="file">`

input的file类型会渲染为一个按钮和一段文字。点击按钮可打开文件选择窗口

文字表示对文件的描述（大部分情况下为文件名）；file类型的input会有files属性，保存着文件的相关信息。

```js
document.querySelector('#file').addEventListener('change',(e) => {
    console.log('e', e.target.files)    
})
// 每个file对象包含：
lastModified：数值，表示最近一次修改时间的毫秒数；
lastModifiedDate：对象，表示最近一次修改时间的Date对象；
name：本地文件系统中的文件名；
size：文件的字节大小；
type：字符串，文件的MIME类型；
```

如果input上加上webkitdirectory属性时，用户可选择文件夹；此时的file对象中则存在`webkitRelativePath`

webkitRelativePath表示文件夹中文件的相对路径。

```js
<input type="file" id="file" webkitdirectory>
```





#### 9.2 关于FileReader：

FileReader是一种异步文件读取机制，结合input:file可以很方便的读取本地文件。

```js
// 创建一个FileReader实例：
const reader = new FileReader();
```

**FileReader提供了如下方法：**

> 1 readAsArrayBuffer(file)
> 按字节读取文件内容，结果用ArrayBuffer对象表示
> 2 readAsBinaryString(file)
> 按字节读取文件内容，结果为文件的二进制串
> 3 readAsDataURL(file)
> 读取文件内容，结果用data:url的字符串形式表示
> 4 readAsText(file,encoding)
> 按字符读取文件内容，结果用字符串形式表示
> 5 abort()
> 终止文件读取操作

**FileReader事件：**

> **onloadstart** 当读取操作开始时调用
> **onprogress** 在读取数据过程中周期性调用
> **onabort** 当读取操作被中止时调用
> **onerror** 当读取操作发生错误时调用
> **onload** 当读取操作成功完成时调用
> **onloadend** 当读取操作完成时调用，无论成功，失败或取消

```js
document.querySelector('#file').addEventListener('change',(fileChoosed) => {
    const reader = new FileReader();
    //先要读取文件，才会触发以下的事件
    reader.readAsText(fileChoosed.target.files[0],'utf-8');//发起异步请求
    reader.onloadstart = function(readRes){
    	// 文件大于500kb则取消加载
        if(readRes.total > 1024*500) {            
            reader.abort()
        } else {
            console.log("开始加载")
        }
    }
    reader.onabort = function (readRes) {
        console.log('加载已取消')
    }
    reader.onprogress = function(readRes){
        console.log("加载中", `${(readRes.loaded / readRes.total).toFixed(2)*100}/100`)
    }
    reader.onload = function(readRes){
        console.log('加载成功'，readRes.target.result)// 输出文件内容；如果是readAsDataURL请求，则输出图片的base64
    }
    reader.onloadend= function(readRes){
        console.log("加载结束")
    }            
})
```



## 二、 vue3+antdesignVue

### 1 功能：

账号为admin可以看到所有路由；其他则只能看到固定路由；

- `路由懒加载`
- `根据权限生成动态路由`
- `全局数据请求拦截处理及loading`
- `多个代理配置`
- 抽离第三方库文件dll

### 2 技术

vue3.0+ant design Vue+axios+vue Router+pinia+echarts+core-js;

### 3  路由

#### 1 路由数据

思路： 将路由分为公共路由和动态权限路由；公共路由默认配置到路由规则中，权限路由则根据角色权限进行动态添加；

具体操作：

> 1 在项目初始化时，通过路由的全局前置守卫来进行权限路由的获取；
>
> 先进行是否登陆的判断，未登录，跳转login，登陆则获取store中存储的menuList;
>
> 这里可以在将全局前置守卫生成一个模块，在main.js中引入；
>
> > 1 通过服务端获取角色权限，和全局的权限路由进行匹配，匹配出已获取的路由；
> >
> > 2 将过滤出来的动态权限进行遍历动态添加；
> >
> > 3 对于侧边menu数据的处理，将上面过滤出来的动态路由和公共路由合并，并将不需要再侧边展示的路由去掉（eg:login,404,error等路由）；对于路由的处理要跟menu的数据格式匹配；
> >
> > 4 以上的侧边menu数据，是存储在store中的；即便页面进行刷新，也会重新将上述流程操作一遍；
>
> 注意点：
>
> > 1 服务器根据角色返回动态路由的name,客户端之前有预备动态路由，客户端的预备路由和服务端路由进行匹配；
> >
> > 2 动态路由是需要addRoute的，否则不能生效的；所以在动态路由最后过滤出来后，就要addRoute；尽管添加了动态路由，还要router.push(path)才能最终显示该路由的组件；
> >
> > 3 这里注意的是，服务端返回的路由是数组形式，即一级，二级，多级路由都是在一个一维数组中；所以这里要对路由匹配的同时，将动态路由的多级进行处理；
>
> 

#### 2 路由的编写：

一、第一种方式：

1 整个路由的展示都会在App.vue填的RouterView的位置展示；

2 子路由都会在其父路由的RouterView位置处展示的；所以首页搭建好基本结构，然后将需要路由组件渲染的路由写成首页的子路由；当然不需要再首页中展示的，例如login路由与index同级；

同理三级路由的展示也是会在耳机路由的router-view位置处展示的；

3 通常首页的path都会redirect到其第一个子路由中，否则只会展示首页的结构，不能渲染出路由内容；

```js
{
    path: '/', //或者写空''
    name: 'Index',
    redirect:'/index',
    component: Layout,
    meta:{
      title:'首页',
      icon:'icon-comments',
      single:true
    },
    children:[
      {
        path: '/index',
        name: 'Index',
        component: ()=>import('../views/index.vue'),
        meta:{
          title:'首页',
          icon:'icon-youxiang'
        }
      },
    ]
  },
```

第二种方式：

动态路由的编写：

直接写二级路由，不写一级路由，最后在处理动态路由时，将动态路由添加到一级路由下就行；

这种方式跟第一种方式不同的是，动态路由编写时，加上了一级路由；

所以不同的编写，数据的处理都是不同的，但最终的结果就是动态路由的渲染也是在一级路由的子路由下；



### 4 侧边栏

侧边栏的处理主要涉及到子路由（children）的问题，

通过对children的遍历来展示子路由；

```js
// AsideMenu.vue
<a-menu v-model:selectedKeys="currentMenu" 
    theme="dark" mode="inline"
    v-model:openKeys="openKeys"> 
      <template v-for="item in menuList" :key="item.name">
          <template v-if="!item.children">
            <a-menu-item :key="item.name" @click="goRoute(item)">
              <icon-font :type="item.meta.icon" />
              <span class="nav-text">{{item.meta.title}}</span>
            </a-menu-item>
          </template>
          <template v-else>
              <sub-menu :menu-info='item' @propsClick="goRoute" :key="item.name" />
          </template>
      </template>  
    </a-menu>
```

```js
//SubMenu.vue
<a-sub-menu :key="menuInfo.name">
        <template #icon>
            <icon-font :type="menuInfo.meta.icon" />
        </template>
        <template #title>{{menuInfo.meta.title}}</template>
        <template v-for="item in menuInfo.children" :key="item.name">
            <template v-if="!item.children">
                <a-menu-item :key="item.name"
                    @click="goRoute(item)">
                    <icon-font :type="item.meta.icon" />
                    {{item.meta.title}}
                </a-menu-item>
           </template> 
           <template v-else>
                <sub-menu :menu-info='item' :key="item.name"
                @propsClick="goRoute"/>
            </template>
        </template>
    </a-sub-menu>
```

这里要注意的是，子组件是可以自身复用的；函数也是一样，可以调用自身的；



### 5 导入ant-design Vue:

https://github.com/umijs/babel-plugin-import

### 6 面包屑

在面包屑组件中，watch路由的变化，以及onMounted中获取路由的相关信息；

通常面包屑会是数组形式，所以在对面包屑进行渲染的时候，要判断已存在的面包屑数组中是否存在当前路由，存在则插入，不存在则不插入；

**关闭某个路由时：**

1 判断整个面包屑数组是否<=1，如果是，则不做处理；

2 否则的话，将该路由从数组中删除；

且将要删除的路由的index，从数组中找出，获取到要删除的路由上一个路由，并router.push；

### 7 全局数据请求拦截处理及loading

1 创建axios实例及拦截器

```js
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getLocal } from '@/utils'
import { message } from 'ant-design-vue'
const baseURL = process.env.NODE_ENV === 'production' ? '/' : '/api'
//创建axios实例
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 200000, // 请求超时时间
  withCredentials: true, // 选项表明了是否是跨域请求
  validateStatus (status: number) {
    switch (status) {
      case 400:
        message.error('请求出错')
        break
      case 401:
        message.warning('授权失败，请重新登录')
        localStorage.removeItem('token')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        break
      case 403:
        message.warning({
          message: '拒绝访问'
        })
        break
      case 404:
        message.warning({
          message: '请求错误,未找到该资源'
        })
        break
      case 500:
        message.warning({
          message: '服务端错误'
        })
        break
    }
    return status >= 200 && status < 300
  }
})

//请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求头添加token
    const token = getLocal('token')
    if (token) {
        //请求头添加token
      config.headers.Authorization = `Bearer ${token}`
    }
    const flag =
      (config.data && config.data.loading !== false) ||
      (config.params && config.params.loading !== false)
    if (flag) {// 添加loading
      let loading: any = undefined
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block'
    }
    return config
  },
  (err: any) => {
    console.log('请求失败')
    return Promise.reject(err)
  }
)

//响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // 清除loading
    const ele: any = document.getElementById('ajaxLoading')
    ele.style.display = 'none'
    switch (res.code) {
      case 1:
        return res
      case 401:
        message.error(res.message)
        return Promise.reject('error')
      default:
        message.error(res.message)
        return Promise.reject('error')
    }
  },
  (error: { message: any }) => {
    const ele: any = document.getElementById('ajaxLoading')
    ele.style.display = 'none'
    console.log(error.message)
    // 抛出错误
    return Promise.reject(error)
  }
)
export default service
```

api

```js
import request from '@/utils/axios'
import { AxiosRequestConfig } from 'axios'

export const getRoleList = () => {
    const obj:AxiosRequestConfig = {
        url:'/user/info',
        method:'get'
    }
  return request(obj)
}

export const doLogin = (data:any) => {
    const obj:AxiosRequestConfig = {
        url:'/user/login',
        method:'post',
        data
    }
  return request(obj)
}

```

数据请求

```js
import { getRoleList } from '@/api'
const res = await getRoleList()
```



### 5 pinia

#### 1 报错

pinia被外部js引入时，报

```js
getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
```

解决方法是，将pinia的调用放到函数里；

```js
import {useStore} from '@/stores/counter'
export default function aa(){
    const user =useStore()
    user.count++
}
// 如果将const user =useStore()写在函数外部，则会报上面的错误；
```

例如在router的beforeEach中使用pinia，则要保证将调用放在将始终在 pinia 安装后运行的函数中来*推迟*调用

```js
import { createRouter } from 'vue-router'
const router = createRouter({
  // ...
})

// ❌ Depending on the order of imports this will fail
const store = useStore()

router.beforeEach((to) => {
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const store = useStore()

})
```

#### 2 取值问题

##### 2.1 storeToRefs

如果直接从pinia中解构数据，会丢失数据的响应式，所以使用storeToRefs可以保证解构出来的数据也是响应式的；

**第一种写法**

```js
如果是这种形式：
const {menuList,currentMenu}=storeToRefs(useAsideMenuStore())
在组件中使用
<div>{{currentMenu}}</div>
<div>{{menuList}}</div>
但是这个要是在js中使用，必须要.value
console.log(menuList.value.length)
如果解构出来的数据是对象形式，则必须先.value，才能再去对象中的key:
const {userInfor} =storeToRefs(useInforStore())
console.log(userInfor.value.token)

但是对于action的操作，是不需要storeToRefs进行调用的；只针对于state，getters;
```



**第二种写法**(不推荐)

```js
但如果是这种写法：
const asidemenu=storeToRefs(useAsideMenuStore())

在组件中使用asidemenu中的数据时，
<div>{{asidemenu.currentMenu.value}}</div>
<div>{{asidemenu.menuList.value}}</div>
<div>{{asidemenu.testPrimary}}</div> //'基础数据类型'


这个要注意的是：如果store 存储的是对象形式，先取key，再.value,而且在模板中使用也是要.value的；如果存储的是字符串等基本类型，则模板中使用时，则不需要.value;
但无论什么数据类型，在js中使用时，都要.value
```



#### 2.2 其他情况

```js
//如果store没有被storeToRefs调用，则取值时，直接.key即可；不需要.value;
import {useAsideMenuStore} from '@/stores/asidemenu'
const asidemenu=useAsideMenuStore()
console.log(asidemenu.menuList,asidemenu.testPrimary)
// [1,2,3],'基本类型'
```



### mock

mock是生成随机数据，拦截Ajax请求的框架；

所以使用axios来调取mock模拟的路径时，拦截器也是会响应的；

[具体mock的配置](https://github.com/nuysoft/Mock/wiki/Mock.mock())参考



### 6 tsconfig.json



### 7 devTools报错：

1 报如下错误

```js
DevTools failed to load source map: Could not load content for http://127.0.0.1:5173/antd.css.map: HTTP error: status code 404, 
```

在控制台中找到设置，`Enable CSS source maps`,不勾选；如果是js.map问题，则找到`js source map`，不勾选；

2 关于控制台不出现vue选项：

更新vue devtools后，要重新启动Google；





### 8 ts报错

TypeScript引入js第三方包，无法找到模块“xxx.js”的声明文件 xxx隐式拥有 “any“ 类型

项目使用的是ts，但在引入js时，会报错：`无法找到模块“xxx.js”的声明文件 xxx隐式拥有 “any” 类型`，而且打包时，也会报错；

解决：

在项目中新建一个env.d.ts文件：在文件中主动声明引入的module：

```js
// 在组件中导入js报错：
import {doLogin} from '@/api/index.js';

// 在env.d.ts中声明：
declare module '@/api/index.js'
```

### 9 echarts

[echatrs](https://echarts.apache.org/handbook/zh/basics/download)

```js
npm install echarts --save
或者从CDN引入：
// index.html
 <script src="https://www.jsdelivr.com/package/npm/echarts"></script>


// 项目中使用：
<div id="main" style="width: 600px;height:400px;">      
</div>
import * as echarts from 'echarts';
 var myChart = echarts.init(document.getElementById('main'));

// 如果上面两个有报错的话，在env.d.ts中做声明：
declare module 'echarts';

// 使用
myChart.setOption({
    ...配置
});
```

注意：

定义容器时，要有宽高，否则会不显示的；

或者也可以这样导入：

在 https://www.jsdelivr.com/package/npm/echarts 选择 `dist/echarts.js`，点击并保存为 `echarts.js` 文件。

然后再index.html中导入

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- 引入刚刚下载的 ECharts 文件 -->
    <script src="echarts.js"></script>
  </head>
</html>
```











####  报错

报错1 

```js
Uncaught (in promise) Error: Initialize failed: invalid dom.
```

原因：由于echarts在初始化化时是需要获取dom的，所以在图表初始化的时候获取不到dom的时候就会出现这样的报错。

解决：将echarts的初始化，放到onMounted钩子中，不要放到外面；

















## git相关



### 1 git 忽略文件：

如果项目的某些文件已经被git所追踪，那么.gitignore的规则则对这些文件不起作用；所以要使规则对这些文件生效，则需要删除缓存：之后，在规则中添加则生效：

```js
git rm -r --cached 路径/文件名
```

规则：

> 注释使用 **#** 开头，后面跟注释内容
>
> ```js
> # 以下是忽略的文件
> ```
>
> / 结束的模式只匹配文件夹以及在该文件夹路径下的内容，但是不匹配该文件
>
> / 开始的模式匹配项目跟目录
>
> 如果一个模式不包含斜杠，则它匹配相对于当前 .gitignore 文件路径的内容，如果该模式不在 .gitignore 文件中，则相对于项目根目录
>
> ** 匹配多级目录，可在开始，中间，结束
>
> ? 通用匹配单个字符
>
> [] 通用匹配单个字符列表



```js
bin/ 忽略当前路径下的bin文件夹，该文件夹下的所有内容都会被忽略，不忽略 bin 文件
/bin 忽略根目录下的bin文件
/*.c 忽略 cat.c，不忽略 build/cat.c
debug/*.obj 忽略 debug/io.obj，不忽略 debug/common/io.obj 和 tools/debug/io.obj
**/foo: 忽略/foo, a/foo, a/b/foo等
a/**/b: 忽略a/b, a/x/b, a/x/y/b等
!/bin/run.sh: 不忽略 bin 目录下的 run.sh 文件
*.log: 忽略所有 .log 文件
config.php: 忽略当前路径的 config.php 文件
```

规则示例：

```js
在已忽略文件夹中不忽略指定文件夹：
/libs/*
!/libs/extend/

在已忽略文件夹中不忽略指定文件
/libs/*
!/libs/extend/fastjson.jar

只忽略libs目录，不忽略libs文件：
libs/

忽略libs文件，不忽略libs目录：
libs
!libs/

忽略所有的.jar结尾文件：
*.jar

忽略.a或.A文件，不包含demo.a文件：
*.[aA]
!demo.a
```

规则语法：

1. 空格不匹配任意文件，可作为分隔符，可用反斜杠转义；
2. 以井号`#`开头的文件标识注释，可以使用反斜杠进行转义
3. 以斜杠`/`开头表示目录；
4. 以星号`*`通配多个字符；
5. 以问号`?`通配单个字符；
6. 以方括号`[]`包含单个字符的匹配列表；
7. 以叹号`!`表示不忽略（跟踪）匹配到的文件或目录；





### 2 sourcetree:

1 拉取pull：Pull 从远程拉取最新版本到本地，会自动合并代码；fetch+merge;

2 获取fetch:  fetch 从远程获取最新版本到本地，不会自动合并;

```js
拉取（pull）会把你本地仓库没有 而远程仓库有的更新写到你本地中;
获取（fetch）的用处更多的是用来查看对于你本地仓库的状态来说远程仓库是否有更新，仅此而已，并不会使你的本地仓库发生改变
```

*在实际使用中，git fetch更安全一些
因为在merge前，我们可以查看更新情况，然后再决定是否合并*

在sourcetree使用获取（fetch）时，先获取之后，会在本地分支，例如master上会有小箭头，表示有更新要拉取到本地工作区副本；然后再远程分支上右键与当前对比，则可以看出远程与本地的差异，再视情况，进行合并，点击拉取即可完成；



3 git架构图：

![git架构图](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-62ec721a-a0ff-4726-a9f0-0e206b972095/2e2eab73-4526-4295-a7b3-3f323b5755e8.jpg)



**[暂存区](https://www.zhihu.com/search?q=暂存区&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A625881308})(stage area, 又称为索引区index)，**是git中一个非常重要的概念。是我们把修改提交版本库前的一个过渡阶段。查看GIT自带帮助手册的时候，通常以index来表示暂存区。在工作目录下有一个.git的目录，里面有个index文件，存储着关于暂存区的内容。git add命令将工作区内容添加到暂存区。

**本地仓库(local repository)，**版本控制系统的仓库，存在于本地。当执行git commit命令后，会将暂存区内容提交到仓库之中。在工作区下面有.git的目录，这个目录下的内容不属于工作区，里面便是仓库的数据信息，暂存区相关内容也在其中。这里也可以使用merge或[rebase](https://www.zhihu.com/search?q=rebase&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A625881308})将**远程仓库副本**合并到本地仓库。图中的只有merge，注意这里也可以使用rebase。

**远程版本库(remote repository)，**与本地仓库概念基本一致，不同之处在于一个存在远程，可用于远程协作，一个却是存在于本地。通过push/pull可实现本地与远程的交互；

**远程仓库副本，**可以理解为存在于本地的远程仓库缓存。如需更新，可通过git fetch/pull命令获取远程仓库内容。使用fech获取时，并未合并到本地仓库，此时可使用git merge实现远程仓库副本与本地仓库的合并。git pull 根据配置的不同，可为git fetch + git merge 或 git fetch + git rebase。

这个其实主要储存了远程仓库各分支数据在本地的一个副本，你可以打开你 Git 项目下的 .git 文件，里面有个 refs/remotes，这里就主要存的就是远程仓库的分支信息，一般你执行 push 或者 pull、fetch 都会往这里进行更新。



怎么用：

特定时候，可能我们只是想把远端仓库对应分支的变更拉到本地而已，并不想自动合并到我的工作区（你当前正在进行代码变更的工作区），等晚些时候我写完了某部分的代码之后再考虑合并，那么你就可以先使用 `git fetch`。fetch 完毕之后，我提交了自己当前工作去的变更到本地仓库，然后想合并一下远端分支的更改，这个时候执行一下 `git merge origin/[当前分支名]`（默认一般是用 origin 表示远端的分支前缀）即可。



![git架构图2](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ccbed12fcbc4f7594878d143ef03ded~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)



git文章：https://juejin.cn/post/7131713973572861966#heading-0

一些命令：

git rm

> 比如我们项目中有个文件叫 .env，这个文件是一个私有的，不能被提交到远程的，但是我们不小心提交到了本地仓库中，这个时候我们把这个文件添加到 .gitignore 文件中，表示需要被 git 忽略提交，但是由于我们已经提交到本地仓库了，所以如果不先从 git 仓库删除是没用的。
>
> 如果直接右键删除，那么这个文件的记录还是会被保存到远端仓库，别人还是能看得到你这个信息，所以我们需要先从 git 仓库中删掉这个文件才行。
>
> - `git rm .env`：执行完这个命令就表示 .env 文件从 git 仓库中删除了，配合 .gitignore 就能保证以后所有的 .env 文件变更都不用担心被提交到远程仓库。
> - `git rm -r dist`：如果我们要删除的是一个目录，那么加上 -r 参数就好了。

git remote

用于和远程仓库进行关系绑定处理等等操作。

> - `git remote add`: 添加一个远程版本库关联
> - `git remote rm`: 删除某个远程版本库关联
>
> 例如：
>
> `git remote add origin xxx.git`先添加到本地仓库
>
> `git push -u origin master`：表示把当前仓库的 master 分支和远端仓库的 master 分支关联起来，后面我们执行 push 或者 pull 都可以非常方便的进行操作了。
>
> 

4 版本回退：

代码提交错误，想放弃刚刚提交的部分，此操作在本地仓库中完成；

路径：右键-重置当前提交到此次分支-强行合并；

5 merge和rebase:





















**服务端渲染（ssr）**，是指由服务器端完成页面的**HTML** 结构拼接，并且直接将拼接好的**HTML**发送到浏览器，然后为其绑定状态与事件，成为完全可交互页面的处理技术。

服务端渲染出html结构的脚本，客户端将结构挂载到app上；


































/*
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-14 21:37:25
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-20 17:01:51
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), vueJsx(),
    VitePWA({
      registerType: 'autoUpdate',  
      manifest: {
        name: '后台管理',
        short_name: 'Administrator',
        description: 'My Administrator App is Frist',
        theme_color: '#ffffff',//Web App的主题色
        icons: [
            {
                src: '/192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/512.png',
                sizes: '512x512',
                type: 'image/png'
            }
         ],
        display: "standalone",
        start_url: "/"
      },
      workbox: {
          skipWaiting: true,
          clientsClaim: true,
        // 预缓存清单
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'], //默认会缓存css,js和html资源
          // runtimeCaching:[
          //   {
          //       urlPattern: /^https:\/\/doctor\.shoyii\.com\/.*/i,
          //       handler: 'NetworkFirst',
          //       options: {
          //             cacheName: 'jsdelivr-images-cache',
          //             // 有的时候缓存会变动，有点资源变动后以后都用不着了，得清除出去，所以可以设置过期时间。
          //             expiration: {
          //                 maxEntries: 10,
          //                 maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
          //             },
          //             cacheableResponse: {
          //                 statuses: [0, 200],
          //             },
          //       },
          //   },
          // ]
        }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

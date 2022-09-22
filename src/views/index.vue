<!--
 * @Author: ljh 760995421@qq.com
 * @Date: 2022-09-14 21:48:52
 * @LastEditors: ljh 760995421@qq.com
 * @LastEditTime: 2022-09-15 17:41:51
 * @FilePath: \cloudmusice:\学习记事本\vue-admin\admin2\src\views\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="bar" style="width: 600px;height:400px;"> 
    </div>
    <div id="line" style="width: 600px;height:400px;"> 
    </div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts';
  import { onMounted } from 'vue';
  // 导入主题文件
  // import themeJSON from '@/assets/purple-passion.project.json'
  import themeJSON from '@/assets/wonderland.project.json'
  const getBar=()=>{
      // 注册主题
    echarts.registerTheme('defineTheme',themeJSON.theme);
    var dom=document.getElementById('bar')
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(dom, 'defineTheme');// 内置的dark
    // // 指定图表的配置项和数据
    var option = {
      title: {
        text: '标题展示'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ],
    };
      // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  const getLine=()=>{
    var dom=document.getElementById('line')
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(dom, 'dark');// 内置的dark
    // // 指定图表的配置项和数据
    var option = {
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E']
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 43, 49],
          type: 'line',
          stack: 'x',
          areaStyle: {}
        },
        {
          data: [5, 4, 3, 5, 10],
          type: 'line',
          stack: 'x',
          areaStyle: {}
        }
      ]
    };
      // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  onMounted(()=>{
    getBar()
    getLine()
  })
    
  
  


</script>

<style>
  
</style>
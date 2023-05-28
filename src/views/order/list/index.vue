<template>
  <div>
          <span id="first_f">第一步</span>
          <span id="second_f">第二步</span>
          <span id="third_f">第三步</span>
     </div>
     <div @click="guide">订单列表</div>
</template>

<script setup >
    import Driver from 'driver.js' // import driver.js
    import 'driver.js/dist/driver.min.css'
    import {ref,onMounted} from 'vue'
     import steps from './steps'
     let driver=ref(null) 
     onMounted(()=>{
          driver.value=new Driver({
          })
     })
     const guide=()=>{
          setTimeout(() => {
               driver.value.defineSteps(steps)
               driver.value.start()
          }, 100);
         
     }
</script>

<style>

</style>
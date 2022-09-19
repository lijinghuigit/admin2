<template>
      <a-form
      ref="formRef"
      name="custom-validation"
      :model="formState"
      autocomplete="off"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
    >
      <a-form-item has-feedback label="Name" name="name">
        <a-input v-model:value="formState.name" type="text" autocomplete="off" />
      </a-form-item>
      <a-form-item has-feedback label="Password" name="pass">
        <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
      </a-form-item>
      <a-form-item name="remember" :wrapper-col="{ span: 14, offset: 4}">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
</template>

<script lang="ts" setup>
  import type { Rule } from 'ant-design-vue/es/form';
  import { defineComponent, reactive, ref } from 'vue';
  import type { FormInstance } from 'ant-design-vue';
  import {doLogin} from '@/api/index';
  import { message } from 'ant-design-vue';
  import {useRouter} from 'vue-router'
  import {useInforStore} from '@/stores/userinfor.js'
  import {useAsideMenuStore} from '@/stores/asidemenu.js'
  import { onMounted } from 'vue';
  interface FormState {
    pass: string;
    name: string;
    remember:Boolean;
  }
  const user=useInforStore()
  const asidemenu=useAsideMenuStore()
  const router=useRouter()
  const formRef = ref<FormInstance>();
  const formState = reactive<FormState>({
    pass: '',
    name: '',
    remember:true
  });
  
  let validatePass = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('Please input the password again');
    } else if (value !== formState.pass) {
      return Promise.reject("Two inputs don't match!");
    } else {
      return Promise.resolve();
    }
  };
  let checkName = async (_rule: Rule, value: string) => {
    if (value === '') {
      return Promise.reject('Please input the Name again');
    } else {
      return Promise.resolve();
    }
  };
  const rules: Record<string, Rule[]> = {
      pass: [{ required: true, validator: validatePass, trigger: 'change' }],
      name: [{ required: true, validator: checkName, trigger: 'change' }],
  };
  const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
  };
  const handleFinish =async (values: FormState) => {
      console.log(values, formState);
      const res=await doLogin(values)
      message.info(res.message)
      if(res.code===1){
        localStorage.setItem('useinfor',JSON.stringify(res.data))
        user.setInfor(res.data)
        router.push('/')
      }
  };
  onMounted(()=>{
    // 清除store中数据
    user.$reset()
    asidemenu.$reset()
  })
</script>

<style>
  
</style>
<template>
  <div class="pc-login">
    <ElForm
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
    >
      <ElFormItem label="登录："></ElFormItem>
      <ElFormItem label="用户名" prop="username">
        <ElInput v-model="ruleForm.username"></ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="password" type="password" show-password>
        <ElInput v-model="ruleForm.password"></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submitForm(ruleFormRef)"
          >Create</ElButton
        >
        <ElButton @click="resetForm(ruleFormRef)">Reset</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import type { ElForm } from 'element-plus'
import { requestUserLogin } from '@/services/user'
import { setCookie } from '@/assets/utils/cookie'

export default defineComponent({
  name: 'PcPageLogin',
  setup () {
    type FormInstance = InstanceType<typeof ElForm>

    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive({
      username: '',
      password: ''
    })
    const rules = reactive({
      username: [
        {
          required: true,
          message: 'Please input Activity username',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: 'Please input Activity Password',
          trigger: 'blur'
        }
      ]
    })
    const submitForm = (formEl: FormInstance | undefined) => {
      // eslint-disable-next-line no-useless-return
      if (!formEl) return
      formEl.validate(async (valid: unknown) => {
        if (valid) {
          const { data } = await requestUserLogin(ruleForm)
          if (data.code === 0) {
            setCookie('accessToken', data.token, 60 * 60 * 1, 'localhost')
          }
        } else {
          return false
        }
      })
    }
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    return {
      rules,
      ruleFormRef,
      ruleForm,
      submitForm,
      resetForm
    }
  }
})
</script>

<style lang="scss" scoped>
.pc-login {
  padding-top: 20px;
  width: 500px;
  margin: 0 auto;
}
</style>

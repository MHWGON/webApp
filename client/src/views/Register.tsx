import { defineComponent, ref, reactive } from 'vue'
import { ElMessage, ElForm as ElFormElem, ElForm, ElFormItem, ElButton, ElInput } from 'element-plus'
import { requestUserRegister } from '@/services/user'

export default defineComponent({
  setup () {
    type FormInstance = InstanceType<typeof ElFormElem>
    const ruleFormRefTsx = ref<FormInstance>()

    const ruleFormTsx = reactive({
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

    const submitFormTsx = () => {
      if (!ruleFormRefTsx.value) return
      ruleFormRefTsx.value.validate(async (valid: unknown) => {
        if (valid) {
          // eslint-disable-next-line
          const model = ruleFormRefTsx.value?.model!
          const { data } = await requestUserRegister(model)
          if (data.code === 0) {
            ElMessage({
              type: 'success',
              showClose: false,
              message: data.mes,
              center: true
            })
          } else {
            ElMessage({
              type: 'error',
              showClose: false,
              message: data.mes,
              center: true
            })
          }
        } else {
          return false
        }
      })
    }

    const resetFormTsx = () => {
      if (!ruleFormRefTsx.value) return
      ruleFormRefTsx.value.resetFields()
    }
    return {
      rules,
      ruleFormTsx,
      submitFormTsx,
      resetFormTsx,
      ruleFormRefTsx
    }
  },
  render () {
    return (
      <div style={{ paddingTop: '20px', width: '500px', margin: '0 auto' }}>
        <ElForm
          ref={(el: any) => (this.ruleFormRefTsx = el)}
          model={this.ruleFormTsx}
          rules={this.rules}
          // v-models={[
          //   [this.ruleFormTsx, 'model'],
          //   [this.rules, 'rules']
          // ]}
          label-width="120px"
        >
          <ElFormItem label="注册："></ElFormItem>
          <ElFormItem label="用户名" prop="username">
            <ElInput v-model={this.ruleFormTsx.username}></ElInput>
          </ElFormItem>
          <ElFormItem label="密码" prop="password" type="password" show-password>
            <ElInput v-model={this.ruleFormTsx.password}></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElButton type="primary" onClick={this.submitFormTsx}>
              Create
            </ElButton>
            <ElButton onClick={this.resetFormTsx}>
              Reset
            </ElButton>
          </ElFormItem>
        </ElForm>
      </div>
    )
  }
})

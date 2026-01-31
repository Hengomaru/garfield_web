<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock, Promotion } from '@element-plus/icons-vue';
import { axiosService } from '@/utils/axiosService';
import { useLoginStore } from '@/store/loginStore'
import numService from '@/utils/numService';
import router from "@/router/router"

const store = useLoginStore()
const { setLogin, setUser } = store

// 页面加载时
onMounted(() => {
  setLogin(false);
  setUser("");
  generateCodeAsync();
});

const validateCodeKey = (rule: any, value: any, callback: any) => {
  if (value.length !== 4) {
    callback(new Error('请输入正确的验证码'));
    return;
  }
  const arr = [...value];
  for (let i = 0; i < 4; i++) {
    let lowerCaseA = arr[i].toLowerCase()
    let lowerCaseB = randomChar[i].toLowerCase()
    if (lowerCaseA !== lowerCaseB) {
      callback(new Error('请输入正确的验证码'));
      return;
    }
  }
  callback()
};
const validateAccountNo = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入账号'));
  } else {
    callback();
  }
};
const validateAccountPwd = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
};

const ruleFormRef = ref<FormInstance>();

interface RuleForm {
  AccountNo: string
  AccountPwd: string
  CodeKey: string
  Code: string
}

const ruleForm = reactive<RuleForm>({
  AccountNo: '',
  AccountPwd: '',
  CodeKey: '',
  Code: '',
});

const rules = reactive<FormRules<RuleForm>>({
  AccountNo: [{ validator: validateAccountNo, trigger: 'blur' }],
  AccountPwd: [{ validator: validateAccountPwd, trigger: 'blur' }],
  Code: [{ validator: validateCodeKey, trigger: 'blur' }],
});

const randomChar = reactive<string[]>(['', '', '', '']);

const generateCodeAsync = () => {
  for (let i = 0; i < 4; i++) {
    randomChar[i] = String.fromCharCode(numService.getRandomIntInclusive(65, 90));
  }
};

const submitForm = (formEl: FormInstance | undefined) => {
  // ruleFormRef.value.validate((valid) => {
  //   if (valid) {
      console.log('表单验证成功!');

      axiosService.post('/login', {
        // username: ruleForm.AccountNo,
        // password: ruleForm.AccountPwd,
        username: 'admin',
        password: '12345',
      }).then((response) => {
        successCallback(response)
      }).catch((error) => {
        console.error('登录失败:', error);
        localStorage.removeItem('token')
      });
  //   } else {
  //     console.log('表单验证失败');
  //   }
  // });
};

const successCallback = (response: any) => {
  const token = response["content"];
  console.log('登录成功:', token);
  localStorage.setItem('token', token);
  setLogin(true);
  setUser(ruleForm.AccountNo);
  router.push("/home")
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="middle">
    <div class="logo">&nbsp;</div>
    <el-form ref="ruleFormRef" style="width: 1000px" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
      <h2>Login</h2>
      <el-form-item prop="AccountNo">
        <el-input v-model="ruleForm.AccountNo" autocomplete="off" :prefix-icon="User" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item prop="AccountPwd">
        <el-input v-model="ruleForm.AccountPwd" type="password" autocomplete="off" :prefix-icon="Lock"
          placeholder="请输入密码" />
      </el-form-item>
      <el-form-item prop="Code">
        <el-input v-model.number="ruleForm.Code" :prefix-icon="Promotion" class="login-content-code"
          placeholder="请输入验证码" />
        <el-button type="default" class="reset-verification" @click="generateCodeAsync">生成验证码</el-button>
        <table class="verification-table">
          <tbody>
            <tr>
              <td>{{ randomChar[0] }}</td>
              <td>{{ randomChar[1] }}</td>
              <td>{{ randomChar[2] }}</td>
              <td>{{ randomChar[3] }}</td>
            </tr>
          </tbody>
        </table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" class="reset-button" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
body {
  font-family: Arial, sans-serif;
}

.demo-ruleForm {
  max-width: 300px;
  margin: 50px auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.demo-ruleForm h2 {
  text-align: center;
}

.demo-ruleForm input[type="text"],
.demo-ruleForm input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.demo-ruleForm button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #5c6ac4;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.demo-ruleForm button:hover {
  background-color: #4f5aae;
  color: white;
}

.demo-ruleForm .reset-button {
  width: 100%;
  padding: 10px;
  background-color: #e0dede;
  color: #333;
}

.demo-ruleForm .reset-verification {
  width: 30%;
  padding: 10px;
  margin-right: 2dvw;
  margin-top: 1dvh;
}

.verification-table {
  margin-top: 1dvh;
}

.middle {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
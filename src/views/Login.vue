<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock, Promotion } from '@element-plus/icons-vue';
// import { postLoginAsync, postGenerateCodeAsync } from '@/api/login';
import axiosService from '@/utils/axiosService';
import { useLoginStore } from '@/store/loginStore'

const store = useLoginStore()
const { setLogin, setUser } = store

const ruleFormRef = ref<FormInstance>();
// 页面加载时
onMounted(() => {
  generateCodeAsync();
});
const validateCodeKey = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入验证码'));
  } else {
    callback();
  }
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
const ruleForm = reactive({
  AccountNo: '',
  AccountPwd: '',
  CodeKey: '',
  Code: '',
});
const verificationCode = reactive({
  CodeKey: '',
  Code: '',
});
const rules = reactive<FormRules<typeof ruleForm>>({
  AccountNo: [{ validator: validateAccountNo, trigger: 'blur' }],
  AccountPwd: [{ validator: validateAccountPwd, trigger: 'blur' }],
  Code: [{ validator: validateCodeKey, trigger: 'blur' }],
});
const generateCodeAsync = () => {};

const submitForm = (formEl: FormInstance | undefined) => {
  axiosService.post('/login', {
    username: ruleForm.AccountNo,
    password: ruleForm.AccountPwd,
  }).then((response) => {
    const token = response["content"];
    console.log('登录成功:', token);
    localStorage.setItem('token', token);
    console.log('localStorage:', localStorage.getItem('token'));
    setLogin(true);
    setUser(ruleForm.AccountNo);
  }).catch((error) => {
    console.error('登录失败:', error);
  });
};

const check = () => {
  axiosService.get('/check').then((response) => {
    console.log('checked:', response["content"]);
  }).catch((error) => {
    console.error('登录失败:', error);
  });
}
</script>

<template>
    <div class="middle">
        <div class="logo">&nbsp;</div>
          <el-form ref="ruleFormRef" style="width: 1000px" :model="ruleForm" status-icon :rules="rules"
            class="demo-ruleForm">
            <h2>Login</h2>
            <el-form-item prop="AccountNo">
              <el-input v-model="ruleForm.AccountNo" autocomplete="off" :prefix-icon="User"
                placeholder="请输入账号" />
            </el-form-item>
            <el-form-item prop="AccountPwd">
              <el-input v-model="ruleForm.AccountPwd" type="password" autocomplete="off" :prefix-icon="Lock"
                placeholder="请输入密码" />
            <div class="prompt">prompt</div>
            </el-form-item>
            <el-form-item prop="Code">
              <el-input v-model.number="ruleForm.Code" :prefix-icon="Promotion" class="login-content-code"
                placeholder="请输入验证码" />
              <span class="login-content-code-img" @click="generateCodeAsync()">{{ verificationCode.Code}}</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="check()">check</el-button>
    </div>
</template>

<style scoped lang="less">
  body { font-family: Arial, sans-serif; }
            .demo-ruleForm { 
              max-width: 300px; margin: 50px auto; 
              padding-left: 20px; 
              padding-right: 20px; 
              padding-top: 5px; 
              padding-bottom: 20px;
              border: 1px solid #ccc; border-radius: 10px; 
            }
            .demo-ruleForm h2 { text-align: center; }
            .demo-ruleForm input[type="text"], .demo-ruleForm input[type="password"] {
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
                background-color: #4c5ac4;
            }
            .prompt {
              color: red;
              font-size: 22px;
              margin-top: 1dvh;
              margin-bottom: 1dvh;
            }
.space {
    margin-bottom: 15dvh;
}
.middle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
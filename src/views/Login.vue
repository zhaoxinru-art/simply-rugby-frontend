<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Simply Rugby Login</h2>
      <el-form @submit.prevent="login">
        <el-form-item>
          <el-input v-model="form.username" placeholder="Username" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="Password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" block>Login</el-button>
        </el-form-item>
      </el-form>

      <div class="register-row">
        <span>Don't have an account?</span>
        <el-button type="text" @click="$router.push('/register')">
          Register now
        </el-button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request'

const router = useRouter()
const form = ref({ username: '', password: '' })

const login = async () => {
  try {
    const res = await request.post('/user/login', form.value)
    if (res.code === 200) {
      localStorage.setItem('username', res.data.username)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('currentUser', JSON.stringify(res.data))

      const roleMap = {
        admin: '/clubAdmin',
        clubAdmin: '/clubAdmin',
        coach: '/fixture',
        fixture: '/fixture',
        guardian: '/clubAdmin',
        volunteer: '/assignment'  // 👈 新增
      }

      router.push(roleMap[res.data.role] || '/clubAdmin')
    } else {
      alert(res.msg)
    }
  } catch (e) {
    console.error(e)
    alert('Login failed')
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("https://p3.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/c5e544b681c946349614e61b6547ad55");
}
.login-card {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
}
h2 {
  text-align: center;
  margin-bottom: 30px;
}

.register-row {
  margin-top: 15px;
  text-align: center;
  font-size: 13px;
  color: #666;
}
</style>
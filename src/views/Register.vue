<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Register</h2>

      <div class="input-item">
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Enter your email" />
      </div>

      <div class="input-item">
        <label>Username</label>
        <input v-model="username" placeholder="Set your username" />
      </div>

      <div class="input-item">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Set your password" />
      </div>

      <div class="btn-box">
        <button @click="register" class="btn-register">Register</button>
        <button @click="$router.push('/login')" class="btn-back">Back to Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const username = ref('')
const password = ref('')

const register = async () => {
  if (!email.value || !username.value || !password.value) {
    ElMessage.warning('Please fill in all fields')
    return
  }

  try {
    const res = await axios.post('http://localhost:8081/user/register', {
      email: email.value,
      username: username.value,
      password: password.value
    })

    if (res.data.code === 200) {
      ElMessage.success('Register success')
      router.push('/login')
    } else {
      ElMessage.error('Register failed')
    }
  } catch (e) {
    ElMessage.error('Register error')
  }
}
</script>

<style scoped>
.register-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #37e8ef, #1c46c5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  width: 400px;
}
.register-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}
.input-item {
  margin-bottom: 20px;
}
.input-item label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}
.input-item input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}
.btn-box {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.btn-register {
  flex: 1;
  background: #37e8ef;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}
.btn-back {
  flex: 1;
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
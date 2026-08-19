<template>
  <div class="profile-card">
    <h2>Personal Center</h2>
    <p class="role-tag">Current Role: {{ role }}</p>

    <el-divider>Basic Info</el-divider>
    <div class="info-item">
      <span>Username：</span>
      <strong>{{ username }}</strong>
    </div>

    <el-divider>Change Password</el-divider>
    <el-form label-width="120px" style="max-width: 400px">
      <el-form-item label="New Password">
        <el-input v-model="newPwd" type="password" placeholder="Please enter new password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePwd">Save Password</el-button>
      </el-form-item>
    </el-form>

    <el-divider />
    <el-button type="danger" plain @click="logout">Logout Account</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const username = ref('')
const role = ref('')
const newPwd = ref('')

onMounted(() => {
  username.value = localStorage.getItem('username') || 'User'
  role.value = localStorage.getItem('role') || 'Unknown'
})

const updatePwd = () => {
  if (!newPwd.value) {
    ElMessage.warning('Please enter password')
    return
  }
  localStorage.setItem('password', newPwd.value)
  ElMessage.success('Password updated successfully!')
  newPwd.value = ''
}

const logout = () => {
  localStorage.clear()
  ElMessage.success('Logged out successfully')
  router.push('/login')
}
</script>

<style scoped>
.profile-card {
  background: rgb(164, 226, 230);
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}
.role-tag {
  color: #1c46c5;
  font-weight: bold;
  font-size: 16px;
}
.info-item {
  font-size: 15px;
  margin-bottom: 10px;
}
</style>
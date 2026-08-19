<template>
  <div class="page">
    <nav class="navbar">
      <div class="logo">Rugby Volunteer System</div>
      <div class="menu">
        <span :class="{ active: $route.path === '/clubAdmin' }" @click="$router.push('/clubAdmin')">Volunteers</span>
        <span v-if="['admin','clubAdmin','coach','fixture'].includes(role)" :class="{ active: $route.path === '/fixture' }" @click="$router.push('/fixture')">Events</span>
        <span v-if="['admin','clubAdmin','coach','fixture'].includes(role)" :class="{ active: $route.path === '/assignment' }" @click="$router.push('/assignment')">Assign</span>

        <div class="user-right">
          {{ currentUser?.username || 'User' }} ({{ currentUser?.role || 'none' }})
          <el-dropdown trigger="click">
            <span class="drop-btn">▼</span>
            <template #dropdown>
              <el-dropdown-item @click="openProfile">Personal Center</el-dropdown-item>
              <el-dropdown-item divided v-for="u in loginHistory" :key="u.username" @click="switchUser(u)">{{ u.username }} ({{ u.role }})</el-dropdown-item>
              <el-dropdown-item divided type="danger" v-for="u in loginHistory" :key="u.username" @click="removeUser(u)">Delete: {{ u.username }}</el-dropdown-item>
              <el-dropdown-item divided @click="logout">Logout</el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
      </div>
    </nav>

    <div class="content">
      <h1>Fixtures</h1>
      <el-button type="success" @click="openAdd">+ Add Fixture</el-button>
      <el-table :data="list" border style="margin-top:20px;background:#fff">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="matchTime" label="Time" />
        <el-table-column prop="location" label="Location" />
      </el-table>
    </div>

    <el-dialog v-model="show" title="Add Fixture">
      <el-input v-model="form.title" placeholder="Title" style="margin:5px" />
      <el-input v-model="form.matchTime" placeholder="Time" style="margin:5px" />
      <el-input v-model="form.location" placeholder="Location" style="margin:5px" />
      <template #footer>
        <el-button @click="show=false">Cancel</el-button>
        <el-button type="primary" @click="save">Save</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showProfile" title="Personal Center" width="520px" custom-class="profile-dialog">
      <div class="profile-container">
        <div class="profile-item">
          <label>Username</label>
          <el-input v-model="currentUser.username" disabled />
        </div>
        <div class="profile-item">
          <label>Role</label>
          <el-input v-model="currentUser.role" disabled />
        </div>
        <div class="profile-item">
          <label>Display Name</label>
          <el-input v-model="updateName" placeholder="Enter name" />
        </div>

        <el-divider>Change Password</el-divider>
        <div class="profile-item">
          <label>Current Password</label>
          <el-input v-model="oldPwd" type="password" placeholder="Current password" show-password />
        </div>
        <div class="profile-item">
          <label>New Password</label>
          <el-input v-model="newPwd" type="password" placeholder="New password" show-password />
        </div>
        <div class="profile-item">
          <label>Confirm Password</label>
          <el-input v-model="cfmPwd" type="password" placeholder="Confirm password" show-password />
        </div>

        <div class="profile-footer">
          <el-button @click="showProfile = false">Cancel</el-button>
          <el-button type="primary" @click="doUpdateProfile">Save</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
const list = ref([])
const show = ref(false)
const form = ref({})
const currentUser = ref({})
const loginHistory = ref([])
const role = ref('')
const showProfile = ref(false)
const oldPwd = ref('')
const newPwd = ref('')
const cfmPwd = ref('')
const updateName = ref('')

const loadHistory = () => {
  try {
    loginHistory.value = JSON.parse(localStorage.getItem('loginHistory') || '[]')
    currentUser.value = JSON.parse(localStorage.getItem('currentUser') || '{}')
    role.value = currentUser.value.role || ''
  } catch (e) {}
}
const load = async () => { try { const res = await axios.get("http://localhost:8081/fixture/list"); list.value = res.data } catch (e) {} }
const openAdd = () => { form.value = {}; show.value = true }
const save = async () => { try { await axios.post("http://localhost:8081/fixture/add", form.value); show.value = false; load() } catch (e) { alert('Failed') } }

const switchUser = (u) => {
  localStorage.setItem('currentUser', JSON.stringify(u))
  localStorage.setItem('role', u.role)
  const roleMap = { admin: '/clubAdmin', clubAdmin: '/clubAdmin', coach: '/fixture', guardian: '/clubAdmin', fixture: '/fixture' }
  router.push(roleMap[u.role])
}
const removeUser = (u) => {
  let arr = JSON.parse(localStorage.getItem('loginHistory') || '[]')
  arr = arr.filter(x => x.username !== u.username)
  localStorage.setItem('loginHistory', JSON.stringify(arr))
  loadHistory()
}
const logout = () => { localStorage.clear(); router.push('/login') }
const openProfile = () => { showProfile.value = true }

const doUpdateProfile = async () => {
  if (!oldPwd.value) return ElMessage.warning('Enter current password')
  if (newPwd.value && newPwd.value !== cfmPwd.value) return ElMessage.error('Password not match')
  try {
    await axios.post('http://localhost:8081/user/updatePwd', {
      username: currentUser.value.username,
      oldPwd: oldPwd.value,
      newPwd: newPwd.value
    })
    if (updateName.value) {
      currentUser.value.name = updateName.value
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    }
    ElMessage.success('Updated')
    showProfile.value = false
    oldPwd.value = newPwd.value = cfmPwd.value = ''
  } catch (e) { ElMessage.error('Failed') }
}

onMounted(() => { loadHistory(); load() })
</script>

<style scoped>
.page{min-height:100vh;background:url(https://p3.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/c5e544b681c46349614e61b6547ad55) center/cover fixed no-repeat;color:white}
.navbar{background:rgba(0,0,0,.75);padding:16px 30px;display:flex;justify-content:space-between;align-items:center}
.menu{display:flex;gap:24px;align-items:center}
.menu span{cursor:pointer;transition:all 0.3s}
.menu span:hover{color:#ffd04b;transform:translateY(-2px)}
.menu span.active{color:#37e8ef;font-weight:bold}
.user-right{display:flex;align-items:center;gap:8px;color:#37e8ef}
.drop-btn{cursor:pointer;font-size:12px}
.content{padding:30px}
.mb10{margin-bottom:10px}
.profile-dialog { border-radius: 16px; }
.profile-container { padding: 10px; }
.profile-item { margin-bottom: 16px; }
.profile-item label { display: block; margin-bottom: 6px; font-weight: 600; color: #333; }
.profile-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
</style>
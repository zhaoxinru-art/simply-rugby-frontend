<template>
  <div class="schedule-page">
    <div class="page-header">
      <div class="logo">Simply Rugby Volunteer System</div>
      <div class="nav-menu">
        <router-link to="/home">Home</router-link>
        <router-link to="/volunteer">Volunteers</router-link>
        <router-link to="/event">Events</router-link>
        <router-link to="/schedule" class="active">Schedule</router-link>
        <router-link to="/report">Reports</router-link>
      </div>
      <div class="user-info">
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>

    <div class="page-container">
      <h1>Schedule & Assignment</h1>
      <p>Assign volunteers to events and view schedules</p>

      <button class="add-btn" @click="openAddModal" style="margin: 0 auto 20px; display: table;">
        + Assign Schedule
      </button>

      <div class="table-card">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Volunteer</th>
            <th>Event</th>
            <th>Role</th>
            <th>Time</th>
            <th>Operation</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in scheduleList" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.volunteer }}</td>
            <td>{{ item.event }}</td>
            <td>{{ item.role }}</td>
            <td>{{ item.time }}</td>
            <td>
              <button class="edit" @click="openEditModal(item)">Edit</button>
              <button class="delete" @click="deleteItem(item.id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal" v-show="modalVisible">
      <div class="modal-content">
        <h3>{{ isEdit ? 'Edit Schedule' : 'Add Schedule' }}</h3>
        <div class="form-item">
          <label>Volunteer</label>
          <input v-model="form.volunteer" placeholder="Name" />
        </div>
        <div class="form-item">
          <label>Event</label>
          <input v-model="form.event" placeholder="Event" />
        </div>
        <div class="form-item">
          <label>Role</label>
          <input v-model="form.role" placeholder="Role" />
        </div>
        <div class="form-item">
          <label>Time</label>
          <input v-model="form.time" placeholder="e.g. 09:00-12:00" />
        </div>
        <div class="modal-btns">
          <button class="cancel" @click="closeModal">Cancel</button>
          <button class="confirm" @click="submit">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import homeBg from '../assets/home.jpg'

const router = useRouter()
const bgImage = `url(${homeBg})`

const scheduleList = ref([
  { id: 1, volunteer: 'Zhang San', event: 'Rugby Match A', role: 'First Aid', time: '09:00-12:00' },
  { id: 2, volunteer: 'Li Si', event: 'Training Camp', role: 'Coach', time: '14:00-17:00' },
])

const modalVisible = ref(false)
const isEdit = ref(false)
const currentId = ref(null)

const form = ref({
  volunteer: '',
  event: '',
  role: '',
  time: ''
})

const openAddModal = () => {
  isEdit.value = false
  form.value = { volunteer: '', event: '', role: '', time: '' }
  modalVisible.value = true
}

const openEditModal = (item) => {
  isEdit.value = true
  currentId.value = item.id
  form.value = { ...item }
  modalVisible.value = true
}

const closeModal = () => modalVisible.value = false

const submit = () => {
  if (!form.value.volunteer || !form.value.event) {
    alert('Please fill required fields')
    return
  }
  if (isEdit.value) {
    scheduleList.value = scheduleList.value.map(s =>
        s.id === currentId.value ? { ...form.value, id: currentId.value } : s
    )
  } else {
    const newId = Math.max(0, ...scheduleList.value.map(s => s.id)) + 1
    scheduleList.value.push({ ...form.value, id: newId })
  }
  closeModal()
}

const deleteItem = (id) => {
  if (confirm('Confirm delete?')) {
    scheduleList.value = scheduleList.value.filter(s => s.id !== id)
  }
}

const logout = () => {
  localStorage.removeItem('token')
  alert('Logged out successfully')
  router.push('/login')
}
</script>

<style scoped>
.schedule-page {
  width: 100vw;
  min-height: 100vh;
  background-image: v-bind(bgImage);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
  color: white;
  font-family: Arial, sans-serif;
}
.page-header {
  height: 60px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}
.logo { font-weight: bold; font-size: 18px; }
.nav-menu { display: flex; gap: 20px; }
.nav-menu a { color: white; text-decoration: none; }
.nav-menu a.active { color: #409eff; font-weight: bold; }
.logout-btn { background: transparent; border: none; color: #409eff; cursor: pointer; }
.page-container { max-width: 1300px; margin: 40px auto; padding: 0 20px; }
.page-container h1 { text-align: center; text-shadow: 0 0 10px #000; }
.page-container p { text-align: center; font-size: 17px; margin-bottom: 30px; }
.add-btn { padding: 8px 16px; background: #67c23a; color: white; border: none; border-radius: 6px; cursor: pointer; }
.table-card { background: rgba(255,255,255,0.93); color: #222; padding: 25px; border-radius: 12px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; text-align: center; border-bottom: 1px solid #eee; }
.edit { padding: 4px 10px; background: #409eff; color: white; border: none; border-radius: 4px; margin-right:5px; cursor: pointer; }
.delete { padding: 4px 10px; background: #f56c6c; color: white; border: none; border-radius: 4px; cursor: pointer; }

.modal {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
}
.modal-content {
  background: white; padding: 30px; border-radius: 10px; width: 450px; color: #222;
}
.form-item { margin-bottom: 15px; }
.form-item label { display: block; margin-bottom: 6px; font-weight: bold; }
.form-item input { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
.modal-btns { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
.cancel { padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; }
.confirm { padding: 8px 16px; background: #409eff; color: white; border: none; border-radius: 4px; cursor: pointer; }
</style>
<template>
  <div class="event-page">
    <div class="page-header">
      <div class="logo">Simply Rugby Volunteer System</div>
      <div class="nav-menu">
        <router-link to="/home">Home</router-link>
        <router-link to="/volunteer">Volunteers</router-link>
        <router-link to="/event" class="active">Events</router-link>
        <router-link to="/schedule">Schedule</router-link>
        <router-link to="/report">Reports</router-link>
      </div>
      <div class="user-info">
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>

    <div class="page-container">
      <h1>Event Management</h1>
      <p>Create and manage rugby events</p>

      <div class="search-bar">
        <input v-model="searchKey" placeholder="Search by event name" />
        <button class="search-btn">Search</button>
        <button class="add-btn" @click="openAddModal">+ Add Event</button>
      </div>

      <div class="table-card">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in filteredList" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.location }}</td>
            <td>
                <span class="status" :class="item.status === 'Ongoing' ? 'active' : 'inactive'">
                  {{ item.status }}
                </span>
            </td>
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
        <h3>{{ isEdit ? 'Edit Event' : 'Add Event' }}</h3>
        <div class="form-item">
          <label>Event Name</label>
          <input v-model="form.name" placeholder="Name" />
        </div>
        <div class="form-item">
          <label>Date</label>
          <input v-model="form.date" type="date" />
        </div>
        <div class="form-item">
          <label>Location</label>
          <input v-model="form.location" placeholder="Location" />
        </div>
        <div class="form-item">
          <label>Status</label>
          <select v-model="form.status">
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import homeBg from '../assets/home.jpg'

const router = useRouter()
const bgImage = `url(${homeBg})`

const eventList = ref([
  { id: 1, name: 'Rugby Match A', date: '2025-06-01', location: 'Stadium 1', status: 'Ongoing' },
  { id: 2, name: 'Training Camp', date: '2025-06-10', location: 'Training Center', status: 'Upcoming' },
])

const searchKey = ref('')
const modalVisible = ref(false)
const isEdit = ref(false)
const currentId = ref(null)

const form = ref({
  name: '',
  date: '',
  location: '',
  status: 'Upcoming'
})

const filteredList = computed(() => {
  if (!searchKey.value) return eventList.value
  return eventList.value.filter(e => e.name.includes(searchKey.value))
})

const openAddModal = () => {
  isEdit.value = false
  form.value = { name: '', date: '', location: '', status: 'Upcoming' }
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
  if (!form.value.name || !form.value.date) {
    alert('Please fill name and date')
    return
  }
  if (isEdit.value) {
    eventList.value = eventList.value.map(e =>
        e.id === currentId.value ? { ...form.value, id: currentId.value } : e
    )
  } else {
    const newId = Math.max(0, ...eventList.value.map(e => e.id)) + 1
    eventList.value.push({ ...form.value, id: newId })
  }
  closeModal()
}

const deleteItem = (id) => {
  if (confirm('Confirm delete?')) {
    eventList.value = eventList.value.filter(e => e.id !== id)
  }
}

const logout = () => {
  localStorage.removeItem('token')
  alert('Logged out successfully')
  router.push('/login')
}
</script>

<style scoped>
.event-page {
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
.search-bar { display: flex; gap: 10px; margin-bottom: 25px; justify-content: center; }
.search-bar input { width: 300px; padding: 8px 12px; border-radius: 6px; border: none; }
.search-btn { padding: 8px 16px; background: #409eff; color: white; border: none; border-radius: 6px; }
.add-btn { padding: 8px 16px; background: #67c23a; color: white; border: none; border-radius: 6px; cursor: pointer; }
.table-card { background: rgba(255,255,255,0.93); color: #222; padding: 25px; border-radius: 12px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; text-align: center; border-bottom: 1px solid #eee; }
.status { padding: 4px 8px; border-radius: 4px; font-size: 13px; color: white; }
.status.active { background: #67c23a; }
.status.inactive { background: #37e8ef; }
.edit { padding: 4px 10px; background: #409eff; color: white; border: none; border-radius: 4px; margin-right:5px; cursor: pointer; }
.delete { padding: 4px 10px; background: #37e8ef; color: white; border: none; border-radius: 4px; cursor: pointer; }

.modal {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
}
.modal-content {
  background: white; padding: 30px; border-radius: 10px; width: 450px; color: #222;
}
.form-item { margin-bottom: 15px; }
.form-item label { display: block; margin-bottom: 6px; font-weight: bold; }
.form-item input, .form-item select { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
.modal-btns { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
.cancel { padding: 8px 16px; background: #999; color: white; border: none; border-radius: 4px; cursor: pointer; }
.confirm { padding: 8px 16px; background: #409eff; color: white; border: none; border-radius: 4px; cursor: pointer; }
</style>
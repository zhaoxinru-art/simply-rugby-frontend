<template>
  <div class="report-page">
    <div class="page-header">
      <div class="logo">Simply Rugby Volunteer System</div>
      <div class="nav-menu">
        <router-link to="/home">Home</router-link>
        <router-link to="/volunteer">Volunteers</router-link>
        <router-link to="/event">Events</router-link>
        <router-link to="/schedule">Schedule</router-link>
        <router-link to="/report" class="active">Reports</router-link>
      </div>
      <div class="user-info">
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>

    <div class="page-container">
      <h1>Reports & Statistics</h1>
      <p>View volunteer hours, attendance and export records</p>

      <div class="table-card">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Volunteer Name</th>
            <th>Total Hours</th>
            <th>Events Joined</th>
            <th>Attendance Rate</th>
            <th>Operation</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in reportList" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.hours }}</td>
            <td>{{ item.events }}</td>
            <td>{{ item.attendance }}%</td>
            <td>
              <button class="export-btn" @click="exportReport(item)">Export</button>
            </td>
          </tr>
          </tbody>
        </table>
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

const reportList = ref([
  { id: 1, name: 'Zhang San', hours: 24, events: 3, attendance: 100 },
  { id: 2, name: 'Li Si', hours: 16, events: 2, attendance: 95 },
  { id: 3, name: 'Wang Wu', hours: 32, events: 4, attendance: 98 },
])

const exportReport = (item) => {
  alert(`Export report for ${item.name} successfully`)
}

const logout = () => {
  localStorage.removeItem('token')
  alert('Logged out successfully')
  router.push('/login')
}
</script>

<style scoped>
.report-page {
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
.page-container h1 { text-align: center; text-shadow: 0 0 10px #000; font-size: 32px; }
.page-container p { text-align: center; font-size: 17px; margin-bottom: 30px; text-shadow: 0 0 5px #000; }
.table-card { background: rgba(255,255,255,0.93); color: #222; padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; text-align: center; border-bottom: 1px solid #eee; }
.export-btn { padding: 6px 12px; background: #67c23a; color: white; border: none; border-radius: 4px; cursor: pointer; }
</style>
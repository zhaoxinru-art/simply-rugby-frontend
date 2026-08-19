<template>
  <div class="dashboard">
    <h2>System Dashboard</h2>
    <div class="card-list">
      <div class="card blue">
        <div>Total Users</div>
        <div class="num">12</div>
      </div>
      <div class="card green">
        <div>Total Volunteers</div>
        <div class="num">8</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 30px;
  color: white;
}
.card-list {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
.card {
  padding: 25px 35px;
  border-radius: 12px;
  color: white;
}
.blue {
  background: #409eff;
}
.green {
  background: #00c48c;
}
.num {
  font-size: 26px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
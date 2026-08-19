<template>
  <div>
    <el-menu mode="horizontal">
      <!-- 我只在这里加了 Dashboard -->
      <el-menu-item index="/dashboard">Dashboard</el-menu-item>
      <el-menu-item index="/home/clubAdmin">Member Management</el-menu-item>
      <el-menu-item index="/home/fixture">Fixtures</el-menu-item>
      <el-menu-item index="/home/assignment">Assignment</el-menu-item>

      <!-- 右边用户菜单，原样不动，只修好了功能 -->
      <el-menu-item index="user" style="float:right">
        <el-dropdown @command="handleCommand">
          <span>{{ localStorage.getItem('username') || 'User' }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>

    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    async handleCommand(cmd) {
      if (cmd === 'logout') {
        await this.$request.post("/user/logout")
        localStorage.clear()
        this.$router.push('/login')
      }
    }
  }
}
</script>
<template>
  <div>
    Home
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // 清空 token
      // window.sessionStorage.clear();
      window.sessionStorage.removeItem('token')
      // 跳转至登录页
      this.$router.push('/login')
    }
  }
}
</script>

<style></style>

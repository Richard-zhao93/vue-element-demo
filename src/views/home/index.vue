<template>
  <div>
    <el-container class="home-container">
      <!-- 侧边栏 -->
      <Aside :isCollapse="isCollapse" />

      <!-- 主体区域 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <div class="switch-icon">
            <i
              :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              @click="changeCollapse"
            ></i>
            <Breadcrumb />
          </div>

          <el-button type="info" plain @click="logout">退出</el-button>
        </el-header>

        <!-- 右边内容区域 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './Aside'
import Breadcrumb from './Breadcrumb'
import { removeToken } from '@/utils/auth'

export default {
  created() {
    // console.log(this.$router)
    // console.log(this.$route.matched)
  },
  components: {
    Aside,
    Breadcrumb
  },
  data() {
    return {
      isCollapse: false // 控制侧边栏的展开和收起
    }
  },
  methods: {
    // 控制侧边栏的展开和收起
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },

    // 退出
    logout() {
      // 清空 token
      removeToken('rights')
      removeToken('token')
      // 跳转至登录页
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
$bgHeader: #fff;
$bgMain: #f0f2f5;

.home-container {
  height: 100vh;
}

.el-header {
  background-color: $bgHeader;

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(160, 203, 217);
  font-size: 20px;

  .switch-icon {
    display: inline-block;
    font-size: 20px;
    color: #ccc;
    margin-right: 20px;
    cursor: pointer;

    .el-breadcrumb {
      display: inline-block;
      margin-left: 20px;
    }
  }
}

.el-main {
  background-color: $bgMain;
}
</style>

<template>
  <div>
    <el-container class="home-container">
      <!-- 侧边栏 -->
      <Aside :isCollapse="isCollapse" />

      <!-- 主体区域 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <div>
            <div class="switch-icon" @click="changeCollapse">
              <i
                :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              ></i>
            </div>
            <span>电商后台管理系统</span>
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
import { removeToken } from '@/utils/auth'

export default {
  components: {
    Aside
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
      removeToken()
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
  }
}

.el-main {
  background-color: $bgMain;
}
</style>

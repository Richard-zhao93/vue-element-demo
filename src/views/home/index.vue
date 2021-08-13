<template>
  <div>
    <el-container class="home-container">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="child in item.children"
              :key="child.id"
              :index="'/' + child.path"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ child.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体区域 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <div>
            <div class="switch-icon" @click="changeCollapse">
              <i
                :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              ></i>
              <!-- <i class="el-icon-s-unfold"></i> -->
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
export default {
  data() {
    return {
      isCollapse: false, // 控制侧边栏的展开和收起
      menuList: [] // 侧边栏菜单数据对象
    }
  },
  created() {
    // 获取侧边菜单
    this.getMenuList()
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },

    // 获取侧边菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message({
          showClose: true,
          message: '获取菜单失败',
          type: 'error'
        })
      }
      this.menuList = res.data
    },

    // 控制侧边栏的展开和收起
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    },

    logout() {
      // 清空 token
      // window.sessionStorage.clear();
      // or
      window.sessionStorage.removeItem('token')
      // 跳转至登录页
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
$bgHeader: #fff;
$bgAside: #333744;
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

.el-aside {
  background-color: $bgAside;

  .el-menu {
    border-right: 1px solid $bgAside;
  }
}

.el-main {
  background-color: $bgMain;
}
</style>

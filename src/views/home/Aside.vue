<template>
  <el-aside :width="isCollapse ? '64px' : '200px'">
    <el-menu
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      :collapse-transition="false"
      router
    >
      <el-submenu v-for="item in menuList" :key="item.id" :index="item.id + ''">
        <!-- 一级菜单模板区域 -->
        <template slot="title">
          <!-- svg 图标使用 -->
          <span class="svg-container">
            <svg-icon :icon-class="item.icon" />
          </span>
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          v-for="child in item.children"
          :key="child.id"
          :index="'' + child.path"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ child.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
// import Tip from '@/utils/tips'
// import { mapState } from 'vuex'

export default {
  props: [
    'isCollapse' // 控制侧边栏的展开和收起
  ],
  data() {
    return {
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
    getMenuList() {
      // const { data } = await this.$http.Menus.getMenuList()
      // if (data.meta.status !== 200) {
      //   return Tip('error', '获取菜单失败')
      // }
      // this.menuList = data.data
      this.menuList = this.$store.state.user.rights
    },

    // 控制侧边栏的展开和收起
    changeCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
$bgAside: #333744;

.el-aside {
  background-color: $bgAside;

  .el-menu {
    border-right: 1px solid $bgAside;
  }
}

.svg-container {
  display: inline-flex;
  align-items: center;
  color: #909399;
  // text-align: center;
  // vertical-align: middle;
  // margin-right: 5px;
  width: 24px;
  font-size: 16px;
}
</style>

<template>
  <el-card class="box-card">
    <!-- 搜索框 + 添加按钮 部分 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUserList"
          ></el-button>
        </el-input>
      </el-col>

      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 列表部分 -->
    <el-table :data="userList" style="width: 100%" stripe border>
      <el-table-column type="index" label="#" width="50"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template v-slot="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="stateChange(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editUser(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteUser(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 部分 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import Tip from '@/utils/tips'

export default {
  created() {
    this.getUserList()
  },
  data() {
    return {
      total: 0, // 用户数据总量
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userList: [] // 用户列表数据
    }
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.Users.getUserList(this.queryInfo)
      if (res.meta.status !== 200) {
        return Tip('error', '获取菜单失败')
      }

      Tip('success', '获取用户列表成功')
      this.userList = res.data.users
      this.total = res.data.total
    },

    // 分页器 pagesize 改变时触发
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getUserList()
    },

    // 分页器 pagenum 改变时触发
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getUserList()
    },

    // 修改用户状态
    async stateChange(user) {
      const { data: res } = await this.$http.Users.changeUserState(
        user.id,
        user.mg_state
      )

      if (res.meta.status !== 200) {
        user.mg_state = !user.mg_state

        return Tip('error', '更新用户状态失败')
      }

      Tip('success', '更新用户状态成功')
    },

    // 更新用户信息
    editUser(user) {
      console.log('Edit', user)
    },

    // 删除用户
    deleteUser(user) {
      console.log('Delete', user)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>

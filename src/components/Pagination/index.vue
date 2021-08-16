<!-- 分页器 -->
<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[5, 10, 20, 30]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  props: [
    'pagenum', // 第几页
    'pagesize', // 每页显示数量
    'total' // 总页数
  ],
  methods: {
    // 分页器 pagesize 改变时触发
    handleSizeChange(val) {
      this.$emit('page-size-change', val)
    },

    // 分页器 pagenum 改变时触发
    handleCurrentChange(val) {
      this.$emit('page-num-change', val)
    }
  }
}
</script>

<style></style>

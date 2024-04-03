<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <h3>投递岗位名称</h3>
          招聘类型：
          <el-divider direction="vertical"></el-divider>
          投递时间：
        </span>
      </div>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {

  },
  data() {
    return {
      active: 0
    }
  },
  methods: {}
}
</script>

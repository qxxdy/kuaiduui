<template>
  <div class="app-container">
    <el-tabs tab-position="right" style="height: 200px;">
      <el-tab-pane>
        <span slot="label">
          需求待办
          <el-badge v-if="total>0" :value="total" class="item"/>
        </span>
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px"
        >
          <el-form-item label="发起人" prop="initUserName">
            <el-input
              v-model="queryParams.initUserName"
              placeholder="请输入发起人"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="待办人" prop="endUserName">
            <el-input
              v-model="queryParams.endUserName"
              placeholder="请输入待办人"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="流转类型" prop="flowType">
            <el-select v-model="queryParams.flowType" placeholder="请选择流转类型" clearable>
              <el-option
                v-for="dict in dict.type.sys_flowable_status"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table v-loading="loading1" :data="demandList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"/>
          <el-table-column label="发起人" align="center" prop="initUserName"/>
          <el-table-column label="待办人" align="center" prop="endUserName"/>
          <el-table-column label="岗位名称" align="center" prop="postName"/>
          <el-table-column label="需求人数" align="center" prop="postHc"/>
          <el-table-column label="需求描述" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>
                  {{ scope.row.postDesc }}
                </p>
                <div slot="reference" class="name-wrapper">
                  <p size="medium">{{ scope.row.postDesc.substring(0, 8) }}...</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="需求要求" align="center">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>
                  {{ scope.row.postDuty }}
                </p>
                <div slot="reference" class="name-wrapper">
                  <p>{{ scope.row.postDuty.substring(0, 8) }}...</p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="审批状态" align="center" prop="flowType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sys_flowable_status" :value="scope.row.flowType"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleAccess(scope.row)"
              >通过
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDeny(scope.row)"
              >驳回
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="招聘待办">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { listDemand, getDemand, denyDemand, accessDemand } from '@/api/flow/demand'

export default {
  name: 'Demand',
  dicts: ['sys_flowable_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 需求审批表格数据
      demandList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        initUser: null,
        initUserName: null,
        endUser: null,
        endUserName: null,
        flowType: null,
        postId: null,
        postName: null,
        postHc: null,
        postDesc: null,
        postDuty: null
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询需求审批列表 */
    getList() {
      this.loading = true
      listDemand(this.queryParams).then(response => {
        this.demandList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        initUser: null,
        endUser: null,
        flowType: null,
        postId: null,
        postHc: null,
        postDesc: null,
        postDuty: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 审批按钮操作 */
    handleAccess(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认发布需求审批编号为"' + ids + '"的数据项？').then(function() {
        return accessDemand(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('发布成功')
      }).catch(() => {
      })
    },
    /** 删除按钮操作 */
    handleDeny(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认驳回需求审批编号为"' + ids + '"的数据项？').then(function() {
        return denyDemand(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('驳回成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('flow/demand/export', {
        ...this.queryParams
      }, `demand_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>

<style scoped>

</style>

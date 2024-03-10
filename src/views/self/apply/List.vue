<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch"
             label-width="68px"
    >
      <el-form-item label="审批人" prop="endUserName">
        <el-input
          v-model="queryParams.endUserName"
          placeholder="请输入审批人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流转类型" prop="flowType">
        <el-select v-model="queryParams.flowType" placeholder="请选择流转类型" clearable>
          <el-option
            v-for="dict in dict.type.flow_demand_status"
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

    <el-table v-loading="loading" :data="demandList">
      <el-table-column label="审批人" align="center" prop="endUserName"/>
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
          <dict-tag :options="dict.type.flow_demand_status" :value="scope.row.flowType"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.flowType==='3'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleRepeat(scope.row)"
          >重新发起
          </el-button>
          <el-button
            v-else-if="scope.row.flowType==='2'"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleRecall(scope.row)"
          >立即撤回
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { listSelfDemand,repeatDemand,recallDemand} from '@/api/flow/demand'
export default {
  name: 'List',
  dicts: ['flow_demand_status','flow_demand_status'],
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
      listSelfDemand(this.queryParams).then(response => {
        this.demandList = response.rows
        this.total = response.total
        this.loading = false
      })
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
    /** 导出按钮操作 */
    handleExport() {
      this.download('flow/demand/export', {
        ...this.queryParams
      }, `demand_${new Date().getTime()}.xlsx`)
    },
    /** 重新发起操作 */
    handleRepeat(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认重新发起需求审批编号为"' + ids + '"的数据项？').then(function() {
        return repeatDemand(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('重新发起成功')
      }).catch(() => {
      })
    },
    /** 立即撤回操作 */
    handleRecall(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认撤回需求审批编号为"' + ids + '"的数据项？').then(function() {
        return recallDemand(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('撤回成功')
      }).catch(() => {
      })
    },
  }
}
</script>

<style scoped>

</style>

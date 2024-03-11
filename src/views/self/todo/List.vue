<template>
  <div class="app-container">
    <el-tabs tab-position="right" style="height: 500px;">

      <!--需求待办-->
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
        <el-table v-loading="loading" :data="demandList" @selection-change="handleSelectionChange">
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
              <dict-tag :options="dict.type.flow_demand_status" :value="scope.row.flowType"/>
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
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </el-tab-pane>

      <!--招聘待办-->
      <el-tab-pane>
        <span slot="label">
          招聘待办
          <el-badge v-if="total2>0" :value="total2" class="item"/>
        </span>
        <el-form :model="queryParams2" ref="queryForm" size="small" :inline="true" v-show="showSearch"
                 label-width="68px"
        >
          <el-form-item label="求职者" prop="personName">
            <el-input
              v-model="queryParams2.personName"
              placeholder="请输入求职者姓名"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="总面评分" prop="score">
            <el-input
              v-model="queryParams2.score"
              placeholder="请输入总面评分"
              clearable
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="流转类型" prop="flowType">
            <el-select v-model="queryParams.flowType" placeholder="请选择流转类型" clearable>
              <el-option
                v-for="dict in dict.type.flow_recruit_status"
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

        <el-table v-loading="loading" :data="recruitList" @selection-change="handleSelectionChange">
          <el-table-column label="求职者" align="center" prop="personName"/>
          <el-table-column label="一面面试官" align="center" prop="userName1"/>
          <el-table-column label="二面面试官" align="center" prop="userName2"/>
          <el-table-column label="所求岗位" align="center" prop="postName"/>
          <el-table-column label="总面评分" align="center" prop="score"/>
          <el-table-column label="流转类型" align="center" prop="flowType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.flow_recruit_status" :value="scope.row.flowType"/>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleRecruitAccess(scope.row)"
              >通过
              </el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleRecruitPool(scope.row)"
              >终止
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total2>0"
          :total="total2"
          :page.sync="queryParams2.pageNum"
          :limit.sync="queryParams2.pageSize"
          @pagination="getList"
        />

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { listDemand, getDemand, denyDemand, accessDemand } from '@/api/flow/demand'
import { listRecruit, accessRecruit,poolRecruit } from '@/api/flow/recruit'

export default {
  name: 'Demand',
  dicts: ['flow_demand_status', 'flow_recruit_status'],
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
      // 总条数
      total2: 0,
      // 需求审批表格数据
      demandList: [],
      // 招聘审批表格数据
      recruitList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 评分弹出层
      scoreOpen: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        /* flow_demand */
        initUser: null,
        initUserName: null,
        endUser: null,
        endUserName: null,
        flowType: null,
        postId: null,
        postName: null,
        postHc: null,
        postDesc: null,
        postDuty: null,
        /* flow_recruit */
        vitaeId: null,
        personName: null,
        recruiter1: null,
        recruiter2: null,
        userName1: null,
        userName2: null,
        score: null
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        /* flow_recruit */
        vitaeId: null,
        personName: null,
        recruiter1: null,
        recruiter2: null,
        userName1: null,
        userName2: null,
        postName: null,
        flowType: null,
        score: null
      },
      scoreForm: {
        id: null,
        vitaeId: null,
        personName: null,
        postName: null,
        score: null
      },
      rules: {
        score: [
          { required: true, message: '总评分不能为空', trigger: 'blur' }
        ]
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
      listRecruit(this.queryParams2).then(response => {
        this.recruitList = response.rows
        this.total2 = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.scoreOpen = false
      this.resetScoreForm()
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
        postDuty: null,
        /* flow_recruit */
        vitaeId: null,
        perName: null,
        recruit1: null,
        recruit2: null,
        postName: null,
        userName1: null,
        userName2: null,
        score: null
      }
      this.resetForm('form')
    },
    resetScoreForm() {
      this.scoreForm = {
        id: null,
        vitaeId: null,
        personName: null,
        postName: null
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.queryParams2.pageNum = 1
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
      this.$modal.confirm('确认发布该需求？').then(function() {
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
      this.$modal.confirm('确认驳回该需求？').then(function() {
        return denyDemand(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('驳回成功')
      }).catch(() => {
      })
    },
    handleRecruitAccess(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('确认通过本轮面试？').then(function() {
        return accessRecruit(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('本轮面试已通过')
      }).catch(() => {
      })
    },
    handleRecruitPool(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('确认终止面试流程？').then(function() {
        return poolRecruit(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('面试流程已终止')
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

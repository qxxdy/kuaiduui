<template>
  <div class="app-container">
    <el-tabs tab-position="right" style="height: 500px;">

      <!--需求待办-->
      <el-tab-pane v-if="isHr">
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
          <el-table-column label="招聘类型" align="center" prop="recruitType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.post_recruit_type" :value="scope.row.recruitType"/>
            </template>
          </el-table-column>
          <el-table-column label="招聘时间" align="center" prop="recruitTime">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="bottom">
                <dict-tag v-if="scope.row.recruitTime" :options="dict.type.post_recruit_time" :value="scope.row.recruitTime"/>
                <p v-else>社招无具体时间</p>
                <div slot="reference" class="name-wrapper">
                  <p size="medium">...<i
                    class="el-icon-view el-icon--right"
                  ></i></p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
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
          <el-table-column
            sortable
            label="申请时间"
            prop="initTime"
          >
          </el-table-column>
          <el-table-column
            sortable
            label="处理时间"
            prop="endTime"
          >
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
          <el-table-column
            label="简历附件"
            prop="vitaeAttach"
          >
            <template slot-scope="scope">
              <el-link type="success"
                       :href="scope.row.vitaeAttach" target="_blank"
                       v-if="scope.row.vitaeAttach">
                简历附件
                <i class="el-icon-view el-icon--right"></i>
              </el-link>
              <p v-else>未上传</p>
            </template>
          </el-table-column>
          <el-table-column label="求职者" align="center" prop="personName"/>
          <el-table-column label="一面面试官" align="center" prop="userName1"/>
          <el-table-column label="二面面试官" align="center" prop="userName2"/>
          <el-table-column label="部门名称" align="center" prop="deptName"/>
          <el-table-column label="所求岗位" align="center" prop="postName"/>
          <el-table-column
            label="岗位类型"
            prop="intentionWilljob"
          >
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sys_post_type" :value="scope.row.intentionWilljob"/>
            </template>
          </el-table-column>
          <el-table-column
            label="招聘类别"
            prop="recruitType"
          >
            <template slot-scope="scope">
              <dict-tag :options="dict.type.post_recruit_type" :value="scope.row.recruitType"/>
            </template>
          </el-table-column>
          <el-table-column
            label="招聘时间"
            prop="recruitTime"
          >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="bottom">
                <dict-tag v-if="scope.row.recruitTime" :options="dict.type.post_recruit_time" :value="scope.row.recruitTime"/>
                <p v-else>社招无具体时间</p>
                <div slot="reference" class="name-wrapper">
                  <p size="medium">...<i
                    class="el-icon-view el-icon--right"
                  ></i></p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="投递时间"
            prop="sendTime"
          >
          </el-table-column>
          <el-table-column label="一面记录" align="center" prop="skillRecord1">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="bottom">
                <p>
                  <b>技术记录：</b>{{ scope.row.skillRecord1 }}
                  <el-divider></el-divider>
                  <b>性格记录：</b>{{ scope.row.characterRecord1 }}
                </p>
                <div slot="reference" class="name-wrapper">
                  <p size="medium">...<i
                    class="el-icon-view el-icon--right"
                  ></i></p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="二面记录" align="center" prop="characterRecord1">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="bottom">
                <p>
                  <b>技术记录：</b>{{ scope.row.skillRecord2 }}
                  <el-divider></el-divider>
                  <b>性格记录：</b>{{ scope.row.characterRecord2 }}
                </p>
                <div slot="reference" class="name-wrapper">
                  <p size="medium">...<i
                    class="el-icon-view el-icon--right"
                  ></i></p>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="流转类型" align="center" prop="flowType">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.flow_recruit_status" :value="scope.row.flowType"/>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">

              <el-button
                v-if="!isBoss"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="openScoreForm(scope.row)"
              >面试
              </el-button>

              <template v-if="isBoss">
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

        <el-dialog title="开始面试" :visible.sync="open" width="600px" append-to-body>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="vitaeId">
                  <el-input v-if="false" v-model="form.vitaeId"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="评分" prop="score">
                  <el-select v-model="form.score" placeholder="评分" disabled>
                    <el-option
                      label="优秀"
                      value="S"
                    ></el-option>
                    <el-option
                      label="胜任"
                      value="A"
                    ></el-option>
                    <el-option
                      label="合格"
                      value="B"
                    ></el-option>
                    <el-option
                      label="落选"
                      value="D"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="技能记录" prop="skillRecord">
                  <el-rate
                    v-model="assistScore1"
                    show-text
                  >
                  </el-rate>
                  <el-input v-model="form.skillRecord" placeholder="技能记录"/>
                </el-form-item>
                <el-form-item label="性格记录" prop="characterRecord">
                  <el-rate
                    v-model="assistScore2"
                    show-text
                  >
                  </el-rate>
                  <el-input v-model="form.characterRecord" placeholder="性格记录"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-button @click="calculateScore">计算</el-button>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { accessDemand, denyDemand, listDemand } from '@/api/flow/demand'
import { accessRecruit, accScore, listRecruit, poolRecruit } from '@/api/flow/recruit'
import { getInfo } from '@/api/login'
import { underline } from 'chalk'

export default {
  name: 'Demand',
  dicts: ['flow_demand_status', 'flow_recruit_status', 'post_recruit_type', 'post_recruit_time','sys_post_type','post_recruit_type','post_recruit_time'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      isBoss: false,
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
      form: {
        vitaeId:undefined,
        skillRecord:undefined,
        characterRecord:undefined,
        score: undefined
      },
      vitaeId: null,
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
        userName2: null
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
        flowType: null
      },
      rules: {
        score: [
          { required: true, message: '总评分不能为空', trigger: 'blur' }
        ]
      },
      assistScore1: undefined,
      assistScore2: undefined,
      isHr:this.$auth.hasRole('hr')
    }
  },
  created() {
    getInfo().then(res => {
      this.isBoss = (res.roles[0] === 'boss')
    })

    // console.log(
    //   JSON.parse(
    //     JSON.parse(
    //       sessionStorage.getItem('sessionObj')
    //     ).data
    //   ).username)
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
        this.recruitList.forEach(i => {
          i.vitaeAttach=i.vitaeAttach ? 'http://localhost' + process.env.VUE_APP_BASE_API + i.vitaeAttach:undefined
        })
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.form()
    },
    // 表单重置
    reset() {
      this.form = {}
      this.assistScore1=undefined
      this.assistScore2=undefined
      this.resetForm('form')
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

    // 弹出面试评价表单
    openScoreForm(row) {
      this.open = true
      this.vitaeId = row.vitaeId
      this.reset()
    },

    submitForm() {
      this.form.vitaeId = this.vitaeId
      const data = this.form
      this.$modal.confirm('确认结束本轮面试？').then(function() {
        return accScore(data)
      }).then(() => {
        this.open = false
        this.getList()
        this.$modal.msgSuccess('本轮面试已通过')
      }).catch(() => {
      })

    },

    // todo 通过面试
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
    },
    calculateScore() {
      let t = this.assistScore1 + this.assistScore2
      if (t <= 4) {
        this.form.score = 'D'
      } else if (t === 5) {
        this.form.score = 'B'
      } else if (t > 5 && t <= 8) {
        this.form.score = 'A'
      } else if (t === 9 || t === 10) {
        this.form.score = 'S'
      }
      this.$message.success(`综合评分：${this.form.score}`)
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>

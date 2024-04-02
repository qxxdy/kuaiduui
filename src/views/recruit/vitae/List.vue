<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="手机号" prop="personPhone">
        <el-input
          v-model="queryParams.personPhone"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最高学历" prop="personEduMax">
        <el-select v-model="queryParams.personEduMax" placeholder="最高学历" clearable>
          <el-option
            v-for="dict in dict.type.vitae_edu_max"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄分布" prop="age">
        <el-select v-model="queryParams.age" placeholder="年龄分布" clearable>
          <el-option
            label="25岁以下"
            value="25"
          />
          <el-option
            label="25-40"
            value="40"
          />
          <el-option
            label="40岁以上"
            value="41"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="求职岗位" prop="postName">
        <el-select v-model="queryParams.postId" placeholder="求职岗位" clearable>
          <el-option
            v-for="post in postList"
            :key="post.postId"
            :label="post.postName"
            :value="post.postId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="流转类别" prop="postName">
        <el-select v-model="queryParams.flowType" placeholder="流转类别" clearable>
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      :data="demandList"
      style="width: 100%"
    >
      <el-table-column
        label="证件照"
        prop="avatar"
      >

        <template slot-scope="scope">
          <el-image style="width: 50px;" :src="scope.row.avatar"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="personPhone"
      >
      </el-table-column>
      <el-table-column
        sortable
        label="年龄"
        prop="age"
      >
      </el-table-column>
      <el-table-column
        label="最高学历"
        prop="personEduMax"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.vitae_edu_max" :value="scope.row.personEduMax"/>
        </template>
      </el-table-column>
      <el-table-column
        label="专业类别"
        prop="personEduMajor"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.vitae_edu_major" :value="scope.row.personEduMajor"/>
        </template>
      </el-table-column>
      <el-table-column
        label="期望月薪（k）"
        prop="intentionWillsalary"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.vitae_intention_salary" :value="scope.row.intentionWillsalary"/>
        </template>
      </el-table-column>
      <el-table-column
        label="岗位名称"
        prop="postName"
      >
      </el-table-column>
      <el-table-column
        label="岗位类型"
        prop="intentionWilljob"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_post_type" :value="scope.row.intentionWilljob"/>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        label="一面评价"
        prop="score1"
      >
      </el-table-column>
      <el-table-column
        sortable
        label="二面评价"
        prop="score2"
      >
      </el-table-column>
      <el-table-column
        label="流转类别"
        prop="flowType"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.flow_recruit_status" :value="scope.row.flowType"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" @click="showInfo(scope.row)">查看简历</el-button>


          <el-dropdown v-if="scope.row.flowType==='1'" size="mini"
                       @command="(command) => handleCommand(command, scope.row)"
          >
            <el-button size="mini" type="text" icon="el-icon-d-arrow-right">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="handleRecruitAccess" icon="el-icon-key">通过</el-dropdown-item>
              <el-dropdown-item command="handleRecruitPool" icon="el-icon-circle-check">终止</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown v-else-if="scope.row.flowType==='5'" size="mini"
                       @command="(command) => handleCommand(command, scope.row)"
          >
            <el-button size="mini" type="text" icon="el-icon-d-arrow-right">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="handleRecruitReAccess" icon="el-icon-key">通过</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


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

    <el-dialog
      :visible.sync="dialog"
    >
      <el-descriptions :title="desc.title" border>
        <el-descriptions-item label="姓名">{{ desc.personName }}</el-descriptions-item>
        <el-descriptions-item label="年龄">{{ desc.age }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{ desc.personPhone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ desc.personEmail }}</el-descriptions-item>
        <el-descriptions-item label="现居住地">
          <dict-tag :options="dict.type.city_type" :value="desc.personAddress"/>
        </el-descriptions-item>
        <el-descriptions-item label="户口所在地">
          <dict-tag :options="dict.type.city_type" :value="desc.personHousehold"/>
        </el-descriptions-item>
        <el-descriptions-item label="最高学历">
          <dict-tag :options="dict.type.vitae_edu_max" :value="desc.personEduMax"/>
        </el-descriptions-item>
        <el-descriptions-item label="学习形式">
          <dict-tag :options="dict.type.vitae_edu_form" :value="desc.personEduForm"/>
        </el-descriptions-item>
        <el-descriptions-item label="学校名称">
          <dict-tag :options="dict.type.edu_type" :value="desc.personEduName"/>
        </el-descriptions-item>
        <el-descriptions-item label="专业类别">
          <dict-tag :options="dict.type.vitae_edu_major" :value="desc.personEduMajor"/>
        </el-descriptions-item>
        <el-descriptions-item label="现从事职业">
          <dict-tag :options="dict.type.sys_post_type" :value="desc.intentionNowjob"/>
        </el-descriptions-item>
        <el-descriptions-item label="求职状态">
          <dict-tag :options="dict.type.vitae_intention_status" :value="desc.intentionStatus"/>
        </el-descriptions-item>
        <el-descriptions-item label="期望从事职业">
          <dict-tag :options="dict.type.sys_post_type" :value="desc.intentionWilljob"/>
        </el-descriptions-item>
        <el-descriptions-item label="现月薪（k）">
          <dict-tag :options="dict.type.vitae_intention_salary" :value="desc.intentionNowsalary"/>
        </el-descriptions-item>
        <el-descriptions-item label="期望月薪（k）">
          <dict-tag :options="dict.type.vitae_intention_salary" :value="desc.intentionWillsalary"/>
        </el-descriptions-item>
        <el-descriptions-item label="专业技能">
          <el-popover trigger="hover" placement="bottom">
            <p>
              {{ desc.personReview }}
            </p>
            <div slot="reference" class="name-wrapper">
              <p size="medium">{{ desc.personReview}}...<i
                class="el-icon-view el-icon--right"
              ></i></p>
            </div>
          </el-popover>
        </el-descriptions-item>
        <template v-for="(practice,index) in desc.practices">
          <el-descriptions-item :label="'工作经历' + ++index">
            <el-popover trigger="hover" placement="bottom">
              <p>
                <b>公司名称：</b>{{ practice.practiceName }} ( {{ practice.beginTime }} ~ {{ practice.endTime }} )
                <el-divider></el-divider>
                <b>工作岗位：</b>{{ practice.practicePost }}
                <el-divider></el-divider>
                <b>工作内容：</b>{{ practice.practiceInfo }}

              </p>
              <div slot="reference" class="name-wrapper">
                <p size="medium">
                  <b>公司名称：</b>{{ practice.practiceName }}
                  <i class="el-icon-view el-icon--right"></i></p>
              </div>
            </el-popover>


          </el-descriptions-item>
        </template>
      </el-descriptions>
    </el-dialog>

    <el-dialog title="指定面试官" :visible.sync="open" width="600px" append-to-body>
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
            <el-form-item label="一面" prop="userName1">
              <el-select v-model="form.recruit1" placeholder="一面">
                <el-option
                  v-for="user in userList"
                  :key="user.userId"
                  :label="user.userName"
                  :value="user.userId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="二面" prop="userName2">
              <el-select v-model="form.recruit2" placeholder="二面">
                <el-option
                  v-for="user in userList"
                  :key="user.userId"
                  :label="user.userName"
                  :value="user.userId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import { getRecruitUserList, listVitae } from '@/api/recruit/vitae'
import { accByVitaeId, poolRecruitByVitaeId } from '@/api/flow/recruit'
import { listAllPost } from '@/api/system/post'

export default {
  dicts: ['sys_normal_disable', 'sys_post_type', 'vitae_edu_max', 'vitae_edu_major', 'vitae_edu_form', 'vitae_job_type', 'vitae_intention_status', 'vitae_intention_salary', 'flow_recruit_status', 'city_type', 'edu_type'],
  data() {
    return {
      avatar: undefined,
      vitaeId: undefined,
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 需求表格数据
      demandList: [],
      // 所有岗位列表
      postList: [],
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      dialog: false,
      desc: {},
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      rules: {
        userName1: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        userName2: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
        ]
      },
      userList: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        userName1: undefined,
        userName2: undefined
      }
    },
    /** 查询需求列表 */
    getList() {
      this.loading = true
      listVitae(this.queryParams).then(response => {
        this.demandList = response.rows
        this.total = response.total
        this.loading = false
        // this.options.img =  +
        this.demandList.forEach(i => {
          i.avatar = 'http://localhost' + process.env.VUE_APP_BASE_API + i.avatar
        })
        // console.log(this.demandList[0].avatar)
      })
      listAllPost().then(response => {
        this.postList = response.data
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('recruit/vitae/export', {
        ...this.queryParams
      }, `vitae_${new Date().getTime()}.xlsx`)
    },
    showInfo(row) {
      this.dialog = true
      this.desc.title = `[${row.personName}] - 简历`
      this.desc.personName = row.personName
      this.desc.personPhone = row.personPhone
      this.desc.personEmail = row.personEmail
      this.desc.personAddress = row.personAddress
      this.desc.personHousehold = row.personHousehold
      this.desc.personEduMax = row.personEduMax
      this.desc.personEduForm = row.personEduForm
      this.desc.personEduName = row.personEduName
      this.desc.personEduMajor = row.personEduMajor
      this.desc.personNation = row.personNation
      this.desc.personReview = row.personReview
      this.desc.intentionNowjob = row.intentionNowjob
      this.desc.intentionStatus = row.intentionStatus
      this.desc.intentionWilljob = row.intentionWilljob
      this.desc.intentionNowsalary = row.intentionNowsalary
      this.desc.intentionNowsalary = row.intentionNowsalary
      this.desc.intentionWillsalary = row.intentionWillsalary
      this.desc.postName = row.postName
      this.desc.age = row.age
      this.desc.practices = row.practices
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.postId = undefined
      this.queryParams.flowType = undefined
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 待出筛》待一面
    handleRecruitAccess(data) {
      // const ids = row.id || this.ids
      this.$modal.confirm('确认通过该简历？').then(function() {
        return accByVitaeId(data)
      }).then(() => {
        this.reset()
        this.getList()
        this.$modal.msgSuccess('该简历已通过初筛')
      }).catch(() => {
      })
    },
    // 人才库》待一面
    handleRecruitReAccess(data) {
      this.$modal.confirm('确认捞取该人才？').then(function() {
        return accByVitaeId(data)
      }).then(() => {
        this.reset()
        this.getList()
        this.$modal.msgSuccess('该简历已通过初筛')
      }).catch(() => {
      })
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case 'handleRecruitAccess':
          this.vitaeId = row.id
          this.handleUserList(this.vitaeId)
          this.open = true
          this.reset()
          // this.handleRecruitAccess(row)
          break
        case 'handleRecruitReAccess':
          this.vitaeId = row.id
          this.handleUserList(this.vitaeId)
          this.open = true
          this.reset()
          // this.handleRecruitAccess(row)
          break
        case 'handleRecruitPool':

          this.handleRecruitPool(row)
          break
        default:
          break
      }
    },
    handleUserList(vid) {
      getRecruitUserList(vid).then(res => {
        console.log(">>>")
        this.userList = res.data
        console.log(this.userList)
      })
    },
    submitForm() {
      if (this.form.recruit1 === this.form.recruit2) {
        this.$message.error('一二面面试官不可为同一人，请重新选择')
        return
      }
      this.form.vitaeId = this.vitaeId
      this.handleRecruitAccess(this.form)
      this.open = false
    },
    handleRecruitPool(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('确认落选该简历？').then(function() {
        return poolRecruitByVitaeId(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('该简历已落选')
      }).catch(() => {
      })
    },
    handleAdd() {
      this.reset()
      this.getNoHcPostList()
      this.getUserList()
    }
  }
}
</script>

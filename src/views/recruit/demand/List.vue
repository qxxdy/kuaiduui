<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属部门" prop="deptId">
        <el-select clearable v-model="queryParams.deptId" placeholder="请选择所属部门">
          <el-option
            v-for="dept in deptList"
            :key="dept.deptId"
            :label="dept.deptName"
            :value="dept.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="岗位名称" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="请输入岗位名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="岗位类别" prop="postType">
        <el-select v-model="queryParams.postType" placeholder="岗位类别" clearable>
          <el-option
            v-for="dict in dict.type.sys_post_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="招聘类型" prop="recruitType">
        <el-select clearable v-model="queryParams.recruitType" placeholder="请选择招聘类型">
          <el-option
            v-for="dict in dict.type.post_recruit_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="招聘时间" prop="recruitTime">
        <el-select clearable v-model="queryParams.recruitTime" placeholder="请选择招聘时间">
          <el-option
            v-for="dict in dict.type.post_recruit_time"
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="岗位名称">
              <span>{{ props.row.postName }}</span>
            </el-form-item>
            <el-form-item label="招聘人数">
              <span>{{ props.row.postHc }}</span>
            </el-form-item>
            <el-form-item label="岗位描述">
              <span>{{ props.row.postDesc }}</span>
            </el-form-item>
            <el-divider direction="vertical"></el-divider>
            <el-form-item label="岗位要求">
              <span>{{ props.row.postDuty }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="所属部门"
        prop="deptName"
      >
      </el-table-column>
      <el-table-column
        label="岗位名称"
        prop="postName"
      >
      </el-table-column>
      <el-table-column
        label="岗位类别"
        prop="postType"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_post_type" :value="scope.row.postType"/>
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
          <dict-tag :options="dict.type.post_recruit_time" :value="scope.row.recruitTime"/>
        </template>
      </el-table-column>
      <el-table-column
        label="招聘人数"
        prop="postHc"
      >
      </el-table-column>
      <el-table-column
        label="求职人数"
        prop="vitaeCount"
      >
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.recruitStatus"
            active-value="0"
            inactive-value="1"
            @change="handleStatusChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="handleVitae(scope.row)"
          >详情
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

    <!-- 添加或修改需求对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="岗位名称" prop="postName">
          <el-input :disabled="true" v-model="form.postName" placeholder="请输入岗位名称"/>
        </el-form-item>
        <el-form-item label="岗位类别" prop="postType">
          <el-radio-group :disabled="true" v-model="form.postType">
            <el-radio
              v-for="dict in dict.type.sys_post_type"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="需求人数" prop="postHc">
          <el-input v-model="form.postHc" placeholder="请输入需求人数" type="number" min="1"/>
        </el-form-item>


        <el-form-item label="岗位描述" prop="postDesc">
          <el-input v-model="form.postDesc" placeholder="请输入岗位描述" type="textarea"/>
        </el-form-item>

        <el-form-item label="岗位要求" prop="postDuty">
          <el-input v-model="form.postDuty" placeholder="请输入岗位要求" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


    <!--新增-->
    <el-dialog :title="title" :visible.sync="open2" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="审批人" prop="endUser">
          <el-select v-model="form.endUser" placeholder="请选择审批人">
            <el-option
              v-for="user in userList"
              :key="user.userId"
              :label="user.userName"
              :value="user.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位名称" prop="postId">
          <el-select v-model="form.postId"
                     placeholder="请选择岗位名称"
                     filterable>
            <el-option
              v-for="post in noHcPostList"
              :key="post.postId"
              :label="post.postName"
              :value="post.postId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="招聘类型" prop="recruitType">
          <el-select clearable v-model="form.recruitType" placeholder="请选择招聘类型">
            <el-option
              v-for="dict in dict.type.post_recruit_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="招聘时间" prop="recruitTime" v-if="form.recruitType==='1'">
          <el-select clearable v-model="form.recruitTime" placeholder="请选择招聘时间">
            <el-option
              v-for="dict in dict.type.post_recruit_time"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="需求人数" prop="postHc">
          <el-input v-model="form.postHc" placeholder="请输入需求人数" type="number" min="1"/>
        </el-form-item>

        <el-form-item label="岗位描述" prop="postDesc">
          <el-input v-model="form.postDesc" placeholder="请输入岗位描述" type="textarea"/>
        </el-form-item>

        <el-form-item label="岗位要求" prop="postDuty">
          <el-input v-model="form.postDuty" placeholder="请输入岗位要求" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!--简历-->
    <el-drawer
      :title="drawerTitle"
      :visible.sync="open3"
      direction="rtl"
      size="50%"
    >
      <el-table :data="vitaeList">
        <el-table-column
          label="手机号"
          prop="personPhone"
        />
        <el-table-column
          sortable
          label="年龄"
          prop="age"
        />
        <el-table-column
          sortable
          label="一面评价"
          prop="score1"
        />
        <el-table-column
          sortable
          label="二面评价"
          prop="score2"
        />
        <el-table-column label="流转类型" align="center" prop="flowType">
          <template slot-scope="scope">
            <dict-tag :options="dict.type.flow_recruit_status" :value="scope.row.flowType"/>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

  </div>
</template>

<style>
.demo-table-expand {
  margin-left: 15px;
  font-size: 0;
}

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
import { getDemand, listDemand, listNoHcPost, listUser, updateDemand, changeDemandStatus } from '@/api/recruit/demand'
import { addDemand } from '@/api/flow/demand'
import { getVitaeListByPostId } from '@/api/recruit/vitae'
import { listSubDept } from '@/api/system/dept'

export default {
  dicts: ['sys_normal_disable', 'sys_post_type', 'flow_recruit_status', 'post_recruit_type', 'post_recruit_time', 'sys_normal_disable'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 需求表格数据
      demandList: [],
      noHcPostList: [],
      userList: [], // 审批人列表【除了当前用户的所有可用用户】
      vitaeList: [],
      drawerTitle: null,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false, // 修改
      open2: false, // 新增
      open3: false, // 简历drawer
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        postName: undefined,
        postType: undefined,
        deptId: undefined,
        status: undefined,
        recruitType: undefined,
        recruitTime: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        endUser: [
          { required: true, message: '待办人不能为空', trigger: 'blur' }
        ],
        postId: [
          { required: true, message: '需求名称不能为空', trigger: 'blur' }
        ],
        postHc: [
          { required: true, message: '需求人数不能为空', trigger: 'blur' }
        ],
        postDesc: [
          { required: true, message: '需求描述不能为空', trigger: 'blur' }
        ],
        postDuty: [
          { required: true, message: '需求要求不能为空', trigger: 'blur' }
        ],
        recruitType: [
          { required: true, message: '招聘类型不能为空', trigger: 'blur' }
        ],
        recruitTime: [
          { required: true, message: '招聘时间不能为空', trigger: 'blur' }
        ],
      },
      deptList: []
    }
  },
  created() {
    this.getList()
    listSubDept().then(res => {
      this.deptList = res.data
    })
  },
  methods: {
    getNoHcPostList() {
      listNoHcPost().then(response => {
        this.noHcPostList = response.data
      })
    },
    getUserList() {
      listUser().then(response => {
        this.userList = response.data
      })
    },
    /** 查询需求列表 */
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
      this.open2 = false
      this.open3 = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        endUser: undefined,
        postId: undefined,
        postName: undefined,
        postType: '1',
        postHc: 1,
        postDesc: undefined,
        postDuty: undefined,
        status: '0',
        recruitType: undefined
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.getNoHcPostList()
      this.getUserList()
      this.open2 = true
      this.title = '添加需求'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const postId = row.postId || this.ids
      getDemand(postId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改需求'
      })
    },
    /** 详情按钮操作 */
    handleVitae(row) {
      getVitaeListByPostId(row.postId).then(res => {
        this.vitaeList = res.data
        this.drawerTitle = row.postName
        this.open3 = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.postId != undefined) {
            updateDemand(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/post/export', {
        ...this.queryParams
      }, `post_${new Date().getTime()}.xlsx`)
    },
    /** 提交按钮 */
    submitForm2: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.postId != undefined) {
            addDemand(this.form).then(response => {
              this.$modal.msgSuccess('申请成功，等待审批通过')
              this.open2 = false
              this.getList()
            })
          }
        }
      })
    },
    handleStatusChange(row) {
      let text = row.recruitStatus === "0" ? "释放" : "关闭";
      this.$modal.confirm('确认要"' + text + '""' + row.postName + '"岗位吗？').then(function() {
        return changeDemandStatus(row.postId, row.recruitStatus);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function() {
      });
    },
  }
}
</script>

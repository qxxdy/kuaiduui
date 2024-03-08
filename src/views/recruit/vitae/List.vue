<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="需求名称" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="请输入需求名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="需求类别" prop="postType">
        <el-select v-model="queryParams.postType" placeholder="需求类别" clearable>
          <el-option
            v-for="dict in dict.type.sys_post_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="需求状态" clearable>
          <el-option
            v-for="dict in dict.type.sys_normal_disable"
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
            <el-form-item label="需求名称">
              <span>{{ props.row.postName }}</span>
            </el-form-item>
            <el-form-item label="招聘人数">
              <span>{{ props.row.postHc }}</span>
            </el-form-item>
            <el-form-item label="需求描述">
              <span>{{ props.row.postDesc }}</span>
            </el-form-item>
            <el-divider direction="vertical"></el-divider>
            <el-form-item label="需求要求">
              <span>{{ props.row.postDuty }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        label="姓名"
        prop="personName"
      >
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="personPhone"
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
        label="专业名称"
        prop="personEduMajor"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.vitae_edu_major" :value="scope.row.personEduMajor"/>
        </template>
      </el-table-column>
      <el-table-column
        label="期望月薪"
        prop="intentionWillsalary"
      >
      </el-table-column>
      <el-table-column
        label="岗位名称"
        prop="postName"
      >
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
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改需求对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="需求名称" prop="postName">
          <el-input :disabled="true" v-model="form.postName" placeholder="请输入需求名称"/>
        </el-form-item>
        <el-form-item label="需求人数" prop="postHc">
          <el-input v-model="form.postHc" placeholder="请输入需求人数" type="number" min="1"/>
        </el-form-item>
        <el-form-item label="需求类别" prop="postType">
          <el-radio-group v-model="form.postType">
            <el-radio
              v-for="dict in dict.type.sys_post_type"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="需求描述" prop="postDesc">
          <el-input v-model="form.postDesc" placeholder="请输入需求描述" type="textarea"/>
        </el-form-item>

        <el-form-item label="需求要求" prop="postDuty">
          <el-input v-model="form.postDuty" placeholder="请输入需求要求" type="textarea"/>
        </el-form-item>

        <el-form-item label="需求状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.sys_normal_disable"
              :key="dict.value"
              :label="dict.value"
            >{{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
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
import { addDemand, getDemand, listVitae, updateDemand } from '@/api/recruit/vitae'

export default {
  dicts: ['sys_normal_disable', 'sys_post_type','vitae_edu_max','vitae_edu_major',],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 需求表格数据
      demandList: [],
      total: 0, // 数据库中的总记录数
      page: 1, // 默认页码
      limit: 10, // 每页记录数
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        postName: undefined,
        postType: undefined,
        status: undefined
      },
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        postName: [
          { required: true, message: '需求名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询需求列表 */
    getList() {
      this.loading = true
      listVitae(this.queryParams).then(response => {
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
        postId: undefined,
        postName: undefined,
        postType: '1',
        postHc: 1,
        postDesc: undefined,
        postDuty: undefined,
        status: '0'
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
      this.open = true
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
          } else {
            addDemand(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
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
    }
  }
}
</script>

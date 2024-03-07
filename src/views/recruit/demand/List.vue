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
        label="需求名称"
        prop="postName"
      >
      </el-table-column>
      <el-table-column
        label="需求类别"
        prop="postType"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_post_type" :value="scope.row.postType"/>
        </template>
      </el-table-column>
      <el-table-column
        label="招聘人数"
        prop="postHc"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        prop="status"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
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
import { listDemand, getDemand, updateDemand, addDemand } from '@/api/recruit/demand'

export default {
  dicts: ['sys_normal_disable', 'sys_post_type'],
  data() {
    return {
      tableData: [{
        postId: '12987122',
        postName: '人力资源',
        postType: '职能',
        postHc: '3',
        postDesc: '1、深度参与集团组织、人才管理的关键战略的形成与输出；\n' +
          '2、通过对重点管理政策深入细致的梳理和分析，结合行业内外领先实践，制定和迭代适合集团整体的组织人才管理策略，协同人力资源管理专家共同支持业务发展；\n' +
          '3、定义集团各项业务的组织、人才管理核心指标并跟进迭代，通过数据分析发掘关键问题，提供解决方案。',
        postDuty: '1、博士研究生，成绩优异，对产业互联网实践充满热情；\n' +
          '2、学习能力强，有全局视野和结构化思维，擅长认识和解决复杂问题，有突破性地实现关键目标的经验；\n' +
          '3、具备优秀的责任感、同理心，具备良好的沟通能力，人际交往能力突出，团队合作能力强；\n' +
          '4、对商业问题有较好的理解，具备构建抽象概念模型/数学模型的经验，对数据有敏感性。'
      }],
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 需求表格数据
      demandList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        postName: undefined,
        postType: undefined,
        status: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        postName: [
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
        postType: [
          { required: true, message: '需求累呗不能为空', trigger: 'blur' }
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
        postId: undefined,
        postName: undefined,
        postType: '1',
        postHc:1,
        postDesc:undefined,
        postDuty:undefined,
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

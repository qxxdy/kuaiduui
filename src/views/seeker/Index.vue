<template>
  <div class="dashboard-editor-container">

    <el-select v-model="queryParams.postType" placeholder="岗位类别" clearable>
      <el-option
        v-for="dict in dict.type.sys_post_type"
        :key="dict.value"
        :label="dict.label"
        :value="dict.value"
      />
    </el-select>
    <el-input placeholder="请输入岗位名称" v-model="queryParams.postName" class="input-with-select">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="handleQuery"
      />
      <el-button
        slot="append"
        icon="el-icon-close"
        @click="resetQuery"
      />
    </el-input>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-row :gutter="32" style="padding:16px 16px 0;margin-bottom:32px;">
      <el-col
        v-for="d in demandList"
        :span="24"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span v-if="d.postHc>=10">🔥</span>
            <span><b>{{ d.postName }}</b></span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="handleAdd(d.postName)"
            >
              <dict-tag :options="dict.type.sys_post_type" :value="d.postType"/>
              投递
            </el-button>
          </div>
          <div class="text item">
            <b>岗位描述：</b>{{ d.postDesc }}
            <br><br>
            <b>岗位职责：</b>{{ d.postDuty }}
            <br><br>
            <b>招聘人数：</b>{{ d.postHc }} 人
            <br>
          </div>
        </el-card>
        <el-divider></el-divider>
      </el-col>
    </el-row>

    <el-drawer
      :title="title"
      :visible.sync="open"
      direction="rtl"
      size="95%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.personName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.personEmail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.personPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="form.personGender">
              <el-radio
                v-for="dict in dict.type.sys_user_sex"
                :key="dict.value"
                :label="dict.value"
              >{{ dict.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="现居住地" :label-width="formLabelWidth">
            <el-input v-model="form.personAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="户口所在地" :label-width="formLabelWidth">
            <el-input v-model="form.personHousehold" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="最高学历" :label-width="formLabelWidth">
            <el-radio-group v-model="form.personGender">
              <el-radio
                v-for="dict in dict.type.vitae_edu_max"
                :key="dict.value"
                :label="dict.value"
              >{{ dict.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学习形式" :label-width="formLabelWidth">
            <el-radio-group v-model="form.personGender">
              <el-radio
                v-for="dict in dict.type.vitae_edu_form"
                :key="dict.value"
                :label="dict.value"
              >{{ dict.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学校名称" :label-width="formLabelWidth">
            <el-input v-model="form.personEduName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业名称" :label-width="formLabelWidth">
            <el-radio-group v-model="form.personGender">
              <el-radio
                v-for="dict in dict.type.vitae_edu_major"
                :key="dict.value"
                :label="dict.value"
              >{{ dict.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="民族" :label-width="formLabelWidth">
            <el-input v-model="form.personReview" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="自我评价" :label-width="formLabelWidth">
            <el-input v-model="form.personReview" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现从事职业" :label-width="formLabelWidth">
            <el-input v-model="form.intentionNowjob" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="求职状态" :label-width="formLabelWidth">
            <el-input v-model="form.intentionStatus" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="期望从事职业" :label-width="formLabelWidth">
            <el-input v-model="form.intentionWilljob" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现月薪" :label-width="formLabelWidth">
            <el-input v-model="form.intentionNowsalary" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="期望月薪" :label-width="formLabelWidth">
            <el-input v-model="form.intentionWillsalary" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { listDemand } from '@/api/recruit/demand'

export default {
  dicts: ['sys_post_type', 'sys_user_sex', 'vitae_edu_max', 'vitae_edu_form', 'vitae_edu_major', 'vitae_intention_status'],
  created() {
    this.getList()
  },
  data() {
    return {
      total: 0,
      open: false,
      form: {},
      title: null,
      demandList: null,
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        postName: undefined,
        postType: undefined
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    resetQuery() {
      this.queryParams = { pageNum: 1 }
      this.handleQuery()
    },
    getList() {
      listDemand(this.queryParams).then(response => {
        this.total = response.total
        this.demandList = response.rows
      })
    },
    handleAdd(name) {
      this.reset()
      // this.getUserList()
      this.open = true
      this.title = name
    },
    reset() {
      this.form = {
        personName: undefined,
        personEmail: undefined,
        personPhone: undefined,
        personGender: '1',
        personAddress: 1,
        personHousehold: undefined,
        persoEduMax: undefined,
        personEduForm: '0',
        personEduName: '0',
        personEduMajor: '0',
        personNation: '0',
        personReview: '0',
        intentionNowjob: '0',
        intentionStatus: '0',
        intentionWillJob: '0',
        intentionNowsalary: '0',
        intentionWillsalry: '0'
      }
      this.resetForm('form')
    },
    cancel() {
      this.open = false
      this.reset()
    },
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.personName != undefined) {
            addVitae(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

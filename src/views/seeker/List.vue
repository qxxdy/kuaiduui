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
              v-if="isCan"
              style="float: right; padding: 3px 0"
              type="text"
              @click="handleAdd(d)"
            >
              <dict-tag :options="dict.type.sys_post_type" :value="d.postType"/>
              投递
            </el-button>
          </div>
          <div class="text item">
            <b>岗位描述：</b>{{ d.postDesc }}
            <br><br>
            <b>任职要求：</b>{{ d.postDuty }}
            <br><br>
            <b>招聘人数：</b>{{ d.postHc }} 人
            <br>
          </div>
        </el-card>
        <el-divider></el-divider>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { listSeekerDemand } from '@/api/recruit/demand'
import ImageUpload from '../../components/ImageUpload'
import { getUserProfile } from '@/api/system/user'
import { sendVitaeToPost } from '@/api/recruit/vitae'
import { listVitae } from '@/api/recruit/vitae'
import {poolType} from '@/const'

export default {
  dicts: ['sys_post_type', 'sys_user_sex', 'vitae_edu_max', 'vitae_edu_form', 'vitae_edu_major', 'vitae_intention_status', 'vitae_intention_salary', 'city_type', 'edu_type'],
  components: {
    ImageUpload
  },
  created() {
    this.getList()
    getUserProfile().then(res => {
      this.personPhone = res.data.phonenumber
      listVitae(this.personPhone).then(res => {
        let data=res.rows[0]
        if (data.flowType&&data.flowType!==poolType) {
          this.$message.error("您当前简历已在流程中，请勿重复投递！")
          this.isCan = false
          return
        }
        this.vitaeInfo = res.data
      })
    })
  },
  data() {
    return {
      imgLimit: 1,
      total: 0,
      demandList: null,
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        postName: undefined,
        postType: undefined
      },
      personPhone: undefined,
      postId: undefined,
      isCan: true,
      vitaeInfo: {}
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
      listSeekerDemand(this.queryParams).then(response => {
        this.total = response.total
        this.demandList = response.rows
      })
    },
    handleAdd(d) {
      let postId = d.postId
      let personPhone=this.personPhone
      this.$modal.confirm('确认投递该岗位？').then(function() {
        return sendVitaeToPost(personPhone, postId)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('投递成功')
        window.location.reload()
      }).catch(() => {
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

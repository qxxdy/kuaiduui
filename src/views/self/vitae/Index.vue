<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules">
      <el-input v-model="form.postId" v-if="false"/>

      <el-form-item label="证件照"
                    prop="avatar"
                    :label-width="formLabelWidth"
      >
        <image-upload v-model="form.avatar" :limit="imgLimit"></image-upload>
      </el-form-item>

      <el-form-item label="简历附件"
                    prop="vitaeAttach"
                    :label-width="formLabelWidth"
      >
        <file-upload v-model="form.vitaeAttach" :limit="1"></file-upload>
      </el-form-item>

      <el-form-item label="姓名"
                    prop="personName"
                    :label-width="formLabelWidth"
      >
        <el-input v-model="form.personName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="personEmail"
                    :label-width="formLabelWidth"
      >
        <el-input disabled v-model="form.personEmail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="personPhone"
                    :label-width="formLabelWidth"
      >
        <el-input disabled v-model="form.personPhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄"
                    prop="age"
                    :label-width="formLabelWidth"
      >
        <el-date-picker
          v-model="form.birth"
          type="year"
          placeholder="选择出生年份"
          @change="changeAge"
        >
        </el-date-picker>
        <el-divider direction="vertical"></el-divider>
        <template v-if="form.birth>0||form.age">{{ form.age }} 岁</template>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio-group v-model="form.personGender">
          <el-radio disabled
                    v-for="dict in dict.type.sys_user_sex"
                    :key="dict.value"
                    :label="dict.value"
          >{{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="现居住地" :label-width="formLabelWidth">
        <el-select v-model="form.personAddress" placeholder="现居住地">
          <el-option
            v-for="dict in dict.type.city_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="户口所在地" :label-width="formLabelWidth">
        <el-select v-model="form.personHousehold" placeholder="户口所在地" clearable>
          <el-option
            v-for="dict in dict.type.city_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="最高学历" :label-width="formLabelWidth">
        <el-select v-model="form.personEduMax" placeholder="最高学历">
          <el-option
            v-for="dict in dict.type.vitae_edu_max"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学习形式" :label-width="formLabelWidth">
        <el-radio-group v-model="form.personEduForm">
          <el-radio
            v-for="dict in dict.type.vitae_edu_form"
            :key="dict.value"
            :label="dict.value"
          >{{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学校名称" :label-width="formLabelWidth">
        <el-select v-model="form.personEduName" placeholder="学校名称">
          <el-option
            v-for="dict in dict.type.edu_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专业名称" :label-width="formLabelWidth">
        <el-radio-group v-model="form.personEduMajor">
          <el-radio
            v-for="dict in dict.type.vitae_edu_major"
            :key="dict.value"
            :label="dict.value"
          >{{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="现从事职业" :label-width="formLabelWidth">
        <el-radio-group v-model="form.intentionNowjob">
          <el-radio
            v-for="dict in dict.type.sys_post_type"
            :key="dict.value"
            :label="dict.value"
          >{{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="求职状态" :label-width="formLabelWidth">
        <el-radio-group v-model="form.intentionStatus">
          <el-radio
            v-for="dict in dict.type.vitae_intention_status"
            :key="dict.value"
            :label="dict.value"
          >{{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="现月薪" :label-width="formLabelWidth">
        <el-select v-model="form.intentionNowsalary" placeholder="现月薪">
          <el-option
            v-for="dict in dict.type.vitae_intention_salary"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="期望月薪" :label-width="formLabelWidth">
        <el-select v-model="form.intentionWillsalary" placeholder="期望月薪">
          <el-option
            v-for="dict in dict.type.vitae_intention_salary"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专业技能"
                    prop="personReview"
                    :label-width="formLabelWidth"
      >
        <el-input type="textarea" v-model="form.personReview" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(practice, index) in form.practices"
        :label="'工作经历' + ++index"
      >
        <br>
        <el-form-item label="公司名称"
                      :label-width="formLabelWidth"
        >
          <el-input v-model="practice.practiceName"
                    placeholder="公司名称"
          />
        </el-form-item>
        <el-form-item label="工作岗位"
                      :label-width="formLabelWidth"
        >
          <el-input v-model="practice.practicePost" placeholder="工作岗位"/>
        </el-form-item>
        <el-form-item label="工作内容"
                      :label-width="formLabelWidth"
        >
          <el-input type="textarea" v-model="practice.practiceInfo" placeholder="工作内容"/>
        </el-form-item>
        <el-form-item label="起止时间"
                      :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="practice.beginTime"
            type="month"
            placeholder="开始时间"
          />
          <el-date-picker
            v-model="practice.endTime"
            type="month"
            placeholder="结束时间"
          />
        </el-form-item>
        <el-button @click.prevent="removePractice(practice)" v-if="index!==1">删除</el-button>
      </el-form-item>
      <el-button @click="addPractice">➕添加工作经历</el-button>
    </el-form>
    <div class="demo-drawer__footer">
      <el-button type="primary" @click="submitForm">更新</el-button>
    </div>
  </div>
</template>

<script>
import { validateEmail, validatePhone } from '@/config'
import { addVitae,getVitaeByPhone } from '@/api/recruit/vitae'
import ImageUpload from '../../../components/ImageUpload'
import { getUserProfile } from '@/api/system/user'
import {NO_PROFILE_ERR} from '@/const'

export default {
  dicts: ['sys_post_type', 'sys_user_sex', 'vitae_edu_max', 'vitae_edu_form', 'vitae_edu_major', 'vitae_intention_status', 'vitae_intention_salary', 'city_type', 'edu_type'],
  components: {
    ImageUpload
  },
  created() {
    getUserProfile().then(res => {
      this.form.personPhone = res.data.phonenumber
      this.form.personEmail = res.data.email
      this.form.personGender = res.data.sex
      if (!res.data.phonenumber) {
        this.$message.error(NO_PROFILE_ERR)
        return
      }
      getVitaeByPhone(res.data.phonenumber).then(res=>{
        this.form.id=res.data.id
        this.form.avatar=res.data.avatar
        this.form.vitaeAttach=res.data.vitaeAttach
        this.form.personName=res.data.personName
        this.form.personAddress=res.data.personAddress
        this.form.personHousehold=res.data.personHousehold
        this.form.personEduMajor=res.data.personEduMajor
        this.form.personEduMax=res.data.personEduMax
        this.form.personEduForm=res.data.personEduForm
        this.form.personEduName=res.data.personEduName
        this.form.personReview=res.data.personReview
        this.form.intentionNowjob=res.data.intentionNowjob
        this.form.intentionStatus=res.data.intentionStatus
        this.form.intentionNowsalary=res.data.intentionNowsalary
        this.form.intentionWillsalary=res.data.intentionWillsalary
        this.form.age=res.data.age
        this.form.practices=res.data.practices
      })
    })

  },
  data() {
    return {
      imgLimit: 1,
      open: false,
      form: {
        id:undefined,
        practices: [{ value: '' }],
        avatar:undefined,
        vitaeAttach:undefined,
        personName:undefined,
        personEmail:undefined,
        personPhone:undefined,
        personGender: undefined,
        personAddress:'1',
        personHousehold: '1',
        personEduMax: '5',
        personEduForm: '1',
        personEduName: '1',
        personEduMajor: '1',
        personReview: undefined,
        intentionNowjob: '1',
        intentionStatus: '1',
        intentionNowsalary: '1',
        intentionWillsalary: '1',
        age:undefined,
        birth: undefined
      },
      title: null,
      formLabelWidth: '90px',
      rules: {
        personName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        personPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        personEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        personReview: [
          { required: true, message: '专业技能不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAdd(d) {
      this.reset()
      // this.getUserList()
      this.open = true
      this.title = d.name
      this.form.postId = d.postId
      this.form.intentionWilljob = d.postType
    },
    changeAge() {
      this.form.age = new Date().getFullYear() - new Date(this.form.birth).getFullYear()
    },
    addPractice() {
      this.form.practices.push({
        value: '',
        key: Date.now()
      })
    },
    removePractice(item) {
      var index = this.form.practices.indexOf(item)
      if (index !== -1) {
        this.form.practices.splice(index, 1)
      }
    },
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          addVitae(this.form).then(response => {
            this.$modal.msgSuccess('简历更新成功')
            this.open = false
          })
        }
      })
    }
  }
}
</script>

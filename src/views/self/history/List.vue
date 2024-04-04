<template>
  <div class="app-container">
    <el-card
      class="box-card"
      v-for="history in historys"
    >
      <div slot="header" class="clearfix">
        <span>
          <h3>{{ history.postName }}</h3>
          岗位类型：<dict-tag style="display: inline" :options="dict.type.sys_post_type" :value="history.intentionWilljob"/>
          <el-divider direction="vertical"></el-divider>
          投递时间：{{ history.sendTime }}
        </span>
      </div>
      <el-steps simple :active="step" finish-status="success">
        <el-step title="投递简历"></el-step>
        <el-step title="HR初筛" :status="screenStatus"></el-step>
        <el-step title="面试" :status="recruitStatus"></el-step>
        <el-step title="预入职"></el-step>
      </el-steps>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/system/user'
import { listVitae } from '@/api/recruit/vitae'
import {poolType,accType,successStatus,errorStatus,NO_PROFILE_ERR} from '@/const'

export default {
  dicts: ['sys_post_type'],
  created() {
    let personPhone
    let vitaeId
    getUserProfile().then(res => {
      personPhone = res.data.phonenumber
      if (!personPhone) {
        this.$message.error(NO_PROFILE_ERR)
        return
      }
      listVitae(personPhone).then(res => {
        this.historys = res.rows
        this.setStepAndStatus(res.rows[0])
      })
    })
  },
  data() {
    return {
      step: undefined,
      screenStatus: undefined,
      recruitStatus: undefined,
      historys: {}
    }
  },
  methods: {
    setStepAndStatus(data){
      let flowType=data.flowType
      let initTime=data.initTime
      let screenTime=data.screenTime
      let accTime=data.accTime
      // 未初筛
      if (!screenTime){
        this.step=1
        return
      }
      // 初筛落选
      if (flowType===poolType&&!initTime){
        this.step=2
        this.screenStatus=errorStatus
        return
      }
      // 初筛通过面试中
      if (screenTime&&flowType!==poolType&&!accTime){
        this.step=2
        this.screenStatus=successStatus
        return
      }
      // 面试中落选
      if (flowType===poolType&&initTime){
        this.step=3
        this.recruitStatus=errorStatus
        this.screenStatus=successStatus
        return
      }
      // 待入职
      this.step=4
    }
  }
}
</script>

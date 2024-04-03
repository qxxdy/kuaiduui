<template>
  <div class="dashboard-editor-container">

    <div v-has-role="['seeker']">
      <h2 style="color: #d10050">{{companyInfo.title}}</h2>
      <i>{{companyInfo.slogan}}</i>
      <el-divider></el-divider>
      <el-carousel type="card" height="400px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>

    </div>

    <div v-has-role="['boss','rd','hr','pm']">
      <!--top卡片-->
      <panel-group @handleSetLineChartData="handleSetLineChartData"/>

      <!--bottom-->
      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart/>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie2-chart/>
          </div>
        </el-col>

        <el-col size="small" :xs="24" :sm="24" :lg="8">
          <!--          <pie-chart/>-->
          <div class="chart-wrapper">
            <div slot="header" class="clearfix">
              <span>今日热榜</span>
            </div>
            <template v-for="o in hotData">
              <!--            <el-avatar size="small" :src="o.logo"></el-avatar>-->
              <el-link
                :href="o.url"
                target="_blank"
                type="primary"
              >
                <template>
                  <el-popover trigger="hover" placement="top">
                    <p>
                      {{ o.title }}
                    </p>
                    <div slot="reference" class="name-wrapper">
                      <p size="medium">🔥{{ o.views }} | {{ o.title.substring(0, 10) }}...<i
                        class="el-icon-view el-icon--right"
                      ></i></p>
                    </div>
                  </el-popover>
                </template>

              </el-link>
              <!--            <hr>-->
            </template>
          </div>
        </el-col>

      </el-row>

      <!--折线图-->
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="res"/>
      </el-row>
    </div>


  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import Pie2Chart from './dashboard/Pie2Chart'
import BarChart from './dashboard/BarChart'
import { getChartData } from '@/api/analysis'
import axios from 'axios'

const lineChartData = {

  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    Pie2Chart,
    BarChart
  },
  created() {
    getChartData().then(res => {
      this.res.demandList = res.data.demandList
      this.res.hc = res.data.hc
      this.res.vitaeCount = res.data.vitaeCount
    })
    this.getHotData()
  },
  data() {
    return {
      ak: 'IxxpeoVEzpHk4M1710400266399VwB2dZQUIr',
      hotData: [{ ID: null, title: null, url: null }],
      day: new Date(),
      lineChartData: null,
      res: { demandList: [], hc: [], vitaeCount: [] },
      companyInfo:{
        title:"快度欢迎您的加入！",
        slogan:"招最好的人，给最大的空间，看最后的结果，让优秀人才脱颖而出！",
      }
    }
  },
  methods: {
    getHotData() {
      axios.get('https://luckycola.com.cn/tools/newsHot', {
        params: {
          ColaKey: this.ak
        }
      }).then(res => {
        this.hotData = res.data.data.items.slice(0, 6)
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
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

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>

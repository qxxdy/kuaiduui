<template>
  <div class="dashboard-editor-container">
    <!--top card-->
    <Header/>
    <br>

    <!--饼图》互联网、制造业、金融业是硕士生求职TOP3行业-->
    <el-row :gutter="32" style="padding:16px 16px 0;margin-bottom:32px;">
      <el-col :span="12">
        <el-card class="box-card">
          <pie-chart></pie-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <profession-city></profession-city>
        </el-card>
      </el-col>
    </el-row>

    <!--柱状图》23届本硕生意向行业偏好-->
    <el-row style="padding:16px 16px 0;margin-bottom:32px;">
      <el-card class="box-card">
        <profession-prefer></profession-prefer>
      </el-card>
    </el-row>

    <!--折线图》23届本科生期望月薪与实际月薪趋势分布-->
    <el-row style="padding:16px 16px 0;margin-bottom:32px;">
      <el-card class="box-card">
        <salary-bachelor></salary-bachelor>
      </el-card>
    </el-row>

    <!--折线图》23届研究生期望月薪与实际月薪趋势分布-->
    <el-row style="padding:16px 16px 0;margin-bottom:32px;">
      <el-card class="box-card">
        <salary-postgraduate></salary-postgraduate>
      </el-card>
    </el-row>

  </div>

</template>

<script>
import PanelGroup from '../dashboard/PanelGroup'
import SalaryBachelor from './SalaryBachelor'
import SalaryPostgraduate from './SalaryPostgraduate'
import PieChart from './PieChart'
import BarChart from '../dashboard/BarChart'
import Header from './Header'
import ProfessionPrefer from './ProfessionPrefer'
import ProfessionCity from './ProfessionCity'

export default {
  name: 'Index',
  components: {
    Header,
    PanelGroup,
    SalaryBachelor,
    SalaryPostgraduate,
    PieChart,
    BarChart,
    ProfessionPrefer,
    ProfessionCity
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

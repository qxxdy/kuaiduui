<template>
  <div class="dashboard-editor-container">
    <!--top card-->
    <Header/>
    <br>

    <!--互联网、制造业、金融业是硕士生求职TOP3行业-->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <pie-chart></pie-chart>
    </el-row>



    <!--折线图-->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <salary-bachelor></salary-bachelor>
    </el-row>

    <!--折线图-->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <salary-postgraduate></salary-postgraduate>
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

export default {
  name: 'Index',
  components: {
    Header,
    PanelGroup,
    SalaryBachelor,
    SalaryPostgraduate,
    PieChart,
    BarChart
  },
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

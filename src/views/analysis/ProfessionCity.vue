<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import * as echarts from 'echarts'

require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {

  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ hc, vitaeCount, demandList } = {}) {
      this.chart.setOption({
        title: { text: '23届学生求职意向城市TOP10' },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} : {c}%'
        },
        xAxis: {
          type: 'category',
          data: ['北京市', '深圳市', '上海市', '广州市', '杭州市', '南京市', '成都市', '西安市', '合肥市', '武汉市']
        },
        yAxis: {
          type: 'value',
          axisLabel: { formatter: '{value}%' }
        },
        series: [
          {
            data: [22.6, 11.7, 11.5, 10.2, 6.9, 4.0, 3.8, 3.6, 2.5, 2.5],
            type: 'bar'
          }
        ]
      })
    }
  }
}
</script>

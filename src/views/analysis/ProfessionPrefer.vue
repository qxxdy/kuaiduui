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
      default: '500px'
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
        title: { text: '23届本硕生意向行业偏好' },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: '{b} : 整体{c}% 硕士{c1}% 本科{c2}%'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: true },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel: { formatter: '{value}%' }
        },
        yAxis: {
          type: 'category',
          data: ['生物医疗', '通信（运营商）', '金融业', '快销/零售', '其他', '制造业', '互联网/软件/IT']
        },
        series: [
          {
            name: '整体学生',
            type: 'bar',
            data: [2.4, 2.7, 4.5, 4.7, 9.3, 15.0, 61.4]
          },
          {
            name: '硕士',
            type: 'bar',
            data: [3.4, 2.5, 6.4, 2.9, 4.4, 21.6, 58.8]
          },
          {
            name: '本科',
            type: 'bar',
            data: [1.8, 2.8, 3.6, 5.6, 11.8, 11.5, 62.8]
          }

        ]
      })
    }
  }
}
</script>

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
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          feature: {
            dataView: { readOnly: true },
            restore: {},
            saveAsImage: {}
          }
        },
        title:{text:"23届学生调研样本学历分布"},
        legend: {
          left: 'center',
          bottom: '10',
          data: ['博士', '硕士', '本科', '其他']
        },
        series: [
          {
            avoidLabelOverlap: true,
            label: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            name: '23届学生调研样本学历分布',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '38%'],
            data: [
              { value: 23160, name: '博士' },
              { value: 3890880, name: '硕士' },
              { value: 7445940, name: '本科' },
              { value: 231600, name: '其他' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>

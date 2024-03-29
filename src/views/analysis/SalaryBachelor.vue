<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts';
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
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
  created(){

  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ hc, vitaeCount,demandList } = {}) {
      this.chart.setOption({
        title:{text:'23届本科生期望月薪与实际月薪趋势分布'},
        xAxis: {
          data: [
            '5k及以下',
            '6-8k',
            '9-11k',
            '12-15k',
            '16-20k',
            '21-25k',
            '26-30k',
            '31-40k',
            '40k以上'
          ],
          boundaryGap: true,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10],
          formatter: '{b} : 期望{c}% 实际{c1}%'
        },
        yAxis: {
          axisTick: {
            show: false
          },
          axisLabel:{formatter:'{value}%'},
        },
        legend: {
          data: ['期望月薪', '实际月薪']
        },
        series: [{
          name: '期望月薪', itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              }
            }
          },
          smooth: false,
          type: 'line',
          data: [2.1,23.8,25.9,21.3,12.4,10.8,1.8,0.5,2.3],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '实际月薪',
          smooth: false,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [10.6,22.6,22.3,18.4,11.5,8.8,2.5,0.7,1.8],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
  }
}
</script>

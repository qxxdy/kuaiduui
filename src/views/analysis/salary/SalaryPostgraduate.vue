<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme
import resize from '../mixins/resize'

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
        title:{text:'23届硕士生期望月薪与实际月薪趋势分布'},
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
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
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
          data: [0,2.5,9.8,19.1,27.9,23,12.3,2.9,2.5],
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
          data: [1.2,3.1,15.5,21.7,24.2,17.4,13.7,1.9,1.2],
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
  }
}
</script>

<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'
import { getLoginChartData } from '@/api/analysis'

require('echarts/theme/macarons') // echarts theme

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
  created() {
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
      let map = []
      let keys=[]
      getLoginChartData().then(res => {
        let keys=Object.keys(res.data)
        for (let i = 0; i < keys.length; i++) {
          map[i]=res.data[keys[i]]
          // console.log(map[i])
          const {userName:name,loginCount:value}=map[i]

          map[i]={name,value}
        }

        // [{userName: 'rd2', loginCount: '2'}]
        // console.log(map)
        keys = []
        map.forEach((k, v) => {
          keys.push(k)
        })
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            bottom: '10',
            data: keys
          },
          series: [
            {
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              name: '登录次数统计',
              type: 'pie',
              // roseType: 'radius',
              radius: ['40%', '70%'],
              // radius: [15, 95],
              center: ['50%', '38%'],
              data: map,
              // data: [
              //   { value: 320, name: '职能' },
              //   { value: 240, name: 'Technology' },
              //   { value: 149, name: 'Forex' },
              //   { value: 100, name: 'Gold' },
              //   { value: 59, name: 'Forecasts' }
              // ],
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        })
      })

    }
  }
}
</script>

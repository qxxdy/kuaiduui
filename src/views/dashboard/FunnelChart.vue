<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'
import { getFunnelChartData } from '@/api/analysis'

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
      let map=[]
      let keys=[]
      getFunnelChartData().then(res => {
        let keys=Object.keys(res.data)
        for (let i = 0; i < keys.length; i++) {
          map[i]=res.data[keys[i]]
          const {status:name,count:value}=map[i]
          map[i]={name,value}
        }
        keys = []
        map.forEach((k, v) => {
          keys.push(k)
        })
        this.chart.setOption({
          title: {
            text: '招聘过程分析'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
          },
          legend: {
            left: 'center',
            bottom: '10',
            // data: keys
            data: keys
          },
          series: [
            {
              name: 'funnel',
              type: 'funnel',
              left: '10%',
              top: 60,
              bottom: 60,
              width: '100%',
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                show: true,
                position: 'inside'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 1,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
              },
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              data: map
            }
          ]
        })
      })

    }
  }
}
</script>

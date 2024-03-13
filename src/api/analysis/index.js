import request from '@/utils/request'

// 首页折线图数据分析
export function getChartData() {
  return request({
    url: '/analysis/index/getChartData',
    method: 'get'
  })
}

// 首页top卡片数据分析
export function getPanelData() {
  return request({
    url: '/analysis/index/getPanelData',
    method: 'get'
  })
}

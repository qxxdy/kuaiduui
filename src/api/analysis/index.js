import request from '@/utils/request'


export function getLoginChartData() {
  return request({
    url: '/analysis/index/getLoginChartData',
    method: 'get'
  })
}

// 首页折线图
export function getRaddarChartData() {
  return request({
    url: '/analysis/index/getRaddarChartData',
    method: 'get'
  })
}

// 首页漏斗图
export function getFunnelChartData() {
  return request({
    url: '/analysis/index/getFunnelChartData',
    method: 'get'
  })
}

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

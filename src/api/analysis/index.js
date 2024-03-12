import request from '@/utils/request'

// 查询需求列表
export function getPanelData(query) {
  return request({
    url: '/analysis/index/getPanelData',
    method: 'get',
    params: query
  })
}

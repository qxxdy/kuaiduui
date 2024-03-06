import request from '@/utils/request'

// 查询需求列表
export function listDemand(query) {
  return request({
    url: '/recruit/demand/list',
    method: 'get',
    params: query
  })
}

export function getDemand(query) {
  return request({
    url: '/recruit/demand/list',
    method: 'get',
    params: query
  })
}

// 新增字典类型
export function addType(data) {
  return request({
    url: '/system/dict/type',
    method: 'post',
    data: data
  })
}

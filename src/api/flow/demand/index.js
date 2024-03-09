import request from '@/utils/request'

// 查询需求审批列表
export function listDemand(query) {
  return request({
    url: '/flow/demand/list',
    method: 'get',
    params: query
  })
}

// 查询需求审批详细
export function getDemand(id) {
  return request({
    url: '/flow/demand/' + id,
    method: 'get'
  })
}

// 通过需求审批
export function accessDemand(id) {
  return request({
    url: '/flow/demand/access/' + id,
    method: 'post'
  })
}

// 驳回需求审批
export function denyDemand(id) {
  return request({
    url: '/flow/demand/deny/' + id,
    method: 'post'
  })
}

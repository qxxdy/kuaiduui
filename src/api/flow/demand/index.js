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

// 新增需求审批
export function addDemand(data) {
  return request({
    url: '/flow/demand',
    method: 'post',
    data: data
  })
}

// 修改需求审批
export function updateDemand(data) {
  return request({
    url: '/flow/demand',
    method: 'put',
    data: data
  })
}

// 删除需求审批
export function delDemand(id) {
  return request({
    url: '/flow/demand/' + id,
    method: 'delete'
  })
}

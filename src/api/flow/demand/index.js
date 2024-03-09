import request from '@/utils/request'

// 【个人所有】查询需求审批列表
export function listSelfDemand(query) {
  return request({
    url: '/flow/demand/selfDemand',
    method: 'get',
    params: query
  })
}

// 【个人待办】查询需求审批列表
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

// 添加需求审批
export function addDemand(data) {
  return request({
    url: '/flow/demand/addDemand',
    method: 'post',
    data: data
  })
}

// 重新发起需求审批
export function repeatDemand(id) {
  return request({
    url: '/flow/demand/repeatDemand/'+id,
    method: 'post',
  })
}

// 立即撤回需求审批
export function recallDemand(id) {
  return request({
    url: '/flow/demand/recallDemand/'+id,
    method: 'post',
  })
}

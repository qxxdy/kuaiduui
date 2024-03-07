import request from '@/utils/request'

// 查询需求列表
export function listDemand(query) {
  return request({
    url: '/recruit/demand/list',
    method: 'get',
    params: query
  })
}

export function getDemand(postId) {
  return request({
    url: '/recruit/demand/'+postId,
    method: 'get',
  })
}

// 新增字典类型
export function updateDemand(data) {
  return request({
    url: '/recruit/demand/update',
    method: 'post',
    data: data
  })
}

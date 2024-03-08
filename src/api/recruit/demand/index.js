import request from '@/utils/request'

// 查询需求列表
export function listDemand(query) {
  return request({
    url: '/recruit/demand/list',
    method: 'get',
    params: query
  })
}

export function listNoHcPost(){
  return request({
    url: '/recruit/demand/getNoHcPostList',
    method: 'get',
  })
}

export function getDemand(postId) {
  return request({
    url: '/recruit/demand/'+postId,
    method: 'get',
  })
}

// 修改需求信息（修改hc>0的岗位）
export function updateDemand(data) {
  return request({
    url: '/recruit/demand/update',
    method: 'post',
    data: data
  })
}

// 新增需求（修改hc=0的岗位）
export function addDemand(data) {
  return request({
    url: '/recruit/demand/add',
    method: 'post',
    data: data
  })
}

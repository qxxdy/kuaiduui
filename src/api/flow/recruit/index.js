import request from '@/utils/request'


// 通过招聘审批
export function accByVitaeId(id) {
  return request({
    url: '/flow/recruit/accByVitaeId/' + id,
    method: 'post'
  })
}

// 落选招聘审批
export function poolRecruitByVitaeId(id) {
  return request({
    url: '/flow/recruit/poolByVitaeId/' + id,
    method: 'post'
  })
}

// 通过招聘审批
export function accessRecruit(id) {
  return request({
    url: '/flow/recruit/acc/' + id,
    method: 'post'
  })
}

// 落选招聘审批
export function poolRecruit(id) {
  return request({
    url: '/flow/recruit/pool/' + id,
    method: 'post'
  })
}

// 查询招聘审批列表
export function listRecruit(query) {
  return request({
    url: '/flow/recruit/list',
    method: 'get',
    params: query
  })
}

// 查询招聘审批详细
export function getRecruit(id) {
  return request({
    url: '/flow/recruit/' + id,
    method: 'get'
  })
}

// 新增招聘审批
export function addRecruit(data) {
  return request({
    url: '/flow/recruit',
    method: 'post',
    data: data
  })
}

// 修改招聘审批
export function updateRecruit(data) {
  return request({
    url: '/flow/recruit',
    method: 'put',
    data: data
  })
}

// 删除招聘审批
export function delRecruit(id) {
  return request({
    url: '/flow/recruit/' + id,
    method: 'delete'
  })
}

import request from '@/utils/request'

// 查询需求列表
export function listVitae(vitae) {
  return request({
    url: `/recruit/vitae/list`,
    method: 'get',
    params: vitae
  })
}

// 查询需求列表
export function getVitaeListByPostId(id) {
  return request({
    url: `/recruit/vitae/getVitaeListByPostId/${id}`,
    method: 'get',
  })
}

export function listUser(){
  return request({
    url: '/recruit/vitae/getListUser',
    method: 'get',
  })
}

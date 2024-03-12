import request from '@/utils/request'

// 查询需求列表
export function listVitae(vitae) {
  return request({
    url: `/recruit/vitae/list`,
    method: 'get',
    params: vitae
  })
}

export function listUser(){
  return request({
    url: '/recruit/vitae/getListUser',
    method: 'get',
  })
}

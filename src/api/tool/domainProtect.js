import request from '@/utils/request'
import {parseStrEmpty} from "@/utils/dyl";

// 查询用户列表
export function listDomainProtect(query) {
  return request({
    url: '/tool/domainProtect/list',
    method: 'get',
    params: query
  })
}

export function getDomainProtectByDomain(domain) {
  return request({
    url: '/tool/domainProtect/getDomainProtectByDomain/' + parseStrEmpty(domain),
    method: 'get'
  })
}

// 查询用户详细
export function getDomainProtect(id) {
  return request({
    url: '/tool/domainProtect/' + parseStrEmpty(id),
    method: 'get'
  })
}

// 新增用户
export function addDomainProtect(data) {
  return request({
    url: '/tool/domainProtect',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateDomainProtect(data) {
  return request({
    url: '/tool/domainProtect',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delDomainProtect(id) {
  return request({
    url: '/tool/domainProtect/' + id,
    method: 'delete'
  })
}

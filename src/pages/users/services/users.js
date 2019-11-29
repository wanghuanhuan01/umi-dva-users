import request from '@/utils/request';
import { PAGE_SIZE } from '../constants';

/**
 *查询用户列表
 * @param {*} page
 */
export async function fetchUsers(page = 1) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

/**
 *删除用户列表
 * @param {*} id
 */
export async function removeUsers(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 编辑用户列表
 */
export async function editUsers(payload) {
  const { id, values } = payload;
  return request(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(values),
  });
}

/**
 * 新建用户
 */
export async function createUsers(values) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

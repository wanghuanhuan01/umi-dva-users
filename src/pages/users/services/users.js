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



import axios from 'axios'
import { BASE_API ,client_id, client_secret } from '../config';
import qs from 'qs';
export function loginByUsername(username, password) {
  let Authorization = window.btoa(`${client_id}:${client_secret}`);
  const data = {
    username,
    password,
    "grant_type": 'merchant_password'
  }
  return axios({
    url: BASE_API + '/oauth/token',
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'Authorization': `Basic ${Authorization}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
  })
}

export function logout() {
  return axios({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return axios({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}


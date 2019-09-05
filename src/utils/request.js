import axios from 'axios'
import { BASE_API } from '../config';

import { getCookie } from './cookie';

// create an axios instance
const service = axios.create({
  baseURL: BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
      // Do something before request is sent
      if (getCookie('access_token')) {
        config.headers['Authorization'] = `Bearer ${getCookie('access_token')}`
      }

      //如果参数value是空，就不需要传给后台
      if (config.params) {
        var _params = JSON.parse(JSON.stringify(config.params))
        //   console.log(_params);
        //   _.map(_params, (value, key) => {
        //   if (!value && typeof value != "number"/* 排斥数字判断 */ && typeof value !== 'boolean'/* 排斥boolean判断 */) {
        //     if (config.noIngore && config.noIngore.findIndex((item => item == key)) >= 0) {
        //     } else {
        //       delete _params[key]
        //     }
        //   }
        // });

        config.params = _params
      }
      return config
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
      return response
    },
    error => {
      console.log('err' + error) // for debug
      if (error.response && error.response.status == 401) {


      }
      return Promise.reject(error)
    }
)



export default service

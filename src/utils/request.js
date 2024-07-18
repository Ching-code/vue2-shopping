import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const instance = axios.create({
  baseURL: 'https://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: {
    // platform 為 null 時會報錯
    platform: 'H5',
  },
})

// 請求/響應攔截器
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // 開啟 loading 禁止背景點擊(節流，防止多次點擊無效觸發)
    Toast.loading({
      message: '載入中...',
      forbidClick: true,
      loadingType: 'spinner',
      duration: 0,
    })

    // 有 token 就帶
    const token = store.getters.token
    if (token) {
      config.headers['Access-Token'] = token
      config.headers.platform = 'H5'
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const res = response.data
    if (res.status !== 200) {
      Toast.fail(res.message)
      return Promise.reject(res.message)
    }
    // 關閉 loading
    Toast.clear()
    return res
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error)
  },
)

export default instance

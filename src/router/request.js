import axios from 'axios'
import QS from 'qs'
import store from './store'
import config from 'primevue/config'
import router from '.'

const instance = axios.create({
  baseURL: '',
  timeout: 80000,
  headers: {}
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

instance.interceptors.request.use(
  function (config) {
    const token = store.getters.getToken
    if (token) {
      config.headers.Authorization = 'Bearer ${token}'
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  function (error) {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        case 403:
          this.$message({
            message: 'Your have to login again',
            duration: 1000,
            type: 'success'
          })
          localStorage.removeItem('token')
          store.commit('loginSuccess', null)
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
        default:
          this.$message({
            message: error.response.data.message,
            duration: 1500,
            type: 'success'
          })
      }
      return Promise.reject(error.response)
    }
  }
)

export function get(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

export function post(url, params, headers) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, QS.stringify(params), headers)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

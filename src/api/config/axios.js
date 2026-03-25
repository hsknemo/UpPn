import axios from 'axios'

var http = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 400000
})

/*请求做的事情*/
http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/*响应要做的事情*/
http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default http

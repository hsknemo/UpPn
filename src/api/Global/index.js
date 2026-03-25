import http from '../config/axios'

export default function baseFun(data) {
  return http({
    method: 'post',
    data: data,
    url: '',
  })
}

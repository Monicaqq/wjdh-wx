// 获取请求数据
import { get } from '../utils/request'
// const baseUrl = 'http://192.168.1.104:8015'
const baseUrl = 'https://test.youbaobao.xyz:18081'

// 获取户主用户数据
export function getOwnerData () {
  return get(`${baseUrl}/book/home/recommend/v2`)
}

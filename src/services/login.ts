import { http } from '@/utils/https'

//登录
export const login = async (data: any) => {
  return await http({
    url: '/login/wxMin',
    method: 'POST',
    data,
  })
}
//模拟获取手机号
export const loginSimple = async (data: any) => {
  return await http({
    url: '/login/wxMin/simple',
    method: 'POST',
    data,
  })
}

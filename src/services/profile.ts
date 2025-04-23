import { http } from '@/utils/https'

//获取个人信息
export const getMemberProfile = () => {
  return http({
    url: '/member/profile',
    method: 'GET',
  })
}
//修改用户信息
export const putMemberProfile = (data: any) => {
  return http({
    url: '/member/profile',
    method: 'PUT',
    data,
  })
}

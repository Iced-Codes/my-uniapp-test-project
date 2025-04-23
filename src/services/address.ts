import { http } from '@/utils/https'
export const postMemberAddress = (data: any) => {
  return http({
    url: '/member/address',
    method: 'POST',
    data,
  })
}
export const getMemberAddress = (data?: any) => {
  return http({
    url: data ? `/member/address/${data}` : '/member/address',
    method: 'GET',
    data,
  })
}
export const putMemberAddress = (data?: any, id?: number) => {
  return http({
    url: `/member/address/${id}`,
    method: 'PUT',
    data,
  })
}
export const deleteMemberAddress = (id?: number) => {
  return http({
    url: `/member/address/${id}`,
    method: 'DELETE',
  })
}

import { http } from '@/utils/https'
export const postMemberCart = (data: any) => {
  return http({
    url: '/member/cart',
    method: 'POST',
    data,
  })
}
export const getMemberCart = () => {
  return http({
    url: '/member/cart',
    method: 'GET',
  })
}
export const deleteMemberCart = (data: any) => {
  return http({
    url: '/member/cart',
    method: 'DELETE',
    data,
  })
}
export const putMemberCart = (data: any, id: any) => {
  return http({
    url: `/member/cart/${id}`,
    method: 'PUT',
    data,
  })
}
export const putMemberCartSelected = (data: any) => {
  return http({
    url: `/member/cart/selected`,
    method: 'PUT',
    data,
  })
}

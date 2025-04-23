import { http } from '@/utils/https'
export const getMemberOrderPre = () => {
  return http({
    url: '/member/order/pre',
    method: 'GET',
  })
}
export const getMemberOrderPreNow = (data: any) => {
  return http({
    url: '/member/order/pre/now',
    method: 'GET',
    data,
  })
}

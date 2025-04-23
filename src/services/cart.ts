import { http } from '@/utils/https'
export const postMemberCart = (data: any) => {
  return http({
    url: '/member/cart',
    method: 'POST',
    data,
  })
}

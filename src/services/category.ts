import { http } from '@/utils/https'
export const getCategoryTop = () => {
  return http({
    url: '/category/top',
    method: 'GET',
  })
}

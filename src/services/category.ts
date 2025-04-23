import { http } from '@/utils/https'
export const getCategoryTop = () => {
  return http({
    url: '/category/top',
    method: 'GET',
  })
}
/**商品详细信息 */
export const getGoods = (params: any) => {
  return http({
    url: '/goods',
    method: 'GET',
    data: params,
  })
}

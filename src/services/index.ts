import { http } from '@/utils/https'
/**获取首页轮播图 */
export const getHomeBanner = () => {
  return http<HomeBanner>({
    url: '/home/banner',
    method: 'GET',
  })
}

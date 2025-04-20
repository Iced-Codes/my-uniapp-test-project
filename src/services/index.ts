import { http } from '@/utils/https'
/**获取首页轮播图 */
export const getHomeBanner = () => {
  return http<HomeBanner[]>({
    url: '/home/banner',
    method: 'GET',
  })
}
/**前台分类接口 */
export const getHomeCategoryMutli = () => {
  return http<HomeCategoryMutli[]>({
    url: '/home/category/mutli',
    method: 'GET',
  })
}
/**前台热门接口 */
export const getHomeHotMutli = () => {
  return http<HomeHotMutli[]>({
    url: '/home/hot/mutli',
    method: 'GET',
  })
}
/**猜你喜欢接口 */
export const getHomeGoodsGuessLike = (params: any) => {
  return http<HomeGoodsGuessLike>({
    url: '/home/goods/guessLike',
    method: 'GET',
    data: params,
  })
}

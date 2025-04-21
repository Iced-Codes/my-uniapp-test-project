import { http } from '@/utils/https'
export const getHotApi = (url: string, params: any) => {
  return http({
    url: url,
    method: 'GET',
    data: params,
  })
}
